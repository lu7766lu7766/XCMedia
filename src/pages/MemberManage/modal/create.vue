<template>
  <detail title="新增" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">站台</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select :datas="options.branch"
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
                 v-model="data.account" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">昵称</label>
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
        <validate rules="required|min:4|max:32" vid="password">
          <input type="password" class="form-control"
                 v-model="data.password" />
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">电话 </label>
      <div class="col-md-10 verification-box">
        <div>
          <validate rules="phone">
            <input type="text" class="form-control" v-model="data.phone" />
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
            <input type="text" class="form-control" v-model="data.mail" />
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

  export default {
    mixins: [DetailMixins],
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doCreate(data)
        this.createSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('create.show', () =>
      {
        this.data = {
          status: 'enable',
        }
        this.show()
      })

    },
    destroyed()
    {
      this.$bus.off('create.show')
    },
  }
</script>
