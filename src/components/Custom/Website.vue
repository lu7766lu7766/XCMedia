<template>
  <section>
    <div>
      <div class="form-check-inline radio radio-css">
        <input type="radio" name="status" id="r1" class="all-btn1" :value="true" v-model="isAll" @change="onChange">
        <label for="r1">全部</label>
      </div>
      <div class="form-check-inline radio radio-css">
        <input type="radio" name="status" id="r2" class="all-btn1" :value="false" v-model="isAll" @change="onChange">
        <label for="r2">个别</label>
      </div>
    </div>
    <div class="push-app-box">
      <j-listbox v-show="!isAll"
                 :value="value"
                 @input="val => $emit('input', val)"
                 :options="options"
                 placeholder="站台名稱" />
    </div>
  </section>
</template>

<script>
  export default {
    components: {
      JListbox: require('@/Form/ListBox').default,
    },
    props: {
      value: {
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
      valueKey: {
        default: 'id',
      },
      defaultAll: '',
    },
    data: () => ({
      isAll: true,
      tmpValue: [],
    }),
    methods: {
      onChange()
      {
        this.isAll
          ? this.change2All()
          : this.change2Custom()
      },
      change2All()
      {
        this.tmpValue = this.value
        this.$emit('input', _.map(this.options, this.valueKey))
      },
      change2Custom()
      {
        this.$emit('input', this.tmpValue)
      },
    },
    mounted()
    {
      // validate bug proccess
      this.tmpValue = this.value
      this.change2Custom()
      setTimeout(() =>
      {
        this.isAll = typeof this.defaultAll == 'undefined'
          ? this.value.length === this.options.length
          : this.defaultAll
        this.onChange()
      })
    },
  }
</script>

<style scoped>
  .push-app-box {
    margin-top: 10px;
  }
</style>
