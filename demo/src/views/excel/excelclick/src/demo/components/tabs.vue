<script>
  import { store, mutations } from '../store'

  export default {
    name: 'Tabs',
    computed: {
      activeTabName: {
        get() {
          return store.activeTabName
        },
        set(value) {
          this.setActiveTabName(value)
        }
      },
      tabList() {
        return store.tabList
      }
    },
    methods: {
      setActiveTabName: mutations.setActiveTabName,
      closeTab: mutations.closeTab
    },
    render() {
      return (
        <c-tabs
          v-model={ this.activeTabName }
          class="tabs"
          type="border-card"
          on-tab-remove={ this.closeTab }
        >
          {
            this._l(this.tabList, (item, index) => (
              <c-tab-pane
                name={ item.name }
                label={ item.label }
                closable={ item.closable }
              >
                {
                  this.$scopedSlots.renderItem && this.$scopedSlots.renderItem(item, index, this)
                }
              </c-tab-pane>
            ))
          }
        </c-tabs>
      )
    }
  }
</script>
<style lang="scss">
.tabs {
  height: 99%;
  .el-tabs__content{
    padding: 0!important;
  }
}
</style>

