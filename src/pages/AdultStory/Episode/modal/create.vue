<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="dropzone-box">
      <div id="dropzone" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false">
        <form id="my-awesome-dropzone" class="dropzone dz-clickable">
          <label for="avatar" style="width:100%">
            <div class="dz-default dz-message"><span>將檔案拖放到<b>此處</b>或<b>點擊</b>上傳。</span></div>
          </label>
          <div
            v-for="(item, index) of audioList"
            :key="index"
            class="dz-preview dz-processing dz-error dz-complete dz-image-preview"
            style="position: relative;"
          >
            <div class="dz-image" />
            <div class="dz-details">
              <div class="dz-filename">
                <span data-dz-name="">{{ item.name }}</span>
              </div>
            </div>
            <a class="dz-remove" @click="doDelete(index)">Delete</a>
          </div>
        </form>

        <input id="avatar" multiple style="display: none !important;" type="file" @change.prevent="onChoice">
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  mixins: [DetailMixins, ImageMixins],
  data () {
    return {
      audioList: []
    }
  },
  mounted () {
    this.$bus.on('create.show', () => {
      this.data = {
        storytelling_id: Number(this.$route.params.id)
      }
      this.audioList = []
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('create.show')
  },
  methods: {
    onDrop (event) {
      const data = event.dataTransfer
      if (data) {
        this.uploadAudio(data.files)
      }
    },
    onChoice (event) {
      this.uploadAudio(event.target.files)
    },
    uploadAudio (file) {
      this.pushAudioList([...file])
    },
    doDelete (i) {
      this.audioList.splice(i, 1)
    },
    async doSubmit () {
      await this.onAudioUpload()
      await this.createSuccess()
      await this.$emit('doSearch')
    },
    async onAudioUpload () {
      const promiseArr = this.audioList.map((audio) => {
        const data = Object.assign({ audio: audio.file }, this.data)
        return this.$thisApi.doCreate(data, { formData: true })
      })
      await Promise.all(promiseArr)
    },
    pushAudioList (files) {
      _.forEach(files, (audio) => {
        this.audioList.push({
          file: audio,
          name: audio.name
        })
      })
    }
  }
}
</script>
