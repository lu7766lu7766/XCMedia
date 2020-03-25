<template>
  <div class="dropzone-box">
    <div id="dropzone" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false">
      <form class="dropzone dz-clickable" id="my-awesome-dropzone">
        <label for="avatar" style="width:100%">
          <div class="dz-default dz-message"><span>將檔案拖放到<b>此處</b>或<b>點擊</b>上傳。</span></div>
        </label>
        <div
          v-for="(item, index) of imageList"
          :key="index"
          class="dz-preview dz-processing dz-error dz-complete dz-image-preview"
          style="position: relative;"
        >
          <div class="dz-image">
            <img :src="item.src" data-dz-thumbnail alt="" />
          </div>
          <div class="dz-details">
            <div class="dz-filename">
              <span data-dz-name="">{{ item.name }}</span>
            </div>
          </div>
          <a class="dz-remove" @click="doDelete(item.id)">Delete</a>
        </div>
      </form>

      <input id="avatar" @change.prevent="onChoice" multiple style="display: none !important;" type="file" />
    </div>
  </div>
</template>
<script>
import ImageMixins from 'mixins/Image'

export default {
  mixins: [ImageMixins],
  props: {
    dataImageIds: {
      type: Array,
      default: [],
    },
    imageList: { type: Array, required: true },
  },
  computed: {
    nextId: function() {
      return (Math.random() + '').substring(2)
    },
    cls: function() {
      return classes
    },
  },
  data() {
    return {
      dragOver: false,
    }
  },
  methods: {
    onDrop: function(event) {
      let data = event.dataTransfer
      if (data) {
        this.uploadImage(data.files)
      }
    },
    onPaste: function(event) {
      let data = event.clipboardData
      if (data) {
        this.uploadImage(data.items)
      }
    },
    async onChoice(event) {
      this.uploadImage(event.target.files)
    },
    uploadImage: function(file) {
      this.$emit('onImageUpload', [...file])
    },
    doDelete: function(id) {
      this.$emit('onImageDelete', id)
    },
  },
  async destroyed() {
    this.$emit('doDelImageList')
  },
}
</script>
