import { JacLib } from 'jactools'

export default {
  methods: {
    async handleImageChange(e)
    {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
      {
        return
      }
      return await JacLib.readImage(files[0])
    },
  },
}