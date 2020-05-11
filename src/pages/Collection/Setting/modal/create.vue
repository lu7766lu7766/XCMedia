<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">资源名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select
            v-model="data.source"
            title="请选择资源"
            :datas="options.source"
            display-key="title"
            value-key="id"
          />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">采集类型</label>
      <div class="col-md-10">
        <validate rules="required">
          <div v-for="(t, i) in options.type" :key="i" class="form-check form-check-inline">
            <label>
              <input v-model="data.type" class="form-check-input" type="checkbox" :value="t.id">
              {{ t.title }}
            </label>
          </div>
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">采集平台</label>
      <div class="col-md-10">
        <validate rules="required">
          <div v-for="(t, i) in options.platform" :key="i" class="form-check form-check-inline">
            <label>
              <input v-model="data.platform" class="form-check-input" type="checkbox" :value="t.id">
              {{ t.title }}
            </label>
          </div>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" enable="Y" disable="N" />
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
        source: '',
        type: [],
        platform: [],
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
      const _d = this.data
      const data = {
        source_id: _d.source,
        type_ids: _d.type,
        platform_ids: _d.platform,
        status: _d.status
      }
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    }
  }
}
</script>
