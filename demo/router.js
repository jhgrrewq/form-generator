import Router from 'vue-router'
const router = new Router({
  routes: [{
    name: 'index',
    path: '/',
    redirect: '/excel/excelclick',
    chunkName: 'views/index',
    component: () => import("./src/Layout.vue"),
    children: [
      {
        name: 'excelclick',
        meta: {
          id: 0,
          pids: [],
          hideMenu: true,
          addTag: false
        },
        path: '/excel/excelclick',
        component: () => import("./src/views/excel/excelclick"),
        chunkName: 'views/excel/excelclick'
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
      }
    ]
  }]
})

export default router
