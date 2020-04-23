import contextMenuDirective from './src/directive'

import ContextMenu from './src/components/ContextMenu.vue'
import ContextMenuItem from './src/components/ContextMenuItem.vue'

const install = (Vue) => {
  Vue.directive('contextmenu', contextMenuDirective)

  Vue.component(ContextMenu.name, ContextMenu)
  Vue.component(ContextMenuItem.name, ContextMenuItem)
}

export {
  contextMenuDirective,

  ContextMenu,
  ContextMenuItem
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
