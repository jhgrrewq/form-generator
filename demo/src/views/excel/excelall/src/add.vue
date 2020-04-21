<script>
  import * as ExcelTemplates from 'packages/cp-excel-form'
  import MixinAdd from '../../common/add'
  export default {
    components: {
      ExcelTemplate: ExcelTemplates.ExcelAllTemplate
    },
    mixins: [MixinAdd]
  }
</script>
