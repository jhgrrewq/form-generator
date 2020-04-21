<script>
  import * as ExcelTemplates from 'packages/cp-excel-form'
  import MixinEdit from '../../common/edit'
  export default {
    components: {
      ExcelTemplate: ExcelTemplates.ExcelAllTemplate
    },
    mixins: [MixinEdit]
  }
</script>
