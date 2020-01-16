<template>
  <div class="tree-item">
    <span><i :class="className"></i>{{ title }}</span>
    <span class="crud-box">
      <div class="checkboxcheckbox-inline">
        <input type="checkbox" v-if="hasChild" v-model="isChecked" />
        <input type="checkbox" v-else v-model="data" />
      </div>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        default: '',
      },
      className: {
        default: 'fa fa-angle-right text-black-transparent-6',
      },
      value: {
        default: [],
      },
      values: {
        default: [],
      },
      hasChild: {
        type: Boolean,
        default: true,
      },
    },
    data: () => ({
      data: false,
    }),
    watch: {
      data()
      {
        if (!this.hasChild)
        {
          this.emitNewValue(this.data)
        }
      },
      value()
      {
        this.data = this.isAllInValue
      },
    },
    methods: {
      emitNewValue(value)
      {
        this.$emit('input', value
          ? _.uniq(_.concat(this.values, this.value))
          : _.filter(this.value, id => this.values.indexOf(id) === -1),
        )
      },
    },
    computed: {
      isAllInValue()
      {
        for (let id of this.values)
        {
          if (this.value.indexOf(id) === -1)
          {
            return false
          }
        }
        return true
      },
      isChecked: {
        get()
        {
          return this.isAllInValue
        },
        set(value)
        {
          this.emitNewValue(value)
        },
      },
    },
    mounted()
    {
      this.data = this.isAllInValue
    },
  }
</script>
