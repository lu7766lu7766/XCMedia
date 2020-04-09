import { join } from 'path'
import { JacLib } from 'jactools'
import API from 'lib/API'
import AlertMixins from 'mixins/Alert'

export default {
  mixins: [AlertMixins],
  data: () => ({
    src: '',
    videoName: ''
  }),
  methods: {
    getFiles (e) {
      return e.target.files || e.dataTransfer.files
    },
    toResourceUrl (path) {
      return path ? '//' + join(API.resourceUrl, path) : null
    },
    async handleImageChange (e) {
      const files = this.getFiles(e)
      if (!files.length) {
        return
      }
      return await JacLib.readImage(files[0])
    },
    async handleVideoChange (e) {
      const files = this.getFiles(e)
      if (!files.length) {
        return
      }
      return await files[0].name
    },
    async onFileChange (e, key = 'image', data = 'data') {
      if (key !== 'video') {
        this.src = await this.handleImageChange(e)
      } else {
        this.videoName = await this.handleVideoChange(e)
      }

      this[data][key] = this.getFiles(e)[0]
    },
    async doDeletePic (dataKey) {
      const confirm = await this.doConfirm('delete')
      if (!confirm) { return }
      this.src = ''
      this.$refs.fileInput.value = ''
      this.data[dataKey] = null
    }
  }
}
