<template>
  <b-modal ref="modal"
           header-close-variant="black"
           size="lg"
           hideFooter>

    <div id="img-dialog">
      <div class="img">
        <img :src="src" alt="">
      </div>
    </div>

    <template slot="modal-footer"><span></span></template>

  </b-modal>
</template>

<script>
  import DetailMixins from 'mixins/Detail'

  export default {
    mixins: [DetailMixins],
    data: () => ({
      src: '',
    }),
    mounted()
    {
      this.$bus.on('image.show', src =>
      {
        this.src = src
        this.$refs.modal.show()
        // this.show()
      })
    },
    destroyed()
    {
      this.$bus.off('image.show')
    },
  }
</script>
