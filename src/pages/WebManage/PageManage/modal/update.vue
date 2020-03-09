<template>
  <detail title="编辑" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">代码</label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control"
                 v-model="data.code" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control"
                 v-model="data.title" />
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">内容</label>
      <div class="col-md-10">
        <validate rules="required">
          <tinymce-editor
            :upload="uploadImg"
            v-model="data.contents">
          </tinymce-editor>
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
  import DetailMixins from 'mixins/Detail'
  import EditorMixins from 'mixins/Editor'

  export default {
    mixins: [DetailMixins, EditorMixins],
    components: {
      TinymceEditor: require('@/Form/tinymce-editor').default,
      jWebsite: require('@/Custom/Website').default,
    },
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doUpdate(data)
        this.updateSuccess()
      },
      uploadImg(blobInfo, success, failure) {
        var file = blobInfo.blob();
        this.doUploadTinymcePic(file).then(img => {
          success(img)
        })
      }
    },
    mounted()
    {
      this.$bus.on('update.show', data =>
      {
        const tmpData = _.cloneDeep(data)
        tmpData.branches = _.map(tmpData.branches, 'id')
        tmpData.image_ids = _.map(tmpData.editor_files, 'id')
        this.data = tmpData
        this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('update.show')
    },
  }
</script>
