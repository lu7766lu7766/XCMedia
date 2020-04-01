<template>
  <detail title="新增" @submit="onSubmit()">
    <div class="dropzone-box">
    <div id="dropzone" @drop.prevent="onSelectedPic" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false">
      <form class="dropzone dz-clickable" id="my-awesome-dropzone">
        <label for="avatar" style="width:100%">
          <div class="dz-default dz-message"><span>將檔案拖放到<b>此處</b>或<b>點擊</b>上傳。</span></div>
        </label>
        <div
          v-for="(item, index) of photoList"
          :key="index"
          class="dz-preview dz-processing dz-error dz-complete dz-image-preview"
          style="position: relative;"
        >
          <div class="dz-image">
            <img :src="item.imgSrc" data-dz-thumbnail alt="" />
          </div>
          <div class="dz-details">
            <div class="dz-filename">
              <span data-dz-name="">{{ item.file.name }}</span>
            </div>
          </div>
          <a class="dz-remove" href="" @click.prevent="onDelete(index)">Delete</a>
        </div>
      </form>

      <input id="avatar" @change.prevent="onSelectedPic" multiple style="display: none !important;" type="file" />
    </div>
  </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  mixins: [DetailMixins, ImageMixins],
  components: {
  },
  data() {
    return {
      photoList: [],
      id: +this.$route.params.id
    }
  },
  methods: {
    async onSubmit() {
      const promiseArr = this.photoList.map(t => {
        const data = {
          photography_id: this.id,
          file: t.file
        }
        return this.$thisApi.doCreate(data, { formData: true })
      })
      await Promise.all(promiseArr)
      this.createSuccess()
    },
    onSelectedPic(e) {
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files
      if (files) {
        files.forEach(file => {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.photoList.push({
              file,
              imgSrc: e.target.result,
            })
          }
          reader.readAsDataURL(file); // convert to base64 string
        })
      }
    },
    onDelete(index) {
      this.photoList.splice(index, 1)
    }
  },
  mounted() {
    this.$bus.on('create.show', () => {
      this.data = {
        photography_id: this.id
      }
      this.photoList = []
      this.show()
    })
  },
  async destroyed() {
    this.$bus.off('create.show')
  },
}
</script>
