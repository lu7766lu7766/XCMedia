<template>
  <detail title="批次新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">来源 </label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select
            v-model="data.source_id"
            title="请选择来源"
            :datas="options.source"
            display-key="title"
            value-key="id"
          />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">对应资料 </label>
      <div class="col-md-10">
        <validate rules="required">
          <textarea
            id=""
            v-model="data.data"
            name=""
            cols="30"
            rows="5"
            class="form-control"
            placeholder="请输入对应格式，范例如下说明"
          />
        </validate>
        <div class="m-t-1 form-txt text-red">
          填写说明：集数名称||影片网址
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间 </label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="data.opening_time" />
            <div class="input-group-append">
              <span class="input-group-text"><i class="far fa-calendar-alt" /></span>
            </div>
          </div>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态 </label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  components: { DateTimePicker: require('@/DateTimePicker').default },
  mixins: [DetailMixins, ImageMixins],
  mounted () {
    this.$bus.on('batchCreate.show', () => {
      this.data = {
        status: 'Y',
        source_id: '',
        opening_time: '',
        data: ''
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('batchCreate.show')
  },
  methods: {
    async doSubmit () {
      const _d = this.data
      const data = {
        episode_owner_id: this.$route.params.id,
        ..._d,
        data: this.textAreaToArray(_d.data)
      }
      await this.$thisApi.doBatchCreate(data)
      this.createSuccess()
    }
  }
}
</script>
