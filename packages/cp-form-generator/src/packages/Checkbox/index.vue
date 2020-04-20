<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
    <Checkbox
      v-for="(item, $index) in data"
      :key="$index + '_' + item.value"
      :label="item.value"
    >
      {{ item.value }}
    </Checkbox>
  </div>
</template>
<script>
  import { CheckboxGroup, Checkbox } from '@cci/cui'
  import MixinGetData from '../mixins/getData'
  export default {
    components: {
      Checkbox
    },
    mixins: [CheckboxGroup, MixinGetData]
  }
</script>
