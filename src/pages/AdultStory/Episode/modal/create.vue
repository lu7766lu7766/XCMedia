<template>
  <detail title="新增" @submit="doSubmit()">
    <div class="dropzone-box">
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
            <a class="dz-remove" @click="doDelete(index)">Delete</a>
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
        this.uploadAudio(data.files)
      }
    },
    async onChoice(event) {
      this.uploadAudio(event.target.files)
    },
    uploadAudio: function(file) {
      this.pushAudioList([...file])
    },
    doDelete: function(i) {
      this.audioList.splice(i, 1)
    },
    async doSubmit() {
      _.forEach(this.audioList, async audio => {
        const data = Object.assign({ audio: audio.file }, this.data)
        const res = await this.$thisApi.doCreate(data, { formData: true })
      })
      this.createSuccess()
      this.$emit('doSearch')
    },
    pushAudioList(files) {
      _.forEach(files, async audio => {
        this.audioList.push({
          file: audio,
          name: audio.name,
        })
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
  async destroyed() {
    this.$bus.off('create.show')
  },
}
</script>
