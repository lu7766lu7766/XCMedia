import DetailMixins from 'mixins/Detail'
import ImageMixins from 'mixins/Image'

export default {
  mixins: [DetailMixins, ImageMixins],
  components: {
    jWebsite: require('@/Custom/Website').default
  }
}
