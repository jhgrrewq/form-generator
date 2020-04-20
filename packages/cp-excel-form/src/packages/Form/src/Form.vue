<script>
  import Vue from 'vue'
  // 全局注册 cui 组件
  import {
    Input, Switch
  } from '@cci/cui'
  import Checkbox from '../../Checkbox'
  import Radio from '../../Radio'
  import Select from '../../Select/SelectBase'

  Vue.component('CInput', Input)
  Vue.component('CSwitch', Switch)
  Vue.component('CpCheckbox', Checkbox)
  Vue.component('CpRadio', Radio)
  Vue.component('CpSelect', Select)

  // 注册表单组件
  import Renderer from "../../Renderer"
  import SelectTime from "../../Select/SelectTime"
  const components = {
    SelectTime
  }
  const componentList = Object.keys(components)
  componentList.forEach(name => {
    Vue.component(`C${name}`, components[name])
  })

  export default {
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
    },
    methods: {
      handleChange(item, e) {
        this.model[item.prop] = e
      }
    }
  }
</script>
