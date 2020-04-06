<template>
  <detail title="影片管理" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">影片上传</label>
      <div class="col-md-10">
        <div class="upload-box">
          <div id="imgupload-box" class="custom-file">
            <div>
              <label for="videoupload" class="custom-file-upload">选择档案</label>
              <input
                id="videoupload"
                class="imgupload"
                type="file"
                @change="
                  e => {
                    onFileChange(e, 'video','videoData')
                  }
                "
              >
            </div>
            <div v-if="videoName && videoName !== ''" class="img-show">
              <span>{{ videoName }}</span>
            </div>
            <div v-else>
              <div v-if="videoUrl" class="img-show">
                <video class="OpenImgUpload" width="250" controls>
                  <source :src="videoUrl">
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间</label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="videoData.release_time" />
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
        <switcher v-model="videoData.status" />
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
  data: () => ({
    videoUrl: null,
    videoData: {
      video: undefined,
      release_time: '',
      status: 'Y'
    }
  }),
  mounted () {
    this.$bus.on('video_update.show', (data) => {
      if (data.bucket) {
        this.videoData = data.bucket
      } else {
        this.videoData = {
          video: undefined,
          release_time: '',
          status: 'Y'
        }
      }
      this.data = _.cloneDeep(data)
      this.videoName = ''
      this.videoUrl = data.video_url
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('video_update.show')
  },
  mounted () {
    this.$bus.on('video_update.show', async (data) => {
      this.videoName = ''
      this.videoUrl = ''
      if (data.bucket) {
        this.videoData = data.bucket
        this.videoUrl = data.bucket.file_url
      } else {
        this.videoData = {
          video: undefined,
          release_time: '',
          status: 'Y'
        }
      }
      this.data = _.cloneDeep(data)

      this.show()
    })
  },
  destroyed () {
    this.$bus.off('video_update.show')
  },
  methods: {
    async doSubmit () {
      const videoData = Object.assign(
        { adult_video_id: this.data.id },
        this.videoData
      )
      if (this.videoData.id) {
        await this.$thisApi.doUpdateVideo(videoData, { formData: true })
      } else {
        await this.$thisApi.doCreateVideo(videoData, { formData: true })
      }

      this.updateSuccess()
    }
  }
}
</script>
