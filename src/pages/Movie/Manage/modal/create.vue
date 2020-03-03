<template>
  <detail title="新增" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control"
                 v-model="data.title" />
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
              <input class="imgupload" type="file" id="imgupload" @change="onFileChange">
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
      <label class="col-md-2 col-form-label required">集数状态 </label>
      <div class="col-md-10">
        <validate rules="required">
          <j-radio :datas="options.episode" v-model="data.episode_status" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">主持 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.host" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">来宾 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.guest" />
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
        data.host = data.host.join(',')
        data.guest = data.guest.join(',')
        data.genre_ids = _.map(data.genre_ids, 'id')
        await this.$thisApi.doCreate(data, {formData: true})
        this.createSuccess()
      },
      myUploadPic(...args)
      {
        this.doUploadPic(...args, 'editor_image_ids')
      },
    },
    mounted()
    {
      this.$bus.on('create.show', () =>
      {
        this.data = {
          episode_status: 'serializing',
          status: 'Y',
          genre_ids: [],
          region_id: '',
          years_id: '',
          language_id: '',
        }

        this.src = ''
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('create.show')
    },
  }
</script>
