<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称</label>
      <div class="col-md-10">
        <validate rules="required">
          <input v-model="data.title" type="text" class="form-control" placeholder="请输入名称">
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">图片</label>
      <div class="col-md-10">
        <mutipleImageUpload
          :data-image-ids="data.image_ids"
          :image-list="imageList"
          @onImageUpload="onImageUpload"
          @onImageDelete="onImageDelete"
        />
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间</label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="data.opening_time" />
            <div class="input-group-append">
              <span class="input-group-text">
                <i class="far fa-calendar-alt" />
              </span>
            </div>
          </div>
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">状态</label>
      <div class="col-md-10">
        <switcher v-model="data.status" />
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'
import mutipleImageUpload from '@/mutipleImageUpload.vue'

export default {
  components: {
    DateTimePicker: require('@/DateTimePicker').default,
    mutipleImageUpload
  },
  mixins: [DetailMixins, ImageMixins],
  data () {
    return {
      imageList: []
    }
  },
  mounted () {
    this.$bus.on('create.show', () => {
      this.data = {
        status: 'Y',
        image_ids: []
      }
      this.imageList = []
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    async doSubmit () {
      const data = Object.assign(
        { comic_id: this.$route.params.id },
        this.data
      )
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    },
    onImageUpload (files) {
      _.forEach(files, async (image) => {
        const res = await this.$thisApi.doUploadPic(
          { image },
          { formData: true }
        )
        this.data.image_ids.push(res.data.id)
        this.imageList.push({
          name: res.data.name,
          id: res.data.id,
          src: this.toResourceUrl(res.data.file_path)
        })
      })
    },
    async onImageDelete (id) {
      const res = await this.$thisApi.doDeletePic({ image_id: id })
      this.imageList.forEach((x, i) => {
        if (x.id === res.data.id) {
          this.imageList.splice(i, 1)
        }
      })
      this.data.image_ids.forEach((x, i) => {
        if (x === res.data.id) {
          this.data.image_ids.splice(i, 1)
        }
      })
    },
    doDelImageList () {
      const imageList = this.imageList.map(x => x.id)
      const delImageList = imageList.filter(
        x => !this.data.image_ids.includes(x)
      )
      _.forEach(delImageList, (id) => {
        this.onImageDelete(id)
      })
    }
  }
}
</script>
