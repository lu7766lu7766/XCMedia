<template>
  <detail title="编辑" @submit="doSubmit()">
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">名称 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input type="text" class="form-control" placeholder="请输入名称" v-model="data.title" />
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label">图片 </label>
      <div class="col-md-10">
        <mutipleUpload
          @onImageUpload="onImageUpload"
          @onImageDelete="onImageDelete"
          :dataImageIds="data.image_ids"
          :imageList="imageList"
        ></mutipleUpload>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label required">开放时间 </label>
      <div class="col-md-10">
        <validate rules="required">
          <div class="input-group">
            <date-time-picker v-model="data.opening_time" />
            <div class="input-group-append">
              <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
            </div>
          </div>
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
import mutipleUpload from '@/mutipleUpload.vue'
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  mixins: [DetailMixins, ImageMixins],
  components: { DateTimePicker: require('@/DateTimePicker').default, mutipleUpload },
  data() {
    return {
      imageList: [],
    }
  },
  methods: {
    async doSubmit() {
      this.data.image_ids = this.imageList.map(x => x.id)
      const data = Object.assign(this.data)
      await this.$thisApi.doUpdate(data)
      this.updateSuccess()
    },
    async onImageUpload(files) {
      _.forEach(files, async image => {
        const res = await this.$thisApi.doUploadPic({ image }, { formData: true })
        this.imageList.push({
          name: res.data.name,
          id: res.data.id,
          src: res.data.file_url,
        })
      })
    },
    async onImageDelete(image_id) {
      const res = await this.$thisApi.doDeletePic({ image_id })
      this.imageList.forEach((x, i) => {
        if (x.id == res.data.id) {
          this.imageList.splice(i, 1)
        }
      })
      this.data.image_ids.forEach((x, i) => {
        if (x == res.data.id) {
          this.data.image_ids.splice(i, 1)
        }
      })
    },
    doDelImageList() {
      var imageList = this.imageList.map(x => x.id)
      let delImageList = imageList.filter(x => this.data.image_ids.indexOf(x) == -1)
      _.forEach(delImageList, id => {
        this.onImageDelete(id)
      })
    },
  },
  mounted() {
    this.$bus.on('update.show', async data => {
      var res = await this.$thisApi.getEditItem({ id: data.id })
      this.imageList = res.data.gallery.map(x => {
        return {
          name: x.name,
          id: x.id,
          src: x.file_url,
        }
      })

      this.data = _.cloneDeep(data)
      this.data.image_ids = res.data.gallery.map(x => x.id)
      this.show()
    })
  },
  destroyed() {
    this.$bus.off('update.show')
  },
}
</script>
