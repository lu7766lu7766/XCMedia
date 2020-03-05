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
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <input type="text" class="form-control"
               v-model="data.alias" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">主演 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.starring" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">导演 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.director" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">地区 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select :list="options.area" v-model="data.region_id" optionValue="id" optionText="name" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select :list="options.type"
                             optionValue="id"
                             optionText="title"
                             :selectedItems="data.genre_ids"
                             @select="item => data.genre_ids = item"
                             v-model="data.genre_ids" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">年份 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select :list="options.year" v-model="data.years_id" optionValue="id" optionText="title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">语言 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select :list="options.lang" v-model="data.language_id" optionValue="id" optionText="title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">描述 </label>
      <div class="col-md-10">
        <j-editor v-model="data.description" @image-added="myUploadPic" />
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
  import EditorMixins from 'mixins/Editor'
  import JInputTag from '@/Form/InputTag'
  import { ModelListSelect, MultiListSelect } from 'vue-search-select'

  export default {
    mixins: [DetailMixins, ImageMixins, EditorMixins],
    components: {
      JInputTag, ModelListSelect, MultiListSelect,
    },
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        data.starring = data.starring && data.starring.join(',')
        data.director = data.director && data.director.join(',')
        data.genre_ids = _.map(data.genre_ids, 'id')
        await this.$thisApi.doUpdate(data, {formData: true})
        this.updateSuccess()
      },
      myUploadPic(...args)
      {
        this.doUploadPic(...args, 'image_ids')
      },
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        this.data = Object.assign({genre_ids: []}, data)
        this.data.starring = this.data.starring ? (this.data.starring).trim().split(',') : []
        this.data.director = this.data.director ? (this.data.director).trim().split(',') : []
        this.data.genre_ids = this.data.genres
        this.src = data.image_url
        this.data.image_ids = data.editor_files.map(t => t.id)
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>