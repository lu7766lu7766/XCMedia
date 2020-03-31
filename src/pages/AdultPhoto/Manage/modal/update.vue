<template>
  <detail title="更新" @submit="doSubmit()">
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
      <label class="col-md-2 col-form-label required">地区 </label>
      <div class="col-md-10">
        <validate rules="required">
          <model-list-select
            :list="options.areas"
            v-model="data.area"
            optionValue="id"
            optionText="title"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">女优 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            :list="options.girls"
            optionValue="id"
            optionText="title"
            v-model="data.girls"
            :selectedItems="data.girls"
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
            :list="options.cups"
            v-model="data.cup"
            optionValue="id"
            optionText="title"
          />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型 </label>
      <div class="col-md-10">
        <validate rules="required">
          <multi-list-select
            :list="options.types"
            optionValue="id"
            optionText="title"
            v-model="data.types"
            :selectedItems="data.types"
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
            :list="options.years"
            v-model="data.year"
            optionValue="id"
            optionText="title"
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
import DetailMixins from "mixins/Detail"
import ImageMixins from "mixins/Image"
import EditorMixins from "mixins/Editor"
import JInputTag from "@/Form/InputTag"
import { ModelListSelect, MultiListSelect } from "vue-search-select"

export default {
  mixins: [DetailMixins, ImageMixins, EditorMixins],
  components: {
    JInputTag,
    ModelListSelect,
    MultiListSelect,
  },
  methods: {
    async doSubmit() {
      const _d = _.cloneDeep(this.data)
      const data = {
        id: _d.id,
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
      await this.$thisApi.doUpdate(data, { formData: true })
      this.updateSuccess()
    },
    myUploadPic(...args) {
      this.doUploadPic(...args, "editor_image_ids")
    },
  },
  mounted() {
    this.$bus.on("update.show", _d => {
      this.data = {
        id: _d.id,
        title: _d.title,
        alias: _d.alias,
        area: _d.area.id,
        cup: _d.cup.id,
        year: _d.year.id,
        girls: _d.girls,
        types: _d.types,
        tags: _d.tags,
        desc: _d.desc,
        status: _d.status,
      }
      this.src = _d.imgUrl
      this.show()
    })
  },
  destroyed() {
    this.$bus.off("update.show")
  },
}
</script>
