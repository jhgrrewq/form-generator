## CCI CUI components

### babel 
yarn add @babel/core  @vue/babel-preset-app babel-plugin-dynamic-import-webpack -D

### 多套主题换肤

使用 `style-loader` 的 `useable` 进行样式切换

#### 基本知识

`style-loader` 可详细参考 [style-loader github](https://github.com/webpack-contrib/style-loader)

##### 安装

```bash
npm install style-loader -D
```

##### useable 用法

`style-loader` 通过引用计数器 API(Reference Counter API) `style.use() / style.unuse()` 将样式进行注入和切换

引用计数器 API(Reference Counter API) 应关联到 `.useable.css` (可以自定义命名)，而 .css 的载入，应该使用基本的 `style-loader` 用法

```js
import style from './file.useable.css';

style.use(); // = style.ref();
style.unuse(); // = style.unref();
```

样式不会添加在 `import/require()` 上，而是在调用 `use/ref` 时添加。如果 `unuse/unref` 与 `use/ref` 一样频繁地被调用，那么样式将从页面中删除

#### 使用方法

本地存放多套主题，如一套叫 `cp-theme-default` ，一套叫 `cp-theme-ant`, 一套叫 `cp-theme-light`, 一套叫`cp-theme-dark`。

创建以 `.useable.css` 为后缀的文件（可自定义, 但需要和 webpack module rule 正则验证文件名保持一致），引入对应主题样式

```css
// ./theme/cp-theme-default.useable.css
@import '~@cci/cp-theme-default/lib/index.css';

// ./theme/cp-theme-ant.useable.css
@import '~@cci/cp-theme-ant/lib/index.css';

// ./theme/cp-theme-light.useable.css
@import '~@cci/cp-theme-light/lib/index.css';

@// ./theme/cp-theme-dark.useable.css
@import '~@cci/cp-theme-dark/lib/index.css';
```

##### 配置 webpack

一般 webpack 配置，`.css` 文件还是使用正常的配置，`.useable.css` 则使用 `style-loader/useable` 处理

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.useable\.css$/,
        use: [
          {
            loader: "style-loader/useable"
          },
          { loader: "css-loader" },
        ],
      },
    ],
  },
}
```

`vue cli3` 内置了对 css 的处理，使用 `webpack-chain` 修改配置，项目中的配置如下

```js
// ./build/dev.js
...
// 处理 style-loader useable
const normalRule = chain.module.rule('css').oneOfs.store.get('normal')
chain.module
  .rule('css')
  .oneOfs
  .store
  .delete('normal')
chain.module
  .rule('css')
  .oneOf('useable')
  .test(/\.useable\.css$/)
  .use('style-loader/useable')
  .loader('style-loader/useable')
  .end()
  .use('css-loader')
  .loader('css-loader')
  .end()
chain.module
  .rule('css')
  .oneOfs
  .store
  .set('normal', normalRule)
...
```
 
##### 页面引入

```js
import styles from './theme/cp-theme-default.useable.css'

mounted() {
  styles.use()
}
```

### 多套模板切换

主要是全局注册多个模板组件，借助 vue 动态组件 component 的 `is` 属性， 根据模板组件 `name` 属性来切换模板

#### 使用方法

##### 引入模板

在项目中创建多个模板文件，每个文件引入对应模板，并 `mixins` 到自身

```bash
├── App.vue
├── Demo.vue
├── Empty.vue
├── Layout.vue
├── LayoutComponents
└── LayoutComponents
  ├── index.js
  ├── LayoutAnt.vue
  ├── LayoutDark.vue
  ├── LayoutDefault.vue
  └── LayoutLight.vue
```

以 demo 文件夹为例，创建 `LayoutComponents` 目录，然后创建 `LayoutAnt.vue`  `LayoutDark.vue` `LayoutDefault.vue` `LayoutLight.vue`

```vue
<script>
  import Layout from '@cci/cp-layout'
  import '@cci/cp-layout/dist/index.css'
  export default {
    name: 'LayoutDefault',
    componentName: 'LayoutDefault',
    mixins: [Layout]
  }
</script>
```

以 `LayoutDefault.vue` 为例, 这里引入 `@cci/cp-layout` 模板组件，并 `mixins` 到自身；同时引入 `@cci/cp-layout` 样式文件；这里要设置`name: 'LayoutDefault'`, 因为之后全局注册组件和 切换模板需要用到

##### 全局注册模板文件

使用 `vue` 来进行全局注册即可，demo 项目中 `LayoutComponents/index.js` 写了一个通用方法，利用 require.context 来自动化安装

```javascript
import Vue from 'vue'
// require in the layout component context
const requireComponent = require.context('./', false, /\.vue$/)

const componentName = []

requireComponent.keys().forEach(item => {
  // get component config
  const componentConfig = requireComponent(item)
  const component = componentConfig.default || componentConfig
  componentName.push(component.name)
  // register component globally
  Vue.component(component.name, component)
})

export default componentName
```

##### `component` 组件 `is` 属性

```vue
<template>
  <component
    :is="layoutName"
    :version="version"
    :menu="menu"
  >
    ...
  </component>
</template>
<script>
import LayoutName from './LayoutComponents'

export default {
  data() {
    return {
      layoutName: 'LayoutDefault'
    }
  }
}
</script>
```

在需要使用 layout 组件的地方替换成 `component` 组件，添加 `is` 属性，只需要切换模板 `name` 即可