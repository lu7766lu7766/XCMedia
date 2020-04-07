<template>
  <div class="tinymce-editor">
    <editor
      v-model="data"
      :init="init"
      @onClick="onClick"
    />
  </div>
</template>
<script>
import EditorMixins from 'mixins/Editor'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
// import 'tinymce/plugins/wordcount'
export default {
  components: {
    Editor
  },
  mixins: [EditorMixins],
  props: {
    value: {
      type: String,
      default: ''
    },
    baseUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image  media table'
    },
    toolbar: {
      type: [String, Array],
      default: 'undo redo |  formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table tablecellprops | removeformat'
    },
    upload: {
      type: Function
    }
  },
  data () {
    return {
      tinymceEditor: 'tinymce-editor',
      data: ''
    }
  },
  computed: {
    init () {
      return {
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        image_description: false,
        // image_dimensions: false,
        media_alt_source: false,
        // media_dimensions: false,
        media_poster: false,
        images_upload_handler: this.upload,
        table_default_attributes: { border: '1', cellpadding: '10' },
        table_style_by_css: true
      }
    }
  },
  watch: {
    value () {
      this.data = this.value
    },
    data () {
      this.$emit('input', this.data)
    }
  },
  mounted () {
    this.data = this.value
    this.$emit('input', this.data)

    document.addEventListener('focusin', function (e) {
      const closest = e.target.closest('.tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root')
      if (closest !== null && closest !== undefined) {
        e.stopImmediatePropagation()
      }
    })
  },
  destroyed () {
    this.$router.go(0)
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    clear () {
      this.data = ''
    }
  }
}
</script>
