<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">帐号</label>
      <div class="col-md-10">
        <input type="text" class="form-control"
               :value="data.account" disabled />
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
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">密码确认</label>
      <div class="col-md-10">
        <validate rules="confirmed:password">
          <input type="password" class="form-control"
                 v-model="data.password_confirmation" />
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 control-label required">角色</label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-select :options="_.map(options.roles, role => ({ value: role.id, text: role.display_name }))"
                        :selected-options="data.roles"
                        @select="item => data.roles = item"
                        v-model="data.roles" />
        </validate>
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
        this.data.role_id = _.map(this.data.roles, 'value')
        await this.$thisApi.doUpdate(this.data)
        this.updateSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = _.cloneDeep(data)
        this.data.roles = _.map(this.data.roles, role => ({
          value: role.id,
          text: role.display_name,
        }))
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
