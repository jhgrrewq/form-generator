<template>
  <CpLayout
    :version="version"
    :menu="menu"
  >
    <router-view />
  </CpLayout>
</template>
<script>
  import CpLayout from '@cci/cp-layout'
  import '@cci/cp-layout/dist/index.css'

  function getMenu() {
    const menu = localStorage.getItem('userInfo_admin-base')
    if (menu) {
      return JSON.parse(menu).functionTreeList
    }
    return []
  }

  export default {
    name: 'Layout',
    components: {
      CpLayout
    },
    data() {
      return {
        user: { name: 'admin' },
        version: process.env.VUE_APP_VERSION || '',
        menu: getMenu()
      }
    }
  }
</script>
