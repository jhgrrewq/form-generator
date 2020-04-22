<script>
  import Renderer from "../../Renderer"
  // @cci/cp-form 使用表单组件
  import {
    Input as CInput, Switch as CSwitch, FormItem as CFormItem, Row as CRow, Col as CCol
  } from '@cci/cui'
  import CpCheckbox from '../../Checkbox'
  import CpRadio from '../../Radio'
  import CpSelect from '../../Select/SelectBase'

  const baseComps = {
    CInput,
    CSwitch,
    CFormItem,
    CRow,
    CCol,
    CpCheckbox,
    CpRadio,
    CpSelect
  }
  // 自定义表单组件
  import SelectTime from "../../Select/SelectTime"
  const comps = {
    SelectTime
  }
  const componentList = Object.keys(comps)

  export default {
    components: {
      ...comps,
      ...baseComps
    },
    mixins: [Renderer],
    beforeCreate() {
      this.R = this.R || {}
      componentList.forEach(name => {
        this.R[`${name}Render`] = function(h, item, opts) {
          // 单独针对时间选择器处理
          if (name === 'SelectTime') {
            opts.attrs['type'] = opts.attrs['dataType']
            opts.on["input"] = this.mixinEvent(
              opts.on["input"],
              this.handleChange.bind(this, item),
            )
          } else {
            opts.on["change"] = this.mixinEvent(
              opts.on["change"],
              this.handleChange.bind(this, item),
            )
          }
          return [h(`C${name}`, opts)]
        }
      })
    }
  }
</script>
