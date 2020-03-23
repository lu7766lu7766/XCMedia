<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="dropzone-box">
      <!-- <div id="dropzone" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false"> -->

      <div id="dropzone">
        <form class="dropzone dz-clickable" id="my-awesome-dropzone">
          <label for="avatar" style="width:100%">
            <div class="dz-default dz-message"><span>將檔案拖放到<b>此處</b>或<b>點擊</b>上傳。</span></div>
          </label>
          <div
            v-for="(item, index) of audioList"
            :key="index"
            class="dz-preview dz-processing dz-error dz-complete dz-image-preview"
            style="position: relative;"
          >
            <div class="dz-image"></div>
            <div class="dz-details">
              <div class="dz-filename">
                <span data-dz-name="">{{ item.name }}</span>
              </div>
            </div>
            <a class="dz-remove" @click="doDelete()">Delete</a>
          </div>
        </form>

        <input id="avatar" @change.prevent="onChoice" multiple style="display: none !important;" type="file" />
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
  components: {
    DateTimePicker: require('@/DateTimePicker').default,
    mutipleUpload,
  },
  data() {
    return {
      audioList: [],
    }
  },
  methods: {
    onDrop: function(event) {
      let data = event.dataTransfer
      if (data) {
        this.uploadImage(data.files)
      }
    },
    async onChoice(event) {
      this.uploadImage(event.target.files)
    },
    uploadImage: function(file) {
      // debugger
      this.onAudioUpload([...file])
      // this.$emit('onAudioUpload', [...file])
    },
    doDelete: function(id) {
      // this.$emit('onAudioDelete', id)
      debugger
    },
    //
    async doSubmit() {
      // const data = Object.assign({ comic_id: this.$route.params.id }, this.data)
      await this.$thisApi.doCreate(data)
      this.createSuccess()
    },
    onAudioUpload(files) {
      _.forEach(files, async audio => {
        const data = Object.assign({ audio }, this.data)
        // debugger
        const res = await this.$thisApi.doCreate(data, { formData: true })
        // debugger
        this.audioList.push({
          name: res.data.original_file_name,
          id: res.data.file_url,
          src: res.data.storytelling_id,
        })
      })
    },
    async onAudioDelete(image_id) {
      const res = await this.$thisApi.doDeletePic({ image_id })
      this.audioList.forEach((x, i) => {
        if (x.id == res.data.id) {
          this.audioList.splice(i, 1)
        }
      })
      this.data.image_ids.forEach((x, i) => {
        if (x == res.data.id) {
          this.data.image_ids.splice(i, 1)
        }
      })
    },
    doDelAudioList() {
      var audioList = this.audioList.map(x => x.id)
      let delAudioList = audioList.filter(x => this.data.image_ids.indexOf(x) == -1)
      _.forEach(delAudioList, id => {
        this.onImageDelete(id)
      })
    },
  },
  mounted() {
    this.$bus.on('create.show', () => {
      this.data = {
        storytelling_id: Number(this.$route.params.id),
      }
      this.audioList = []
      this.show()
    })
  },
  destroyed() {
    this.$bus.off('create.show')
  },
}
</script>
