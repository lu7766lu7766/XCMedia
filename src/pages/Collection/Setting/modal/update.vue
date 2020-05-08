<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">帐号</label>
      <div class="col-md-10">
        <input type="text" class="form-control" :value="data.account" disabled>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">昵称</label>
      <div class="col-md-10">
        <validate rules="required|min:4|max:32">
          <input v-model="data.display_name" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">密码</label>
      <div class="col-md-10">
        <validate rules="min:4|max:32" vid="password">
          <input v-model="data.password" type="password" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">密码确认</label>
      <div class="col-md-10">
        <validate rules="confirmed:password">
          <input v-model="data.password_confirmation" type="password" class="form-control">
        </validate>
        <!--<div class="m-t-1 form-txt text-red">需英数组合, 4~16字元</div>-->
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">角色</label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            v-model="data.role_id"
            :list="options.roles"
            option-value="id"
            option-text="display_name"
            :selected-items="data.role_id"
            @select="item => (data.role_id = item)"
          />
        </validate>
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
import { MultiListSelect } from 'vue-search-select'

export default {
  components: {
    MultiListSelect
  },
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('update.show', (data) => {
      this.data = Object.assign({ role_id: [] }, data)
      this.data.role_id = data.roles

      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      this.data.role_id = _.map(this.data.role_id, 'id')
      await this.$thisApi.doUpdate(this.data)
      this.updateSuccess()
    }
  }
}
</script>
