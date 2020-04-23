<template>
  <div contenteditable="true" @input="update" />
</template>
<script>
  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.$el.innerHTML = this.value
    },
    methods: {
      update(event) {
        this.$emit('change', event.target.innerHTML)
      }
    }
  }
</script>
