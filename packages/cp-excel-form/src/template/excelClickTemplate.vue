<script>
  import MixinExcelTemplate from './mixin'

  const nonBlurTypes = ['radio', 'checkbox']

  export default {
    mixins: [MixinExcelTemplate],
    data() {
      return {
        model: Object.assign({}, this.defaultModel)
      }
    },
    watch: {
      content: {
        immediate: true,
        handler: function(val) {
          if (val) {
            this.htmlStr = val
          }
        }
      }
    },
    mounted() {
      // 外部可对 edit 事件做自定义处理
      !(this._event && this._event['edit']) && this.$on('edit', this.handleEdit)
      // 外部 click
      document.addEventListener('click', (e) => {
        if (!this.$el.contains(e.target)) {
          this.$el.focus()
        }
      }, false)
    },
    methods: {
      // 响应 edit 事件，主要出筛选 type 类型，渲染表单
      handleEdit(target) {
        const { type, item } = this.handleTypeItem(target)

        if (type && item) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.createEditComponent(target, item, target.innerHTML)
          }, 50)
        }
      },
      // 处理默认 model
      handleDefaultModel(prop, value) {
        this.model = Object.assign({}, this.defaultModel)
        this.arrayTypes.forEach(prop => {
          this.model[prop] = []
        })
        if (value !== '' && value !== null) {
          this.model[prop] = value
        }
      },
      // 处理渲染表单 dom
      handleFormItemHtml(item) {
        const VueComp = this.VueComp
        return new VueComp({
          propsData: {
            model: this.model,
            items: [item],
            inlineMessage: true
          }
        })
      },
      // 点击派发 edit 事件
      handleClick(e) {
        this.$emit('edit', e.target, this)
      },
      // 渲染表单
      createEditComponent(parent, item, initValue) {
        const prop = item.prop
        if (!item.prop || !item || !this.model) return

        initValue = this.handleDefaultValue(parent, item, initValue)

        this.handleDefaultModel(prop, initValue)

        const html = this.handleFormItemHtml(item)
        html.$mount()
        parent.innerHTML = ''
        parent.appendChild(html.$el)

        function remove(ctx) {
          const value = ctx.model[prop]
          // 处理回显 label
          const label = ctx.handleLabelBaseValue(parent, html, item, value)
          // 处理 value
          parent.setAttribute('data-option-value', JSON.stringify({ optionValue: value }))

          // 可添加验证逻辑
          /* html.$el.remove()
          parent.innerHTML = label */
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
      }
    },
    render() {
      return <div class="excel-template" {
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
