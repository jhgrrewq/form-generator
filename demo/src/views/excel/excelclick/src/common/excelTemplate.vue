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
  import ExcelTemplate from 'packages/cp-form-generator'
  // import ExcelTemplate  from '@cci/cp-form-generator'

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
