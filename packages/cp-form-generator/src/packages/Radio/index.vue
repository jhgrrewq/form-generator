<template>
  <component
    :is="_elTag"
    class="el-radio-group"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <Radio
      v-for="(item, $index) in data"
      :key="$index + '_' + item.value"
      :label="item.value"
    >
      {{ item.label }}
    </Radio>
  </component>
</template>
<script>
  import { RadioGroup, Radio } from '@cci/cui'
  import MixinGetData from '../mixins/getData'
  export default {
    components: {
      Radio
    },
    mixins: [RadioGroup, MixinGetData]
  }
</script>

