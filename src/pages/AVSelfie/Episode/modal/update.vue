<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" placeholder="请输入名称" v-model="data.title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">图片 </label>
      <div class="col-md-10">
        <div class="upload-box">
          <div class="custom-file" id="imgupload-box">
            <div>
              <label for="imgupload" class="custom-file-upload">
                选择档案
              </label>
              <input
                class="imgupload"
                type="file"
                id="imgupload"
                @change="
                  e => {
                    onFileChange(e, 'cover')
                  }
                "
              />
            </div>
            <div class="img-show" v-if="src">
              <img class="OpenImgUpload" :src="src" />
            </div>
          </div>
          <div class="text-red">
            上传图片限制尺寸为263 × 300
          </div>
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">影片上传 </label>
      <div class="col-md-10">
        <div class="upload-box">
          <div class="custom-file" id="imgupload-box">
            <div>
              <label for="videoupload" class="custom-file-upload">
                选择档案
              </label>
              <input
                class="imgupload"
                type="file"
                id="videoupload"
                @change="
                  e => {
                    onFileChange(e, 'video')
                  }
                "
              />
            </div>
            <div class="img-show" v-if="videoName && videoName !== ''">
              <span>{{ this.videoName }}</span>
            </div>
            <div v-else>
              <div class="img-show" v-if="videoUrl">
                <video class="OpenImgUpload" width="250" controls>
                  <source :src="videoUrl" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间 </label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="data.release_date" />
            <div class="input-group-append">
              <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
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
  mixins: [DetailMixins, ImageMixins],
  components: { DateTimePicker: require('@/DateTimePicker').default },
  data: () => ({
    videoUrl: null,
  }),
  methods: {
    async doSubmit() {
      const data = Object.assign({ selfie_schedule_id: this.$route.params.id }, this.data)
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    },
  },
  mounted() {
    this.$bus.on('update.show', data => {
      this.data = _.cloneDeep(data)
      this.src = data.cover_url
      this.videoName = ''
      this.videoUrl = data.video_url

      this.show()
    })
  },
  destroyed() {
    this.$bus.off('update.show')
  },
}
</script>
