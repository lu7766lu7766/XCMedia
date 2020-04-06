import { JacLib } from 'jactools'

export default {
  data: () => ({
    src: '',
    videoName: '',
  }),
  methods: {
    getFiles(e) {
      return e.target.files || e.dataTransfer.files
    },
    async handleImageChange(e) {
      var files = this.getFiles(e)
      if (!files.length) {
        return
      }
      return await JacLib.readImage(files[0])
    },
    async handleVideoChange(e) {
      var files = this.getFiles(e)
      if (!files.length) {
        return
      }
      return await files[0].name
    },
    async onFileChange(e, key = 'image', data = 'data') {
      if (key !== 'video') {
        this.src = await this.handleImageChange(e)
      } else {
        this.videoName = await this.handleVideoChange(e)
      }

      this[data][key] = this.getFiles(e)[0]
    },
  },
}
