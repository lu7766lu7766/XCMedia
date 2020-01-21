import jEditor from '@/Form/Editor'

export default {
  components: {
    jListbox: require('@/Form/ListBox').default,
    jEditor,
  },
  methods: {
    async doUploadPic(image, Editor, cursorLocation, resetUploader)
    {
      const res = await this.$thisApi.doUploadPic({image}, {formData: true})
      jEditor.methods.handleImageUpload(image, Editor, cursorLocation, resetUploader, res.data.file_url)
      this.data.image_ids = this.data.image_ids || []
      this.data.image_ids.push(res.data.id)
    },
  },
}