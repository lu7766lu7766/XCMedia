<template>
  <detail title="登入资讯" hide-footer>
    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">地区 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            type="text"
            class="form-control"
            :value="data.location"
            disabled
          >
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">电信 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            type="text"
            class="form-control"
            :value="data.isp"
            disabled
          >
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">装置 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            type="text"
            class="form-control"
            :value="data.device"
            disabled
          >
        </validate>
      </div>
    </div>

    <div class="form-group row m-b-15">
      <label class="col-md-2 col-form-label ">资讯 </label>
      <div class="col-md-10">
        <validate rules="required">
          <input
            v-model="data.browser"
            type="text"
            class="form-control"
            disabled
          >
        </validate>
      </div>
    </div>
  </detail>
</template>

<script>
import DetailMixins from 'mixins/Detail'

export default {
  mixins: [DetailMixins],
  mounted () {
    this.$bus.on('ip.show', (data) => {
      this.data = data
      this.show()
    })
  },
  destroyed () {
    this.$bus.off('ip.show')
  }
}
</script>
