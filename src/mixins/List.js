import PaginageMixins from 'mixins/Paginate'
import ApiOptionMixins from 'mixins/ApiOption'

export default {
  mixins: [PaginageMixins, ApiOptionMixins],
  data: () => ({
    datas: [],
    config: {
      swal: {
        delete: {
          title: '删除',
          text: '你确定要删除吗？',
          type: 'warning',
          showCancelButton: true,
          confirmButtonClass: 'btn btn-success',
          cancelButtonClass: 'm-l-10',
          confirmButtonColor: '#348fe2',
          cancelButtonColor: '#6c757d',
          cancelButtonText: '取消',
          confirmButtonText: '删除',
        },
      },
    },
  }),
  methods: {
    async doSearch(data) {
      this.paginate.page = 1
      await this.getList(data)
      await this.getTotal(data)
    },
    async doRefresh(data) {
      await this.getList(data)
      await this.getTotal(data)
    },
    async getList(data) {
      const res = await this.$thisApi.getList(data || this.reqBody)
      this.datas = res.data
      // console.log(this.datas)
    },
    async getTotal(data) {
      const res = await this.$thisApi.getTotal(data || this.reqBody)
      this.paginate.total = res.data
    },
    doSuccess(msg) {
      // alert(`${msg}成功`)
      this.$alert.success(`${msg}成功`)
      this.doRefresh()
    },
    deleteSuccess() {
      this.doSuccess('删除')
    },
    pageChange(page) {
      this.paginate.page = page
      this.getList()
    },
    async doDelete(id) {
      await this.doDeleteConfirm()
      await this.$thisApi.doDelete({ id })
      this.deleteSuccess()
    },
    async doDeleteConfirm() {
      const res = await this.$swal(this.config.swal.delete)
      if (!res.value) throw 'delete cancel'
    },
  },
  computed: {
    startIndex() {
      return (this.paginate.page - 1) * this.paginate.perpage + 1
    },
    reqBody() {
      return _.pickBy(Object.assign({}, this.paginate, this.search), x => x !== '')
    },
  },
}
