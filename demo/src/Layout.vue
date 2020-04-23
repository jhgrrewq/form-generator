<template>
  <div class="layout">
    <c-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- <c-submenu index="1">
        <template slot="title">
          <i class="el-icon-location" />
          <span>excel</span>
        </template>
        <c-menu-item-group>
          <c-menu-item index="1-1">
            选项1
          </c-menu-item>
          <c-menu-item index="1-2">
            选项2
          </c-menu-item>
        </c-menu-item-group>
      </c-submenu> -->
      <c-menu-item index="#/excel/excellist">
        <a href="#/excel/excellist">excel</a>
      </c-menu-item>
      <c-menu-item index="#/word">
        <a href="#/word">word</a>
      </c-menu-item>
    </c-menu>
    <router-view class="wrapper" />
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
    }
  }
</script>
<style lang="scss">
.layout{
  height: 100%;
  display: flex;
  flex-direction: row;
  .el-menu-vertical-demo{
    // height: 100%;
  }
  .wrapper{
    overflow-y: auto;
  }
}
</style>

