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
              <input
                id="imgupload"
                class="imgupload"
                type="file"
                @change="e => onFileChange(e, 'cover')"
              >
            </div>
            <div v-if="src" class="img-show">
              <img class="OpenImgUpload" :src="src">
            </div>
          </div>
          <div class="text-red">
            上传图片限制尺寸为263x300
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
      <label class="col-md-2 col-form-label required">地区 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select
            v-model="data.area"
            :list="options.areas"
            option-value="id"
            option-text="title"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">女优 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            v-model="data.girls"
            :list="options.girls"
            option-value="id"
            option-text="title"
            :selected-items="data.girls"
            @select="t => data.girls = t"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">罩杯 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select
            v-model="data.cup"
            :list="options.cups"
            option-value="id"
            option-text="title"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            v-model="data.types"
            :list="options.types"
            option-value="id"
            option-text="title"
            :selected-items="data.types"
            @select="t => data.types = t"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">年份 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select
            v-model="data.year"
            :list="options.years"
            option-value="id"
            option-text="title"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">标籤 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.tags" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">描述 </label>
      <div class="col-md-10">
        <j-editor v-model="data.desc" @image-added="myUploadPic" />
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
        title: '',
        cover: null,
        alias: '',
        area: '',
        girls: [],
        cup: '',
        types: [],
        year: '',
        tags: [],
        desc: '',
        status: 'Y'
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
      const _d = _.cloneDeep(this.data)
      const data = {
        title: _d.title,
        cover: _d.cover || undefined,
        alias: _d.alias || undefined,
        region_id: _d.area,
        av_actress_ids: _d.girls.map(t => t.id),
        cup_id: _d.cup,
        genres_ids: _d.types.map(t => t.id),
        years_id: _d.year,
        tags: _d.tags,
        description: _d.desc,
        status: _d.status
      }
      await this.$thisApi.doCreate(data, { formData: true })
      this.updateSuccess()
    },
    myUploadPic (...args) {
      this.doUploadPic(...args, 'editor_image_ids')
    }
  }
}
</script>
