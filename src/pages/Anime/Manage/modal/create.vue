<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control">
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
              <input id="imgupload" ref="fileInput" class="imgupload" type="file" @change="onFileChange">
            </div>
            <div v-if="src" class="img-show">
              <i class="fas fa-times" @click="doDeletePic('image')" />
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
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <input v-model="data.alias" type="text" class="form-control">
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">集数状态 </label>
      <div class="col-md-10">
        <validate rules="required">
          <j-radio v-model="data.episode_status" :datas="options.episode" />
        </validate>
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
          <model-list-select v-model="data.region_id" :list="options.area" option-value="id" option-text="name" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            v-model="data.genre_ids"
            :list="options.type"
            option-value="id"
            option-text="title"
            :selected-items="data.genre_ids"
            @select="item => (data.genre_ids = item)"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">年份 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select v-model="data.years_id" :list="options.year" option-value="id" option-text="title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">语言 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select v-model="data.language_id" :list="options.lang" option-value="id" option-text="title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">描述 </label>
      <div class="col-md-10">
        <textarea
          v-model="data.description"
          rows="5"
          class="form-control"
        />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">人气 </label>
      <div class="col-md-10">
        <validate rules="numeric">
          <input v-model="data.views" type="text" class="form-control">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">评分</label>
      <div class="col-md-10">
        <validate rules="limitedDecimal:1,10">
          <input v-model="data.score" type="text" class="form-control" placeholder="0.0~10.0">
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
import EditorMixins from 'mixins/Editor'
import { ModelListSelect, MultiListSelect } from 'vue-search-select'
import JInputTag from '@/Form/InputTag'

export default {
  components: {
    JInputTag,
    ModelListSelect,
    MultiListSelect
  },
  mixins: [DetailMixins, ImageMixins, EditorMixins],
  mounted () {
    this.$bus.on('create.show', () => {
      this.data = {
        episode_status: 'serializing',
        status: 'Y',
        genre_ids: [],
        region_id: '',
        years_id: '',
        language_id: '',
        starring: [],
        director: []
      }

      this.src = ''
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      if (data.starring.length > 0) {
        data.starring = data.starring && data.starring.join(',')
      }
      if (data.director.length > 0) {
        data.director = data.director && data.director.join(',')
      }
      data.genre_ids = _.map(data.genre_ids, 'id')
      await this.$thisApi.doCreate(data, { formData: true })
      this.createSuccess()
    },
    myUploadPic (...args) {
      this.doUploadPic(...args, 'editor_image_ids')
    }
  }
}
</script>
