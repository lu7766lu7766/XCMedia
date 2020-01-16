<template>
  <section>
    <div class="form-check-inline radio radio-css" v-for="(name, val) in datas" :key="val">
      <input type="radio" name="status" :id="'r'+val" :value="val" v-model="data" />
      <label :for="'r'+val">{{ name }}</label>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      datas: {
        type: Object,
        required: true,
      },
      value: {
        required: true,
      },
    },
    data: () => ({
      data: '',
    }),
    watch: {
      value()
      {
        this.data = this.value
      },
      data()
      {
        this.$emit('input', this.data)
      },
    },
    mounted()
    {
      this.data = this.value
    },
  }
</script>
