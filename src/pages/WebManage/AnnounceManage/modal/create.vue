<template>
  <detail title="新增" @submit="doSubmit()">

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">标题</label>
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
          <j-editor v-model="data.contents"
                    @image-added="doUploadPic"></j-editor>
        </validate>
      </div>
    </div>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">跑马灯</label>
      <div class="col-md-10">
        <switcher v-model="data.marquee_switch" />
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
          <j-listbox v-model="data.branches"
                     :options="options.branchs" />
        </validate>
      </div>
    </div>

  </detail>
</template>

<script>
  import DetailMixins from 'mixins/Detail'
  import ThisMixins from './mixins'

  export default {
    mixins: [DetailMixins, ThisMixins],
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doCreate(data)
        this.createSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('create.show', () =>
      {
        this.data = {
          branches: [],
          marquee_switch: 'Y',
          status: 'Y',
        }
        this.show()
      })

    },
    destroyed()
    {
      this.$bus.off('create.show')
    },
  }
</script>