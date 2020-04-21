<script>
  import MixinExcelTemplate from './mixin'
  export default {
    mixins: [MixinExcelTemplate],
    data() {
      return {
        model: {},
        parentDoms: [],
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
            model: this.model[`model_${index}`],
            items: [item]
          }
        })
      },
      // 渲染表单
      createEditComponent(parent, item, initValue, modelIndex) {
        const prop = item.prop
        if (!item.prop || !item) return

        initValue = this.handleDefaultValue(parent, item, initValue, modelIndex)

        this.handleDefaultModel(prop, initValue, modelIndex)

        const html = this.handleFormItemHtml(item, modelIndex)
        html.$mount()
        parent.innerHTML = ''
        parent.appendChild(html.$el)

        html.$on('value-change', value => {
          this.handleLabelBaseValue(parent, html, item, value)
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
