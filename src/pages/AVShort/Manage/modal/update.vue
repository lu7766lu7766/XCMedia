<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" v-model="data.title" />
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
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <input type="text" class="form-control" v-model="data.alias" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">片种 </label>
      <div class="col-md-10">
        <validate rules="required">
          <j-radio :datas="options.episode" v-model="data.mosaic_type" />
        </validate>
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
      <label class="col-md-2 col-form-label required">女优 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            :list="options.actress"
            optionValue="id"
            optionText="name"
            :selectedItems="data.av_actress_ids"
            @select="item => (data.av_actress_ids = item)"
            v-model="data.av_actress_ids"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">罩杯 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select :list="options.cup" v-model="data.cup_id" optionValue="id" optionText="size" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            :list="options.type"
            optionValue="id"
            optionText="title"
            :selectedItems="data.genres_ids"
            @select="item => (data.genres_ids = item)"
            v-model="data.genres_ids"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">年份 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select :list="options.year" v-model="data.year_id" optionValue="id" optionText="title" />
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
    JInputTag,
    ModelListSelect,
    MultiListSelect,
  },
  methods: {
    async doSubmit() {
      const data = _.cloneDeep(this.data)
      data.genres_ids = _.map(data.genres_ids, 'id')
      data.av_actress_ids = _.map(data.av_actress_ids, 'id')
      if (data.tags.length > 0) {
        data.tags = data.tags && data.tags.join(',')
      }
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    },
    myUploadPic(...args) {
      this.doUploadPic(...args, 'image_ids')
    },
  },
  mounted() {
    this.$bus.on('update.show', data => {
      this.data = Object.assign({ genres_ids: [], av_actress_ids: [] }, data)
      this.data.genres_ids = data.genres
      this.data.av_actress_ids = data.av_actress
      if (data.tags) {
        this.data.tags = data.tags.split(',')
      } else {
        this.data.tags = []
      }
      this.src = data.cover_url
      this.show()
    })
  },
  destroyed() {
    this.$bus.off('update.show')
  },
}
</script>
