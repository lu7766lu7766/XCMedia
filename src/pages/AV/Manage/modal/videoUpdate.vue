<template>
  <detail title="影片管理" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">影片上传</label>
      <div class="col-md-10">
        <div class="upload-box">
          <div class="custom-file" id="imgupload-box">
            <div>
              <label for="videoupload" class="custom-file-upload">选择档案</label>
              <input
                class="imgupload"
                type="file"
                id="videoupload"
                @change="
                  e => {
                    onFileChange(e, 'video','videoData')
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
      <label class="col-md-2 col-form-label required">开放时间</label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="videoData.release_time" />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="far fa-calendar-alt"></i>
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
import DetailMixins from "mixins/Detail";
import ImageMixins from "mixins/Image";

export default {
  mixins: [DetailMixins, ImageMixins],
  components: { DateTimePicker: require("@/DateTimePicker").default },
  data: () => ({
    videoUrl: null,
    videoData: {
      video: undefined,
      release_time: "",
      status: "Y"
    }
  }),
  methods: {
    async doSubmit() {
      const videoData = Object.assign(
        { adult_video_id: this.data.id },
        this.videoData
      );
      if (this.videoData.id) {
        await this.$thisApi.doUpdateVideo(videoData, { formData: true });
      } else {
        await this.$thisApi.doCreateVideo(videoData, { formData: true });
      }

      this.updateSuccess();
    }
  },
  mounted() {
    this.$bus.on("video_update.show", async data => {
      this.videoName = "";
      this.videoUrl = "";
      if (data.bucket) {
        this.videoData = data.bucket;
      this.videoUrl = data.bucket.file_url;
      } else {
        this.videoData = {
          video: undefined,
          release_time: "",
          status: "Y"
        };
      }
      this.data = _.cloneDeep(data);

      this.show();
    });
  },
  destroyed() {
    this.$bus.off("video_update.show");
  }
};
</script>
