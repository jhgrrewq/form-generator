<script>
  import { Form, FormItem, Row, Col } from '@cci/cui'
  import {
    inputRender,
    textRender,
    customRender,
    slotRender,
    switchRender,
    checkboxRender,
    radioRender,
    selectRender
  } from './render.js'

  export default {
    components: {
      FormItem,
      Row,
      Col
    },
    directives: {
      focus: {
        inserted: function(el, binding, vnode) {
          if (vnode.componentInstance && vnode.componentInstance.elForm) {
            vnode.componentInstance.elForm.focusItem = vnode.componentInstance
          }
          setTimeout(function() {
            vnode.componentInstance && vnode.componentInstance.focus && vnode.componentInstance.focus()
          }, 300)
        }
      }
    },
    mixins: [Form],
    provide() {
      return {
        Form: this
      }
    },
    props: {
      inline: {
        type: Boolean,
        default: true
      },
      labelWidth: String,
      labelPosition: {
        type: String,
        default: 'right'
      },
      model: {
        type: Object,
        default() {
          return {}
        }
      },
      rules: Object,
      items: {
        type: Array,
        default() {
          return []
        }
      }
    },
    beforeCreate() {
      this.R = this.R || {}
      this.R.inputRender = inputRender
      this.R.textRender = textRender
      this.R.customRender = customRender
      this.R.slotRender = slotRender
      this.R.switchRender = switchRender
      this.R.checkboxRender = checkboxRender
      this.R.radioRender = radioRender
      this.R.selectRender = selectRender
    },
    mounted() {
      this.$on('visible', () => {
        let componentInstance = this.focusItem
        if (!componentInstance) {
          return
        }
        setTimeout(function() {
          componentInstance.focus && componentInstance.focus()
          componentInstance = null
        }, 300)
      })
    },
    methods: {
      itemFilters(_item, _$index) {
        return true
      },
      baseOptions(item, dataType) {
        const opts = {
          on: {},
          attrs: {
            ...item,
            value: this.model[item.prop],
            dataType
          }
        }
        if (item.ref || item.prop) {
          opts.ref = item.ref || item.prop
        }
        if (item.focus) {
          opts.directives = [{
            name: "focus",
            rawName: "v-focus"
          }]
        }
        // 支持传入自定义class
        if (item.hasOwnProperty('class')) {
          opts.class = item.class || []
        }
        if (item.hasOwnProperty('on') && Object.prototype.toString.call(item.on) === '[object Object]') {
          for (const key in item.on) {
            opts.on[key] = item.on[key]
          }
        }
        return opts
      },
      handleChange(item, e) {
        // element 表单验证空格输入也会通过，因此针对输入字符串去除首尾空格
        e = typeof e === 'string' ? e.trim() : e
        this.model[item.prop] = e
      },
      mixinEvent(originFn, fn) {
        if (!originFn) {
          return fn
        } else if (originFn instanceof Array) {
          return originFn.concat(fn)
        } else {
          return [originFn, fn]
        }
      },
      wrapFormItem(h, { label, prop }, children) {
        return h("FormItem", {
          attrs: {
            label,
            prop
          },
          key: prop,
          class: "form-item"
        }, children)
      },
      wrapForm(h, children) {
        return h('form',
                 {
                   staticClass: "el-form wrap-form wrap-edit-form",
                   class: {
                     ['el-form--label-' + this.labelPosition]: this.labelPosition,
                     'el-form--inline': this.inline
                   }
                 },
                 children)
      },
      genChild(h, item) {
        const x = item.xType && item.xType.split('.')
        let xType = x && x[0]
        const dataType = x && x[1] || ''
        const opts = this.baseOptions(item, dataType)
        let fn = this.R[`${xType}Render`]
        if (!xType || !fn) {
          xType = 'input'
          fn = this.R['inputRender']
        }
        switch (xType) {
          case 'checkbox':
          case 'radio':
          case 'input':
            opts.on['input'] = this.mixinEvent(opts.on['input'], this.handleChange.bind(this, item))
            break
          case 'switch':
          case 'select':
            opts.on['change'] = this.mixinEvent(opts.on['change'], this.handleChange.bind(this, item))
            break
        }
        if (xType === 'input' || xType === 'select') {
          opts.on['blur'] = this.mixinEvent(opts.on['blur'], () => { this.$emit('blur') })
        }
        return fn.call(this, h, item, opts)
      },
      renderItems(h, items = this.items) {
        items = items.filter(this.itemFilters)

        return items
          .map(this.genChild.bind(this, h))
          .map((children, i) => {
            return this.wrapFormItem(h, items[i], children)
          })
      }
    },
    render(h) {
      return this.wrapForm(h, [this.$slots.default, this.renderItems(h, this.items)])
    }
  }
</script>
<style lang="scss">
.wrap-edit-form{
  .el-form-item{
    // margin-bottom: 0;
    margin-right: 0;
    .el-form-item__content{
      line-height: 1;
    }
  }
}
</style>
