<script>
  import ButtonList from './components/ButtonList'
  import SearchForm from './components/SearchForm'
  export default {
    components: {
      ButtonList,
      SearchForm
    },
    data() {
      return {
        searchFields: [
          { label: '名称', prop: 'funName', placeholder: '输入名称', anchor: 8 },
          { label: '时间', prop: 'funType', placeholder: '请选择时间', xType: 'SelectTime.date', anchor: 8 }
        ],
        searchModel: {
          "funName": '',
          "funType": ''
        },
        searchBtnList: [
          { label: '查询', methods: this.handleSearch.bind(this), icon: 'el-icon-search', type: 'primary', disabled: false },
          { label: '重置', methods: this.handleSearchReset.bind(this), icon: 'el-icon-refresh', type: 'warning', disabled: false }
        ]
      }
    },
    methods: {
      handleSearch(data, _form) {
        this.$emit('search', data)
      },
      handleSearchReset(_data, _form) {
        this.$refs.searchForm.onReset()
      }
    },
    render() {
      return (
      <SearchForm
        items={ this.searchFields }
        props-model={ this.searchModel } slot="searchPanel" ref="searchForm">
        <ButtonList
          operateBtnList={ this.searchBtnList }
          props-model={ this.searchModel }
        >
        </ButtonList>
      </SearchForm>
    )
    }
  }
</script>
