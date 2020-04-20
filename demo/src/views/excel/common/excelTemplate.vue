<template>
  <div class="wrap-container">
    <c-button
      class="btn-save"
      type="primary"
      @click="handleSave"
    >
      保存
    </c-button>
    <ExcelTemplate ref="excelTemplate" :content="content" />
  </div>
</template>
<script>
  import { ExcelClickTemplate as ExcelTemplate } from 'packages/cp-excel-form'
  // import { ExcelClickTemplate as ExcelTemplate }  from '@cci/cp-excel-form'

  export default {
    components: {
      ExcelTemplate
    },
    data() {
      return {
        content: ''
      }
    },
    computed: {
      id() {
        return this.$route.params && this.$route.params['id'] || ''
      }
    },
    mounted() {
      this.getTemplate()
        .then((content) => {
          this.content = content
        })
    }
  }
</script>
<style lang="scss">
.wrap-container{
  .btn-save{
    margin: 10px;
  }
}
</style>
