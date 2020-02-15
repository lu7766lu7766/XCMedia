<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">站台</label>
      <div class="col-md-10">
        <validate rules="required">
          <select class="form-control selectchange"
                  v-model="data.branch_id">
            <option value="">---请选择---</option>
            <option v-for="branch in options.branch" :key="branch.id"
                    :value="branch.id">
              {{ branch.name }}
            </option>
          </select>
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
                 v-model="data.password" />
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">电话 </label>
      <div class="col-md-10 verification-box">
        <div><input type="text" class="form-control" v-model="data.phone"/></div>
        <div>
          <input class="form-check-input" type="checkbox" name="" id="" v-model="data.phone_approve" />
          <label class="form-check-label" for="">
            验证
          </label>
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">Email </label>
      <div class="col-md-10 verification-box">
        <div><input type="text" class="form-control" v-model="data.mail"/></div>
        <div>
          <input class="form-check-input" type="checkbox" name="" id="" v-model="data.mail_approve" />
          <label class="form-check-label" for="">
            验证
          </label>
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
        let data = Object.assign({}, this.data, {
          phone_approve: !!this.data.phone_approve ? 'Y' : 'N',
          mail_approve: !!this.data.mail_approve ? 'Y' : 'N',
        })
        await this.$thisApi.doUpdate(data)
        this.updateSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = _.cloneDeep(data)
        this.data = Object.assign({}, this.data, {
          phone_approve: this.data.phone_approve === 'Y',
          mail_approve: this.data.mail_approve === 'Y',
        })
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
