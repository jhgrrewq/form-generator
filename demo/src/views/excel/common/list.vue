<template>
  <c-table
    :data="tableData"
    style="width: 100%"
  >
    <c-table-column
      type="index"
      label="序号"
      width="200"
    />
    <c-table-column
      prop="name"
      label="名称"
      min-width="200"
    />
    <c-table-column
      fixed="right"
      label="操作"
      width="100"
    >
      <template slot-scope="scope">
        <c-button type="text" size="small" @click="handleEdit(scope.row)">
          编辑
        </c-button>
      </template>
    </c-table-column>
  </c-table>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  export default {
    data() {
      return {
        tableData: [],
        pageNum: 1,
        pageSize: 10
      }
    },
    created() {
      axios({
        url: '/customer/reporting/getPageList',
        method: 'POST',
        data: qs.stringify({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
      })
        .then(({ data }) => {
          this.tableData = data.resultObject && data.resultObject.list || []
        })
    },
    methods: {
      handleEdit({ id }) {
        this.$router.push(`/excel/excelclick/edit/${id}`)
      }
    }
  }
</script>
