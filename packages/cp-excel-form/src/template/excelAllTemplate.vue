<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Comp from '../packages/Form'

  const editTypes = ['input', 'timePick', 'textarea', 'select', 'checkbox', 'radio']
  const nonBlurTypes = ['radio', 'checkbox']
  const optionsTypes = ['select', 'checkbox', 'radio']
  const arrayTypes = ['checkboxVal']

  const defaultModel = {
    inputVal: '',
    textareaVal: '',
    selectVal: '',
    radioVal: '',
    checkboxVal: [],
    yearVal: '',
    monthVal: '',
    weekVal: '',
    dateVal: '',
    datetimeVal: ''
    // datetimerangeVal: [],
    // daterange: []
  }

  const defaultItems = [
    { prop: 'inputVal', placeholder: '请输入输入', xType: 'input', focus: true },
    { prop: 'textareaVal', placeholder: '请输入输入', xType: 'input', type: 'textarea', focus: true },
    { prop: 'selectVal', placeholder: '请输入输入', xType: 'select', focus: true },
    { prop: 'radioVal', placeholder: '请输入输入', xType: 'radio', focus: true },
    { prop: 'checkboxVal', placeholder: '请输入输入', xType: 'checkbox', focus: true },
    { prop: 'yearVal', placeholder: '请输入输入', xType: 'SelectTime.year', focus: true },
    { prop: 'monthVal', placeholder: '请输入输入', xType: 'SelectTime.month', focus: true },
    { prop: 'weekVal', placeholder: '请输入输入', xType: 'SelectTime.week', focus: true },
    { prop: 'dateVal', placeholder: '请输入输入', xType: 'SelectTime.date', focus: true },
    { prop: 'datetimeVal', placeholder: '请输入输入', xType: 'SelectTime.datetime', focus: true }
    // { prop: 'datetimerangeVal', placeholder: '请输入输入', xType: 'SelectTime.datetimerange', focus: true },
    // { prop: 'daterange', placeholder: '请输入输入', xType: 'SelectTime.daterange', focus: true }
  ]

  function findLabel(value, options) {
    if (value == null || value === '' || !(options && options.length)) return ''
    const item = options.find(opt => opt.value === value)
    return item && item.label
  }

  function findLabels(value = [], options) {
    if (value == null || value === '' || !(options && options.length)) return ''
    const labels = []
    options.forEach(opt => {
      if (value && value.includes(opt.value)) {
        labels.push(opt.label)
      }
    })
    return labels.join(',')
  }

  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      isEdit: {
        type: Boolean,
        default: true
      }
      /* items: {
        type: Array,
        default() {
          return
        }
      } */
    },
    data() {
      return {
        htmlStr: '',
        model: Object.assign({}, defaultModel)
      }
    },
    watch: {
      content: {
        immediate: true,
        handler: function(val) {
          this.htmlStr = val
        }
      }
    },
    created() {
      this.items = defaultItems
    },
    mounted() {
      // 外部可对 edit 事件做自定义处理
      !(this._event && this._event['edit']) && this.$on('edit', this.handleEdit)
    },
    methods: {
      // 获取 html
      getHtmlStr() {
        return this.htmlStr
      },
      // 获取 json
      getJSON() {
        const json = []
        const tbody = this.$el.getElementsByTagName('tbody')[0]
        const elemelem = tbody.children
        // 遍历所有子节点 不考虑表头
        for (let i = 1; i < elemelem.length; i++) {
          // 当前节点
          const e = elemelem[i]
          if (e.children.length) {
            const item = Array.prototype.reduce.call(e.children, (prev, curr) => {
              const key = curr.getAttribute('data-key')
              let value = curr.innerHTML
              if (curr.hasAttribute('data-option-value')) {
                const optionValue = curr.getAttribute('data-option-value')
                value = JSON.parse(optionValue)['optionValue']
              }
              if (key) {
                prev[key] = value
                return prev
              }
            }, {})
            json.push(item)
          }
        }
        return JSON.stringify(json)
      },
      // 处理下拉项获取下拉数据
      handleOptionProp(target) {
        const url = target.getAttribute('data-url')
        const json = target.getAttribute('data-json')
        const valueKey = target.getAttribute('data-id') || 'value'
        const labelKey = target.getAttribute('data-value') || 'lable'
        // eslint-disable-next-line no-unused-vars
        let getData
        if (json) {
          getData = () => {
            return new Promise(resolve => {
              const parseJSON = JSON.parse(json)
              resolve(parseJSON && parseJSON.map(d => ({
                label: d[labelKey],
                value: d[valueKey]
              })) || [])
            })
          }
        } else if (url) {
          getData = () => {
            return new Promise(resolve => {
              axios({
                method: 'GET',
                url
              })
                .then(({ data }) => {
                  if (data && data.length) {
                    resolve(data.map(d => ({
                      label: d[labelKey],
                      value: d[valueKey]
                    })) || [])
                  }
                })
                .catch(() => resolve([]))
            })
          }
        }
        return { getData }
      },
      // 处理时间 type
      handleTimePickType(target) {
        const regex = target.getAttribute('data-reges')
        const prefix = 'SelectTime.'
        switch (regex) {
          case 'yyyy':
            return `${prefix}year`
          case 'MM':
            return `${prefix}month`
          case 'WW':
            return `${prefix}week`
          case 'yyyy-MM-dd':
            return `${prefix}date`
          case 'yyyy-MM-dd HH:mm:ss':
            return `${prefix}datetime`
          default:
            return `${prefix}datetime`
        }
      },
      // 筛选 type 类型
      getTypeConfig(type, props) {
        const item = this.items.find(item => {
          if (type === 'textarea') {
            return item.xType === 'input' && item.type === 'textarea'
          } else {
            return item.xType === type
          }
        })
        return item && Object.assign({}, item, props) || {}
      },
      // handleDefaultModel
      handleDefaultModel() {
        this.model = Object.assign({}, defaultModel)
        arrayTypes.forEach(prop => {
          this.model[prop] = []
        })
      },
      // 渲染表单
      createEditComponent(parent, item, initValue) {
        const prop = item.prop
        if (!prop || !item || !this.model) return

        if (optionsTypes.includes(item.xType)) {
          if (parent.hasAttribute('data-option-value')) {
            const optionValue = parent.getAttribute('data-option-value')
            initValue = JSON.parse(optionValue)['optionValue']
          } else {
            initValue = item.xType === 'checkbox' ? [] : ''
          }
        }

        this.handleDefaultModel()
        this.model[prop] = initValue

        const html = new (Vue.extend(Comp))({
          propsData: {
            model: this.model,
            items: [item]
          }
        })
        html.$mount()
        parent.innerHTML = ''
        parent.appendChild(html.$el)

        function remove(ctx) {
          const value = ctx.model[prop]
          // 处理回显 label
          let label
          if (optionsTypes.includes(item.xType)) {
            if (item.xType === 'checkbox') {
              label = findLabels(value, html.$refs[prop].data)
            } else {
              label = findLabel(value, html.$refs[prop].data)
            }
          } else {
            label = value
          }
          if (label) {
            parent.setAttribute('data-option-value', JSON.stringify({
              optionValue: value
            }))
          }

          // 可添加验证逻辑
          html.$el.remove()

          parent.innerHTML = label
        }
        // 针对 radio 和 checkbox 没有 blur 事件，监听 mouseout
        if (nonBlurTypes.includes(item.xType)) {
          const that = this
          parent && parent.addEventListener('mouseleave', function() {
            remove(that)
          }, false)
        } else {
          html.$on('blur', () => remove(this))
        }
      },
      // 响应 edit 事件，主要出筛选 type 类型，渲染表单
      handleEdit(target) {
        let type = target.getAttribute('data-type')

        if (editTypes.includes(type)) {
          let props = {}
          // 处理下拉项
          if (optionsTypes.includes(type)) {
            props = this.handleOptionProp(target)
          }
          if (type === 'timePick') {
            type = this.handleTimePickType(target)
          }
          const item = this.getTypeConfig(type, props)
          this.createEditComponent(target, item, target.innerHTML)
        }
      },
      // 点击派发 edit 事件
      handleClick(e) {
        this.$emit('edit', e.target, this)
      }
    },
    render() {
      return <div class="report-template" {
        ...{
          domProps: {
            innerHTML: this.htmlStr
          },
          ...(this.isEdit ? { on: { click: this.handleClick }} : {})
        }
      }>
      </div>
    }
  }
</script>
<style lang="scss">
.report-template {
  width: 100%;
  height: 100%;
  table {
    width: 100%!important;
  }
}
</style>
