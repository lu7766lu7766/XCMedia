<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control" placeholder="请输入名称">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">内容</label>
      <div class="col-md-10">
        <j-editor v-model="data.content" @image-added="doUploadPic" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间</label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="data.open_at" />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="far fa-calendar-alt" />
              </span>
            </div>
          </div>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'
import EditorMixins from 'mixins/Editor'

export default {
  mixins: [DetailMixins, ImageMixins, EditorMixins],
  components: { DateTimePicker: require('@/DateTimePicker').default },
  mounted () {
    this.$bus.on('update.show', (data) => {
      this.data = _.cloneDeep(data)
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = Object.assign(
        { literature_id: this.$route.params.id },
        this.data
      )
      await this.$thisApi.doUpdate(data)
      this.updateSuccess()
    },
    myUploadPic (...args) {
      this.doUploadPic(...args, 'image_ids')
    }
  }
}
</script>
