import DetailMixins from 'mixins/Detail'
import FileMixins from 'mixins/File'

export default {
  mixins: [DetailMixins, FileMixins],
  components: {
    jWebsite: require('@/Custom/Website').default,
  },
  data: () => ({
    src: '',
  }),
  methods: {
    async onFileChange(e)
    {
      this.src = await this.handleImageChange(e)
      this.data.image = this.getFiles(e)[0]
    },
  },
}