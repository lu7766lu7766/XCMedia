<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">代碼</label>
      <div class="col-md-10">
        <validate rules="required|min:3|max:5">
          <input
            v-model="data.code"
            type="text"
            class="form-control"
          >
          <div class="m-t-1 form-txt text-red">
            长度3~5字元
          </div>
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">站台名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.name"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">域名</label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.domain"
            type="text"
            class="form-control"
          >
          <div class="m-t-1 form-txt text-red">
            請輸入網址，如:abc.com
          </div>
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">会员注册</label>
      <div class="col-md-10">
        <switcher v-model="data.is_register" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">备注</label>
      <div class="col-md-10">
        <textarea v-model="data.remark" cols="30" rows="5" class="form-control" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'

export default {
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('create.show', () => {
      this.data = {
        is_register: 'Y',
        status: 'Y'
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    }
  }
}
</script>
