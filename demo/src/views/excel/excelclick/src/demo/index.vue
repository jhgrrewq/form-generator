<template>
  <div>
    <Search @search="handleSearch" />
    <Tabs ref="tabs">
      <template v-slot:renderItem="item">
        <component :is="item.name" v-bind="item.props" />
      </template>
    </Tabs>
  </div>
</template>
<script>
  import Tabs from './components/tabs'
  import Search from './search'
  import axios from 'axios'

  import { store, mutations } from './store'
  import { serializeData, findChildren } from './utils'

  async function getTemplate(url) {
    return axios.get(url)
      .then(({ data }) => {
        if (data && data.success) {
          return data.data
        }
      })
      .catch((err) => console.log(err))
  }

  export default {
    components: {
      Tabs,
      Search
    },
    computed: {
      activeTabName() {
        return store.activeTabName
      }
    },
    async mounted() {
      const content = await getTemplate('/xscommand/customReport/testReport')
      this.addTab('reportTemplate', 'reportTemplate', {
        closable: false,
        props: {
          content
        }
      })

      setTimeout(() => {
        this.children = findChildren(this.$refs.tabs.$children, this.activeTabName)
      }, 2000)
    },
    deactivated() {
      this.clearTab()
    },
    beforeDestroy() {
      this.clearTab()
    },
    methods: {
      addTab: mutations.addTab,
      clearTab: mutations.clearTab,
      async handleSearch(data) {
        const content = await getTemplate(`/xscommand/customReport/testReport${serializeData(data)}`)

        this.addTab('reportTemplate', 'reportTemplate', {
          props: {
            content
          }
        })
      }
    }
  }
</script>
