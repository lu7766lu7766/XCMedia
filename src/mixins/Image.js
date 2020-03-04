import { JacLib } from 'jactools'

export default {
  data: () => ({
    src: '',
    imgInfo: '',
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
      const imgEle = this.$refs[key] || {}
      setTimeout(() => {
        this.imgInfo = {
          width: imgEle.naturalWidth,
          height: imgEle.naturalHeight,
          size: this.data[key] && this.data[key].size / 1024,
        }
      }, 100);
    },
    isImeSizeOK({width, height, size}) {
      const rules = {width, height, size}
      return Object.keys(rules).reduce((boo, key) => {
        if(rules[key] && (this.imgInfo[key] > rules[key])) {
          boo = false
        }
        return boo
      }, true)
    }
  },
}
