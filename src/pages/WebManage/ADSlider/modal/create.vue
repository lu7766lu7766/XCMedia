<template>
  <detail title="新增" @submit="doSubmit()">

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
            <validate rules="required">
              <input type="text" v-show="false" v-model="data.image">
            </validate>
          </div>
          <div v-if="imgSizeHint" class="text-red">
            电脑上传图片限制尺寸为{{ imgSizeHint }}
          </div>
        </div>
        <div class="slider-img-list">
          <div class="slider-img-head">{{ _.getVal(data, 'image.name', '档案名称') }}</div>
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
                     :defaultAll="true"
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
    computed: {
      imgSizeHint() {
        const i = this.options.types.findIndex(t => t.id === this.data.type_id)
        return i > -1 ? this.options.types[i].size_hint : ''
      }
    },
    methods: {
      async doSubmit()
      {
        const data = _.cloneDeep(this.data)
        await this.$thisApi.doCreate(data, {formData: true})
        this.createSuccess()
      },
    },
    mounted()
    {
      this.$bus.on('create.show', () =>
      {
        this.data = {
          branches: [],
          is_blank: 'N',
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
