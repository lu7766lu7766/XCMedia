<template>
  <date-picker v-model="date" :config="options" :placeholder="placeholder"></date-picker>
</template>

<script>
  import datePicker from 'vue-bootstrap-datetimepicker'
  import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

  export default {
    props: {
      value: {required: true},
      placeholder: {default: ''},
      format: {default: 'YYYY-MM-DD HH:mm:ss'},
    },
    components: {
      datePicker,
    },
    watch: {
      value()
      {
        this.date = this.value
      },
      date()
      {
        this.$emit('input', this.date)
      },
    },
    data()
    {
      return {
        date: null,
        options: {
          format: this.format,
          locale: moment.locale('zh-cn'),
          icons: {
            time: 'fas fa-clock',
          },
        },
      }
    },
    mounted()
    {
      this.date = this.value
    },
  }
</script>