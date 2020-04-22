<script>
  import Form from '@cci/cp-form'
  import {
    inputRender as inputRenderer,
    textRender as textRenderer,
    customRender as customRenderer,
    slotRender as slotRenderer,
    switchRender as switchRenderer,
    checkboxRender as checkboxRenderer,
    radioRender as radioRenderer,
    selectRender as selectRenderer
  } from './render.js'

  export default {
    mixins: [Form],
    beforeCreate() {
      this.R = this.R || {}
      this.R.inputRender = inputRenderer
      this.R.textRender = textRenderer
      this.R.customRender = customRenderer
      this.R.slotRender = slotRenderer
      this.R.switchRender = switchRenderer
      this.R.checkboxRender = checkboxRenderer
      this.R.radioRender = radioRenderer
      this.R.selectRender = selectRenderer
    },
    methods: {
      wrapForm(h, children) {
        return h('form',
                 {
                   staticClass: "el-form wrap-form wrap-excel-form",
                   class: {
                     ['el-form--label-' + this.labelPosition]: this.labelPosition,
                     'el-form--inline': this.inline
                   }
                 },
                 children)
      },
      handleChange(item, e) {
        // element 表单验证空格输入也会通过，因此针对输入字符串去除首尾空格
        e = typeof e === 'string' ? e.trim() : e
        this.model[item.prop] = e
        this.emitRelated(e, item.relatedFields, item.ref || item.prop)
        this.$emit('value-change', e)
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
      }
    }
  }
</script>
<style lang="scss">
.wrap-excel-form{
  .el-form-item{
    /* margin-bottom: 0;
    margin-right: 0; */
    /* .el-form-item__content{
      line-height: 1;
    } */
  }
}
</style>
