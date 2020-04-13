<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.name"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.alias"
            type="text"
            class="form-control"
          >
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">图片 </label>
      <div class="col-md-10">
        <div class="upload-box">
          <div id="imgupload-box" class="custom-file">
            <div>
              <label for="imgupload" class="custom-file-upload">
                选择档案
              </label>
              <input
                id="imgupload"
                ref="fileInput"
                class="imgupload"
                type="file"
                @change="onFileChange($event, 'cover')"
              >
            </div>
            <div v-if="src" class="img-show">
              <i class="fas fa-times" @click="doDeletePic('cover')" />
              <img class="OpenImgUpload" :src="src">
            </div>
          </div>
          <div class="text-red">
            上传图片限制尺寸为263×300
          </div>
        </div>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态 </label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">备注 </label>
      <div class="col-md-10">
        <textarea v-model="data.note" class="form-control" rows="5" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  mixins: [DetailMixins, ImageMixins],
  mounted () {
    this.$bus.on('update.show', (data) => {
      this.data = _.cloneDeep(data)
      this.src = this.toResourceUrl(data.image_path)
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    }
  }
}
</script>
