<template>
  <input-tag class="j-input-tag" :value="value" @input="data => $emit('input', data)" placeholder="enter送出" />
</template>

<script>
  import InputTag from 'vue-input-tag'

  export default {
    components: {
      InputTag,
    },
    props: {
      value: {
        required: true,
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .j-input-tag >>> .input-tag
    background-color #348fe2;
    border 1px solid #348fe2;
    color #fff
    .remove
      color #fff
</style>