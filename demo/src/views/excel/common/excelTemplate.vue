<template>
  <div class="wrap-container">
    <c-button class="btn-save" type="primary" @click="handleSave">
      保存
    </c-button>
    <c-button class="btn-save" type="primary" @click="handleValidate">
      校验
    </c-button>
    <c-button class="btn-save" type="primary" @click="handleClearValidate">
      清除校验
    </c-button>
    <ExcelTemplate ref="excelTemplate" :content="content" />
  </div>
</template>
<script>
  import * as ExcelTemplates from 'packages/cp-excel-form'
  // import * as ExcelTemplates  from '@cci/cp-excel-form'

  export default {
    components: {
      ExcelTemplate: ExcelTemplates.ExcelClickTemplate
    },
    data() {
      return {
        content: '',
        btnList: [
          {
            label: "保存",
            methods: "handleSave",
            url: "",
            icon: "",
            type: "primary",
            disabled: false
          },
          {
            label: "校验",
            methods: "handleValidate",
            url: "",
            icon: "",
            type: "primary",
            disabled: false
          },
          {
            label: "清除校验",
            methods: "handleClearValidate",
            url: "",
            icon: "",
            type: "primary",
            disabled: false
          }
        ]
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
    },
    methods: {
      handleSave() {},
      handleValidate() {},
      handleClearValidate() {}
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
