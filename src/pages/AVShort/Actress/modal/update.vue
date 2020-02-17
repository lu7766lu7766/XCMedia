<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control"
                 v-model="data.name" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control"
                 v-model="data.alias" />
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
              <input class="imgupload" type="file" id="imgupload" @change="onFileChange($event, 'cover')">
            </div>
            <div class="img-show" v-if="src">
              <img class="OpenImgUpload" :src="src">
            </div>
          </div>
          <div class="text-red">
            上传图片限制尺寸为263 × 300
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
        <textarea class="form-control" rows="5" v-model="data.note"></textarea>
      </div>
    </div>

  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'
  import ImageMixins from 'mixins/Image'

  export default {
    mixins: [DetailMixins, ImageMixins],
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doUpdate(data, {formData: true})
        this.updateSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = _.cloneDeep(data)
        this.src = data.image_url
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
