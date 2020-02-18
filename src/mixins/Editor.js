import jEditor from '@/Form/Editor'

export default {
  components: {
    jEditor,
  },
  methods: {
    async doUploadPic(image, Editor, cursorLocation, resetUploader, key = 'image_ids')
    {
      const res = await this.$thisApi.doUploadPic({image}, {formData: true})
      this.insertImage(image, Editor, cursorLocation, resetUploader, res.data.file_url)
      this.add2Data(key, res.data.id)
    },
    insertImage(image, Editor, cursorLocation, resetUploader, url)
    {
      jEditor.methods.handleImageUpload(image, Editor, cursorLocation, resetUploader, url)
    },
    add2Data(key, id)
    {
      this.data[key] = this.data[key] || []
      this.data[key].push(id)
    },
  },
}