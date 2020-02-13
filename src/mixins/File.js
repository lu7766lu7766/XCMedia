import { JacLib } from 'jactools'

export default {
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
  },
}