import vue from 'rollup-plugin-vue'
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import uglify from '@cci/rollup-plugin-uglify-es'
import replace from 'rollup-plugin-replace'
import node from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import buble from 'rollup-plugin-buble'
import css from 'rollup-plugin-css-only'
import sass from 'rollup-plugin-sass'
import postcss from 'rollup-plugin-postcss'

// import copy from 'rollup-copy-plugin';
export function getConfig(type, min=true){
  const config = {
    inlineDynamicImports: true,
    input: './index.js',
    external: id => {
      if(/^(vue)$/.test(id)){
        return true
      }
      if(/^@cci\/cui/.test(id)){
        return true
      }
      if(/@babel\/runtime/.test(id)){
        return true
      }
      if(/^echarts/.test(id)){
        return true
      }
      if(/^lodash/.test(id)){
        return true
      }
      if(/^resize-detector/.test(id)){
        return true
      }
      if(/^sortablejs/.test(id)){
        return true
      }
      if(/^axios/.test(id)){
        return true
      }
      return /^(@cci\/cp-)/.test(id)
    },
    output: [{
      format: 'cjs',
      file: 'dist/index.js',
    }, {
      format: 'esm',
      file: 'dist/index.es.js',
    }],
    plugins: [
      replace({ 'process.env.NODE_ENV': 'production' }),
      globals(),
      builtins(),
      node({
        extensions: ['.vue', '.mjs', '.js', '.jsx', '.json' ],
      })
    ]
  }
  if(type && type.substr(0,3) === "vue"){
    if(type.substr(4,4) === 'sass'){
      config.plugins.push(sass({output: true}))
    } else if(type.substr(4,7)  === 'postcss'){
      config.plugins.push(postcss({ extract: true }))
    }
    config.plugins.push(css())
    config.plugins.push(vue({
      css: false,
      compileTemplate: true
    }))
   
    config.plugins.push(babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }))

    config.plugins.push(cjs())

  }else{

    config.plugins.push(cjs())

    config.plugins.push(buble({
      objectAssign: true
    }))
    
  }

  if(min!==false){
    config.plugins.push(uglify())
  }
  return config
}
export default getConfig('vue')