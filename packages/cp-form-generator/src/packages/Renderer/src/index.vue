<script>
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
    directives: {
      focus: {
        inserted: function(el, binding, vnode) {
          setTimeout(function() {
            vnode.componentInstance && vnode.componentInstance.focus && vnode.componentInstance.focus()
          }, 300)
        }
      }
    },
    props: {
      model: {
        type: Object,
        default() {
          return {}
        }
      },
      item: {
        type: Object,
        default() {
          return {}
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
    methods: {
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
      renderItem(h, item = this.item) {
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
      }
    },
    render(h) {
      return this.renderItem(h, this.item)
    }
  }
</script>
