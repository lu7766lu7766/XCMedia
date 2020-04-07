import ImageMixins from 'mixins/Image'
import jEditor from '@/Form/Editor'

export default {
  mixins: [ImageMixins],
  components: {
    jEditor
  },
  methods: {
    async doUploadTinymcePic (image) {
      const res = await this.$thisApi.doUploadPic({ image }, { formData: true })
      return res.data.file_url
    },
    async doUploadPic (image, Editor, cursorLocation, resetUploader, key = 'image_ids') {
      const res = await this.$thisApi.doUploadPic({ image }, { formData: true })
      const url = this.toResourceUrl(res.data.file_path)
      this.insertImage(image, Editor, cursorLocation, resetUploader, url)
      this.add2Data(key, res.data.id)
    },
    insertImage (image, Editor, cursorLocation, resetUploader, url) {
      jEditor.methods.handleImageUpload(image, Editor, cursorLocation, resetUploader, url)
    },
    add2Data (key, id) {
      this.data[key] = this.data[key] || []
      this.data[key].push(id)
    }
  }
}
