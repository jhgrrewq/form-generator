<template>
  <WordTemplate v-model="text" class="word-template" />
</template>
<script>
  import WordTemplate from 'packages/cp-word-form'
  import htmlStr from './html.js'
  export default {
    components: {
      WordTemplate
    },
    data() {
      return {
        text: htmlStr
      }
    }
  }
</script>
<style lang="scss">
.word-template{
  width: 100%;
}
</style>
