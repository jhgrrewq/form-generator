<script>
  import Vue from 'vue'
  import axios from 'axios'
  import Comp from '../packages/Form'

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
        htmlStr: ''
      }
    },
    created() {
      this.editTypes = ['input', 'timePick', 'textarea', 'select', 'checkbox', 'radio']
      this.optionsTypes = ['select', 'checkbox', 'radio']
      this.arrayTypes = ['checkboxVal']

      this.defaultModel = {
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

      this.defaultItems = [
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

      this.items = this.defaultItems

      this.VueComp = Vue.extend(Comp)
    },
    methods: {
      // 获取 html
      getHtmlStr() {
        return this.$el && this.$el.innerHTML // 不能直接返回 htmlStr
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
      // 处理默认 value
      handleDefaultValue(target, item, value) {
        if (this.optionsTypes.includes(item.xType)) {
          if (target.hasAttribute('data-option-value')) {
            const optionValue = target.getAttribute('data-option-value')
            value = JSON.parse(optionValue)['optionValue']
          } else {
            value = item.xType === 'checkbox' ? [] : ''
          }
        }
        return value
      },
      // 处理 value 对应 label
      handleLabelBaseValue(target, html, item, value) {
        let label
        if (this.optionsTypes.includes(item.xType)) {
          if (item.xType === 'checkbox') {
            label = findLabels(value, html.$refs[item.prop].data)
          } else {
            label = findLabel(value, html.$refs[item.prop].data)
          }
        } else {
          label = value
        }
        if (label) {
          target.setAttribute('data-option-label', label)
          target.setAttribute('data-option-value', JSON.stringify({
            optionValue: value
          }))
        }
        return label
      },
      // 处理 type 和对应 item 项
      handleTypeItem(target) {
        let type = target.getAttribute('data-type')
        if (!(type && this.editTypes.includes(type))) return {}

        let props = {}
        // 处理下拉项
        if (this.optionsTypes.includes(type)) {
          props = this.handleOptionProp(target)
        }
        if (type === 'timePick') {
          type = this.handleTimePickType(target)
        }
        target.setAttribute('data-formattype', type)
        const item = this.getTypeConfig(type, props)
        return {
          type,
          item
        }
      }
    }
  }
</script>
<style lang="scss">
.excel-template {
  width: 100%;
  height: 100%;
  table {
    width: 100%!important;
  }
}
</style>
