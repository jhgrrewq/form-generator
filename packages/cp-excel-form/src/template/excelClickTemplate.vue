<script>
  import MixinExcelTemplate from './mixin'
  export default {
    mixins: [MixinExcelTemplate],
    watch: {
      content: {
        immediate: true,
        handler: function(val) {
          if (val) {
            this.htmlStr = val
          }
        }
      }
    },
    mounted() {
      // 外部可对 edit 事件做自定义处理
      !(this._event && this._event['edit']) && this.$on('edit', this.handleEdit)
    }
  }
</script>
