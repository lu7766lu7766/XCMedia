<template>
  <v-listbox
      ref="listbox"
      class="j-dual-listbox"
      :source="source"
      :destination="data"
      :label="displayKey"
      @onChangeList="onChangeList"
  />
</template>

<script>
  import 'dual-listbox-vue/dist/dual-listbox.css'

  export default {
    props: {
      value: '',
      displayKey: {default: 'name'},
      valueKey: {default: 'id'},
      options: {
        type: Array,
        required: true,
      },
      placeholder: {default: 'search'},
    },
    components: {
      vListbox: require('dual-listbox-vue'),
    },
    data: function ()
    {
      var tmpSource, tmpData
      if (this.valueKey)
      {
        tmpSource = _.filter(this.options, x => this.value.indexOf(x[this.valueKey]) === -1)
        tmpData = _.filter(this.options, x => this.value.indexOf(x[this.valueKey]) > -1)
      }
      else
      {
        tmpSource = _.filter(this.options, option => _.some(this.value, v => _.isEqual(v, option)))
        tmpData = _.filter(this.options, option => _.every(this.value, v => !_.isEqual(v, option)))
      }
      return {
        source: tmpSource,
        data: tmpData,
      }
    },
    methods: {
      onChangeList({source, destination})
      {
        this.source = source
        this.data = destination
        this.$emit('input', this.valueKey
          ? _.map(destination, this.valueKey)
          : destination)
      },
    },
    mounted()
    {
      this.$nextTick(() =>
      {
        const boxes = this.$refs.listbox.$el.querySelectorAll('input')
        for (let box of boxes)
        {
          box.placeholder = this.placeholder
        }
      })
    },
  }
</script>

<style lang="stylus" scoped>
  .j-dual-listbox >>> .btn-action
    background #fff
    border #bbb 1px solid
    path
      fill #666

  .j-dual-listbox >>> .bulk-action
    display none
</style>