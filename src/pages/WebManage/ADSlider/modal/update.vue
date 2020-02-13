<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">类型</label>
      <div class="col-md-10">
        <validate rules="required">
          <j-select :datas="options.types"
                    valueKey="id"
                    v-model="data.type_id" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题 </label>
      <div class="col-md-10">
        <validate rules="required|max:50">
          <input type="text" class="form-control" v-model="data.title" />
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
            电脑上传图片限制尺寸为1920 × 550, 行动装置上传图片限制尺寸为750 × 400
          </div>
        </div>
        <div class="slider-img-list">
          <div class="slider-img-head">档案名称</div>
          <div class="slider-img-body">
            <img v-if="src" :src="src" />
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
          <input type="text" class="form-control" v-model="data.url" />
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
          <j-website v-model="data.branches"
                     :options="options.branches" />
        </validate>
      </div>
    </div>

  </detail>
</template>

<script>
  import ThisMixins from './mixins'

  export default {
    mixins: [ThisMixins],
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
        const tmpData = _.cloneDeep(data)
        tmpData.branches = _.map(tmpData.branches, 'id')
        this.data = tmpData
        this.src = tmpData.image_url
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
