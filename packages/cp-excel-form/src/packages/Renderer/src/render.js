export const inputRender = function(h, item, opts) {
  return [h("c-input", opts)]
}

export const textRender = function(h, item, opts) {
  return [h('span', { staticClass: 'el-form-text' }, [this._v(opts.attrs.value)])]
}

export const customRender = function(h, item, opts) {
  return [item.render(opts)]
}

export const slotRender = function(h, item, opts) {
  return [h("div", opts, [typeof item.template === "function" ? item.template(h, opts) : item.template])]
}
export const switchRender = function(h, item, opts) {
  return [h("c-switch", opts)]
}
export const checkboxRender = function(h, item, opts) {
  return [h("CpCheckbox", opts)]
}
export const radioRender = function(h, item, opts) {
  return [h("CpRadio", opts)]
}
export const selectRender = function(h, item, opts) {
  return [h("CpSelect", opts)]
}

