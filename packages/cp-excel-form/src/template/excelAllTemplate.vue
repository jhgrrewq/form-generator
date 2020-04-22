<script>
  import MixinExcelTemplate from './mixin'
  export default {
    mixins: [MixinExcelTemplate],
    data() {
      return {
        model: {},
        htmlItems: []
      }
    },
    mounted() {
      this.$watch('content', function(val) {
        if (val) {
          this.htmlStr = val
          this.$nextTick(() => {
            this.isEdit && this.init()
          })
        }
      }, {
        immediate: true
      })
    },
    methods: {
      init() {
        let modelIndex = 0
        const tbody = this.$el.getElementsByTagName('tbody')[0]
        const elemelem = tbody.children
        for (let i = 0; i < elemelem.length; i++) {
          const e = elemelem[i]
          if (e.children.length) {
            Array.prototype.map.call(e.children, eItem => {
              const { type, item } = this.handleTypeItem(eItem)

              if (type && item) {
                modelIndex++
                this.createEditComponent(eItem, item, eItem.innerHTML, modelIndex)
              }
            })
          }
        }
      },
      handleDefaultModel(prop, value, index) {
        const defaultModel = Object.assign({}, this.defaultModel)
        if (this.model.hasOwnProperty(`model_${index}`)) {
          this.model[`model_${index}`] = defaultModel
        } else {
          this.$set(this.model, `model_${index}`, defaultModel)
        }
        this.arrayTypes.forEach(prop => {
          this.model[`model_${index}`][prop] = []
        })
        if (value !== '' && value !== null) {
          this.model[`model_${index}`][prop] = value
        }
      },
      handleFormItemHtml(item, index) {
        const VueComp = this.VueComp
        return new VueComp({
          propsData: {
            ref: `form_${index}`,
            model: this.model[`model_${index}`],
            items: [item],
            inlineMessage: true,
            rules: {
              [item.prop]: { required: true, message: '请输入', trigger: ['blur', 'change'] }
            }
          }
        })
      },
      // 渲染表单
      createEditComponent(parent, item, initValue, modelIndex) {
        const prop = item.prop
        if (!item.prop || !item) return
        // 处理默认 label value
        initValue = this.handleDefaultValue(parent, item, initValue, modelIndex)
        this.handleLabelBaseValue(parent, null, item, initValue)
        // 处理默认 model
        this.handleDefaultModel(prop, initValue, modelIndex)

        const htmlItem = this.handleFormItemHtml(item, modelIndex)
        this.htmlItems.push(htmlItem)
        htmlItem.$mount()
        parent.innerHTML = ''
        parent.appendChild(htmlItem.$el)

        htmlItem.$on('value-change', value => {
          // 处理 label
          this.handleLabelBaseValue(parent, htmlItem, item, value)
          // 处理 value
          parent.setAttribute('data-option-value', JSON.stringify({ optionValue: value }))
        })
      },
      // validate
      validate() {
        if (!this.htmlItems.length) return
        return Promise.all(this.htmlItems.map(form => form.validate()))
          .then(validate => {
            return validate
          })
          .catch(validate => {
            return validate
          })
      },
      clearValidate() {
        if (!this.htmlItems.length) return
        this.htmlItems.forEach(form => {
          form.clearValidate()
        })
      }
    },
    render() {
      return <div class="excel-template" {
        ...{
          domProps: {
            innerHTML: this.htmlStr
          }
        }
      }>
      </div>
    }
  }
</script>
