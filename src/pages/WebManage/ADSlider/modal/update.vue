<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select
            v-model="data.type_id"
            :datas="options.types"
            value-key="id"
          />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题 </label>
      <div class="col-md-10">
        <validate rules="required|max:50">
          <input v-model="data.title" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">轮播图 </label>
      <div class="col-md-10">
        <div class="upload-box">
          <div class="custom-file">
            <label for="file-upload" class="custom-file-upload">
              选择档案
            </label>
            <input id="file-upload" type="file" @change="onFileChange">
          </div>
          <div class="text-red">
            电脑上传图片限制尺寸为1920x550, 行动装置上传图片限制尺寸为750x400
          </div>
        </div>
        <div class="slider-img-list">
          <div class="slider-img-head">
            {{ data.image ? _.getVal(data, 'image.name') : _.last(src.split('/')) }}
          </div>
          <div class="slider-img-body">
            <img v-if="src" :src="src">
          </div>
        </div>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">另开视窗 </label>
      <div class="col-md-10">
        <switcher v-model="data.is_blank" />
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">连结 </label>
      <div class="col-md-10">
        <validate rules="max:255">
          <input v-model="data.url" type="text" class="form-control">
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">发布站台</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-website
            v-model="data.branches"
            :options="options.branches"
          />
        </validate>
      </div>
    </div>
  </detail>
</template>

<script>
import ThisMixins from './mixins'

export default {
  mixins: [ThisMixins],
  mounted () {
    this.$bus.on('update.show', (data) => {
      const tmpData = _.cloneDeep(data)
      tmpData.branches = _.map(tmpData.branches, 'id')
      this.data = tmpData
      this.src = tmpData.image_url
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('update.show')
  },
  methods: {
    async doSubmit () {
      await this.$thisApi.doUpdate(_.pickBy(this.data, x => x !== ''), { formData: true })
      this.updateSuccess()
    }
  }
}
</script>
