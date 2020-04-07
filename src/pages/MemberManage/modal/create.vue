<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">站台</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select
            v-model="data.branch_id"
            :datas="options.branch"
            value-key="id"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">帐号</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input
            v-model="data.account"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">昵称</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input
            v-model="data.display_name"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">密码</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32" vid="password">
          <input
            v-model="data.password"
            type="password"
            class="form-control"
          >
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">电话 </label>
      <div class="col-md-10 verification-box">
        <div>
          <validate rules="phone">
            <input v-model="data.phone" type="text" class="form-control">
          </validate>
        </div>
        <div>
          <j-checkbox v-model="data.phone_approve" title="验证" />
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">Email </label>
      <div class="col-md-10 verification-box">
        <div>
          <validate rules="email">
            <input v-model="data.mail" type="text" class="form-control">
          </validate>
        </div>
        <div>
          <j-checkbox v-model="data.mail_approve" title="验证" />
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" enable="enable" disable="disable" />
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
        status: 'enable'
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
