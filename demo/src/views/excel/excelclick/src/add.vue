<script>
  import axios from 'axios'
  import qs from 'qs'
  import MixinExcelTemplate from './common/excelTemplate'
  export default {
    mixins: [MixinExcelTemplate],
    methods: {
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
      handleSave() {}
    }
  }
</script>
