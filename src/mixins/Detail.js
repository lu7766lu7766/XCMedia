export default {
  components: {
    Detail: require('@/Container/Detail').default,
    Switcher: require('@/Form/Switcher').default
  },
  data: () => ({
    data: {}
  }),
  methods: {
    show () {
      this.$modal.show()
      // this.$refs.modal.show()
    },
    createSuccess () {
      this.doSuccess('新增')
    },
    updateSuccess () {
      this.doSuccess('编辑')
    },
    doSuccess (msg) {
      this.$alert.success(`${msg}成功`)
      this.$modal.hide()
      this.$parent.doRefresh()
    },
    textAreaToArray (text) {
      if (!text) { return '' }
      return text.split('\n')
        .map((item) => {
          const _t = item.split('||').map(t => t.trim())
          return { name: _t[0], url: _t[1] }
        })
    },
    arrayToTextarea (arr) {
      return arr.reduce((str, item) => {
        str += `${item.name}||${item.url || ''}\n`
        return str
      }, '')
    }
  },
  computed: {
    $modal () {
      return this.$children[0]
    },
    options () {
      return this.$parent.options
    },
    translate () {
      return this.$parent.translate
    },
    $thisApi () {
      return this.$parent.$thisApi
    }
  }
}
