import PaginageMixins from 'mixins/Paginate'
import ApiOptionMixins from 'mixins/ApiOption'
import AlertMixins from 'mixins/Alert'

export default {
  mixins: [PaginageMixins, ApiOptionMixins, AlertMixins],
  data: () => ({
    datas: []
  }),
  methods: {
    async doSearch (data) {
      this.paginate.page = 1
      await this.getList(data)
      await this.getTotal(data)
    },
    async doRefresh (data) {
      await this.getList(data)
      await this.getTotal(data)
    },
    async getList (data) {
      const res = await this.$thisApi.getList(data || this.reqBody)
      this.datas = res.data
      // console.log(this.datas)
    },
    async getTotal (data) {
      if (!this.$thisApi.getTotal) { return }
      const res = await this.$thisApi.getTotal(data || this.reqBody)
      this.paginate.total = res.data
    },
    pageChange (page) {
      this.paginate.page = page
      this.getList()
    },
    async doDelete (data, key = 'id') {
      let _data = data
      if (typeof data === 'string' || typeof data === 'number') {
        _data = { [key]: data }
      }
      const confirm = await this.doConfirm('delete')
      if (!confirm) { return }
      await this.$thisApi.doDelete(_data)
      this.$alert.success('刪除成功')
      this.doRefresh()
    }
  },
  computed: {
    startIndex () {
      return (this.paginate.page - 1) * this.paginate.perpage + 1
    },
    reqBody () {
      return _.pickBy(Object.assign({}, this.paginate, this.search), x => x !== '')
    }
  }
}
