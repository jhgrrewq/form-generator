import Vue from 'vue'
import { deepClone } from '../utils'

import { ExcelClickTemplate as reportTemplate } from 'packages/cp-edit-form'
// } from '@cci/cp-edit-form'

export const store = Vue.observable({
  activeTabName: "report",
  tabList: []
})

export const mutations = {
  setActiveTabName(name) {
    store.activeTabName = name
  },
  addTab(index, componentName, config = {}) {
    const idx = store.tabList.findIndex(f => f.name === index)
    if (idx === -1) {
      store.tabList.push(
        deepClone(true, {
          label: index,
          name: index,
          disabled: false,
          closable: true,
          props: deepClone(true, { name: index }, config.props || {}) // 模板添加 name prop
        }, config)
      )
      Vue.component(index, reportTemplate)
    } else {
      store.tabList.splice(idx, 1, deepClone(true, {}, store.tabList[idx], config))
    }
    store.activeTabName = index
  },
  closeTab(name) {
    const tab = store.tabList.filter(f => f.name === name)[0]
    const index = store.tabList.indexOf(tab)
    if (index !== store.tabList.length - 1) {
      store.activeTabName = store.tabList[index + 1].name
    } else {
      store.activeTabName = store.tabList[index - 1].name
    }
    store.tabList = store.tabList.filter(f => f.name !== name)
  },
  clearTab() {
    store.tabList = []
    store.activeTabName = ''
  }
}
