<template>
  <button
    :style="{backgroundColor: backgroundColor, color: color}"
    class="app-button"
    @click="onClick"
  >
    {{ text }}
  </button>
</template>
<script>
  export default {
    name: 'AppButton',
    props: {
      isDisabled: { type: Boolean, default: () => false },
      color: { type: String, default: () => '' },
      backgroundColor: { type: String, default: () => '' },
      text: { type: String, default: () => '' },
    },
    methods: {
      onClick() {
        !this.isDisabled ? this.$emit('click') : null
      },
    },
  }
</script>
<style scoped>
  .app-button {
    width: 85%;
    padding: 8px;
    margin: 3px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 2px 2px 20px 0 rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
  }
</style>
