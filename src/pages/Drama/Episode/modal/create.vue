<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.title"
            type="text"
            class="form-control"
            placeholder="请输入名称"
          >
        </validate>
      </div>
    </div>
    <template v-if="data.sources_url">
      <div v-for="(source, index) in options.source" :key="index" class="form-group row m-b-15">
        <label class="col-md-2 col-form-label">{{ source.title }} </label>
        <div v-if="data.sources_url" class="col-md-10">
          <input v-model="data.sources_url[source.id]" type="text" class="form-control" placeholder="请输入网址">
        </div>
      </div>
    </template>

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
    this.$bus.on('create.show', () => {
      this.data = {
        status: 'Y',
        sources_url: {}
      }
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      const data = {
        episode_owner_id: this.$route.params.id,
        ...this.data,
        sources_url: _.pickBy(this.data.sources_url, t => !!t)
      }
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    }
  }
}
</script>
