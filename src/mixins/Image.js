import { JacLib } from 'jactools'

export default {
  data: () => ({
    src: '',
  }),
  methods: {
    getFiles(e)
    {
      return e.target.files || e.dataTransfer.files
    },
    async handleImageChange(e)
    {
      var files = this.getFiles(e)
      if (!files.length)
      {
        return
      }
      return await JacLib.readImage(files[0])
    },
    async onFileChange(e, key = 'image')
    {
      this.src = await this.handleImageChange(e)
      this.data[key] = this.getFiles(e)[0]
    },
  },
}