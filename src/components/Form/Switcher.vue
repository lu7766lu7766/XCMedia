<template>
  <div class="switcher">
    <input type="checkbox" name="switcher_checkbox" id="switcher_checkbox" v-model="data">
    <label for="switcher_checkbox"></label>
  </div>
</template>

<script>
  export default {
    props: {
      enable: {
        default: true,
      },
      disable: {
        default: false,
      },
      value: '',
    },
    data: () => ({
      data: '',
    }),
    watch: {
      data()
      {
        this.$emit('input', this.data
          ? this.enable
          : this.disable,
        )
      },
      checked()
      {
        this.data = this.value === this.enable
      },
    },
    mounted()
    {
      this.data = this.value === this.enable
    },
  }
</script>
