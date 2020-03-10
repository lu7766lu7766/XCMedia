<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">站台</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select disabled
                    :datas="options.branch"
                    valueKey="id"
                    v-model="data.branch_id" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">帐号</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input type="text" class="form-control"
                 disabled
                 v-model="data.account" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">昵称</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input type="text" class="form-control"
                 v-model="data.display_name" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">密码</label>
      <div class="col-md-10">
        <validate rules="min:4|max:32" vid="password">
          <input type="password" class="form-control"
                 placeholder="若需要修改密码再填入"
                 v-model="data.password" />
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">电话 </label>
      <div class="col-md-10 verification-box">
        <div><input type="text" class="form-control" v-model="data.phone" /></div>
        <div>
          <j-checkbox v-model="data.phone_approve" title="验证" />
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">Email </label>
      <div class="col-md-10 verification-box">
        <div><input type="text" class="form-control" v-model="data.mail" /></div>
        <div>
          <j-checkbox v-model="data.mail_approve" title="验证" />
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher enable="enable" disable="disable" v-model="data.status" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">备注</label>
      <div class="col-md-10">
        <textarea cols="30" rows="5" class="form-control" v-model="data.remark"></textarea>
      </div>
    </div>
  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'
  import { MultiSelect } from 'vue-search-select'

  export default {
    mixins: [DetailMixins],
    components: {
      MultiSelect,
    },
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doUpdate(data)
        this.updateSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = _.cloneDeep(data)
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
