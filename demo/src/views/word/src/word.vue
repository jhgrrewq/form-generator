<template>
  <WordTemplate v-model="text" class="word-template" />
</template>
<script>
  import WordTemplate from 'packages/cp-word-form'
  export default {
    components: {
      WordTemplate
    },
    data() {
      return {
        text: 'adfadfa'
      }
    }
  }
</script>
<style lang="scss">
.word-template{
  width: 100%;
}
</style>
