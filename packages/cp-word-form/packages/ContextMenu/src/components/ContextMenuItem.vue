<template>
  <li
    v-if="divider"
    class="cp-contextmenu-divider"
  />

  <li
    v-else
    :class="classname"
    @click="handleClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <slot />
  </li>
</template>

<script>
  export default {
    name: 'CpContextMenuItem',

    inject: ['$$contextmenu'],

    props: {
      divider: Boolean,
      disabled: Boolean,
      autoHide: {
        type: Boolean,
        default: true,
      },
    },

    data () {
      return {
        hover: false,
      }
    },
    computed: {
      classname () {
        return {
          'cp-contextmenu-item': !this.divider,
          'cp-contextmenu-item--hover': this.hover,
          'cp-contextmenu-item--disabled': this.disabled,
        }
      },
    },

    methods: {
      handleMouseenter (event) {
        if (this.disabled) return

        this.hover = true

        this.$emit('mouseenter', this, event)
      },
      handleMouseleave (event) {
        if (this.disabled) return

        this.hover = false

        this.$emit('mouseleave', this, event)
      },

      handleClick (event) {
        if (this.disabled) return

        this.$emit('click', this, event)

        this.autoHide && this.$$contextmenu.hide()
      },
    },
  }
</script>
