export default {
  data: () => ({
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
        confirmButtonText: '删除'
      }
    }
  }),
  methods: {
    async doConfirm (type) {
      const res = await this.$swal(this.swal[type])
      return !!res.value
    }
  }
}
