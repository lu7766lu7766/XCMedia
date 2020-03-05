<template>
  <div class="tinymce-editor">
    <editor v-model="data"
      :init="init"
      @onClick="onClick">
    </editor>
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
//import 'tinymce/plugins/wordcount'
export default {
  mixins: [EditorMixins],
  components: {
    Editor
  },
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
      default: 'undo redo |  formatselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat'
    }
  },
  data () {
    return {
      tinymceEditor: 'tinymce-editor',
      init: {
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
        images_upload_handler:async (blobInfo, success, failure) => {
            var file = blobInfo.blob();
            var img = this.doUploadTinymcePic(file);
            success(img)
        },
      },
      data: ''
    }
  },
  mounted () {
    this.data = this.value
    this.$emit('input', this.data)
    
    document.addEventListener('focusin', function (e) {
      let closest = e.target.closest(".tox-tinymce-aux, .tox-dialog, .moxman-window, .tam-assetmanager-root");
      if (closest !== null && closest !== undefined) {
           e.stopImmediatePropagation();
      }
    });
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    clear () {
      this.data = ''
    },
  },
  watch: {
      value()
      {
        this.data = this.value
      },
      data() 
      {
        this.$emit('input', this.data)
      },
    },
   destroyed()
    {
      this.$router.go(0);
    },
}
</script>