<template>
  <detail title="编辑" @submit="doSubmit()">
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
              <validate v-slot="{ validate }" rules="image|img_width:263|img_height:300|img_size:1024">
                <input
                  id="imgupload"
                  ref="fileInput"
                  class="imgupload"
                  type="file"
                  @change="e => validate(e) && onFileChange(e, 'cover')"
                >
              </validate>
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
      <label class="col-md-2 col-form-label ">別名 </label>
      <div class="col-md-10">
        <input v-model="data.alias" type="text" class="form-control">
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
            v-model="data.genres_ids"
            :list="options.type"
            option-value="id"
            option-text="title"
            :selected-items="data.genres_ids"
            @select="item => (data.genres_ids = item)"
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
      <label class="col-md-2 col-form-label ">标籤 </label>
      <div class="col-md-10">
        <j-input-tag v-model="data.tags" />
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
    this.$bus.on('update.show', (data) => {
      this.data = Object.assign({ genres_ids: [] }, data)
      this.data.genres_ids = this.data.genres
      this.src = this.toResourceUrl(data.cover_path)
      this.data.image_ids = data.editor_files.map(t => t.id)
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      const data = _.cloneDeep(this.data)
      data.genres_ids = _.map(data.genres_ids, 'id')
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    },
    myUploadPic (...args) {
      this.doUploadPic(...args, 'image_ids')
    }
  }
}
</script>
