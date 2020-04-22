import Router from 'vue-router'
const router = new Router({
  routes: [{
    name: 'index',
    path: '/',
    redirect: '/excel/excellist',
    chunkName: 'views/index',
    component: () => import("./src/Layout.vue"),
    children: [
      {
        name: 'excellist',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excellist',
        component: () => import("./src/views/excel"),
        chunkName: 'views/excel/excellist'
      },
      {
        name: 'excelclickedit',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excelclick/edit/:id',
        component: () => import("./src/views/excel/excelclick/src/edit"),
        chunkName: 'views/excel/excelclickedit'
      },
      {
        name: 'excelclickadd',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excelclick/add/:id',
        component: () => import("./src/views/excel/excelclick/src/add"),
        chunkName: 'views/excel/excelclickadd'
      },
      {
        name: 'excelalledit',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excelall/edit/:id',
        component: () => import("./src/views/excel/excelall/src/edit"),
        chunkName: 'views/excel/excelalledit'
      },
      {
        name: 'excelalladd',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excelall/add/:id',
        component: () => import("./src/views/excel/excelall/src/add"),
        chunkName: 'views/excel/excelalladd'
      }
    ]
  }]
})

export default router
