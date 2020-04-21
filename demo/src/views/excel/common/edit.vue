<script>
  import axios from 'axios'
  import qs from 'qs'
  import MixinExcelTemplate from './excelTemplate'
  export default {
    mixins: [MixinExcelTemplate],
    methods: {
      /* getTemplate() {
        if (!this.id) return
        return axios({
          url: '/customer/reporting/getFormWriteById',
          method: 'POST',
          data: qs.stringify({
            id: this.id
          })
        })
          .then(({ data }) => {
            if (data.status === 200) {
              return data.resultObject && data.resultObject.content || ''
            }
          })
      }, */
      getTemplate() {
        if (!this.id) return
        return axios({
          url: '/customer/reporting/getTmpToHtml',
          method: 'POST',
          data: qs.stringify({
            id: this.id
          })
        })
          .then(({ data }) => {
            if (data.status === 200) {
              return data.resultObject || ''
            }
          })
      },
      handleSave() {
        if (!this.id) return
        const template = this.$refs.excelTemplate
        const data = template.getJSON()
        console.log(JSON.parse(data))
        const content = template.getHtmlStr()
        axios({
          url: '/customer/reporting/save',
          method: 'POST',
          data: qs.stringify({
            id: this.id,
            data,
            content
          })
        })
          .then(({ data }) => {
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '数据保存成功'
              })
            }
          })
      }
    }
  }
</script>
