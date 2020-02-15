<template>
  <section>
    <input class="form-check-input" type="checkbox" :id="id" v-model="data" />
    <label class="form-check-label" v-if="title" :for="id">
      {{ title }}
    </label>
  </section>
</template>

<script>
  export default {
    props: {
      enable: {default: 'Y'},
      disable: {default: 'N'},
      value: {required: true},
      title: '',
    },
    data: () => ({
      data: null,
      id: null,
    }),
    watch: {
      data()
      {
        this.$emit('input', this.data
          ? this.enable
          : this.disable,
        )
      },
    },
    mounted()
    {
      this.id = 'checkbox-' + parseInt(Math.random() * 100000)
      this.data = this.value === this.enable
    },
  }
</script>

<style scoped>

</style>