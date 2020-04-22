<script>
  import * as ExcelTemplates from 'packages/cp-excel-form'
  import MixinEdit from '../../common/edit'
  export default {
    components: {
      ExcelTemplate: ExcelTemplates.ExcelAllTemplate
    },
    mixins: [MixinEdit],
    methods: {
      handleClearValidate() {
        this.$refs.excelTemplate && this.$refs.excelTemplate.clearValidate()
      },
      handleValidate() {
        this.$refs.excelTemplate && this.$refs.excelTemplate.validate()
          .then(validate => {
            console.log(validate, 'validate pass')
          })
          .catch(validate => {
            console.log(validate, 'validate fail')
          })
      }
    }
  }
</script>
