<script>
  import MixinExcelTemplate from './mixin'
  export default {
    mixins: [MixinExcelTemplate],
    mounted() {
      this.$watch('content', function(val) {
        this.htmlStr = val
        this.$nextTick(() => {
          this.isEdit && this.init()
        })
      }, {
        immediate: true
      })
    },
    methods: {
      init() {
        const tbody = this.$el.getElementsByTagName('tbody')[0]
        const elemelem = tbody.children
        for (let i = 0; i < elemelem.length; i++) {
          // 当前节点
          const e = elemelem[i]
          if (e.children.length) {
            Array.prototype.reduce.call(e.children, (prev, curr) => {
              console.log(prev, curr)
              /* const key = curr.getAttribute('data-key')
              let value = curr.innerHTML
              if (curr.hasAttribute('data-option-value')) {
                const optionValue = curr.getAttribute('data-option-value')
                value = JSON.parse(optionValue)['optionValue']
              }
              if (key) {
                prev[key] = value
                return prev
              } */
            }, {})
          }
        }
      }
    },
    render() {
      return <div class="excel-template" {
        ...{
          domProps: {
            innerHTML: this.htmlStr
          }
        }
      }>
      </div>
    }
  }
</script>
