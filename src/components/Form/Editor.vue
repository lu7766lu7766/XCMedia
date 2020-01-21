<template>
  <v-editor v-model="data"
            useCustomImageHandler
            @image-added="(d, e, c, r) => $emit('image-added', d, e, c, r)"></v-editor>
</template>

<script>
  export default {
    props: ['value', 'uploadPic'],
    components: {
      vEditor: require('vue2-editor').VueEditor,
    },
    data: () => ({
      data: '',
    }),
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
    methods: {
      handleImageUpload(file, Editor, cursorLocation, resetUploader, url)
      {
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      },
    },
    mounted()
    {
      this.data = this.value
    },
  }
</script>
