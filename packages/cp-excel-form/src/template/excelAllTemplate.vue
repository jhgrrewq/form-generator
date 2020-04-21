<script>
  import MixinExcelTemplate from './mixin'
  export default {
    mixins: [MixinExcelTemplate],
    data() {
      return {
        parentDoms: [],
        htmlItems: []
      }
    },
    mounted() {
      this.$watch('content', function(val) {
        if (val) {
          this.htmlStr = val
          this.$nextTick(() => {
            this.isEdit && this.init()
          })
        }
      }, {
        immediate: true
      })
    },
    methods: {
      init() {
        const tbody = this.$el.getElementsByTagName('tbody')[0]
        const elemelem = tbody.children
        for (let i = 0; i < elemelem.length; i++) {
          const e = elemelem[i]
          if (e.children.length) {
            Array.prototype.map.call(e.children, eItem => {
              console.log(eItem, 'item::::::')
            })
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
