<template>
  <validation-provider :rules="rules" v-slot="{errors}" :vid="vid">
    <slot></slot>
    <span v-if="showError" class="parsley-errors-list filled" v-show="errors[0]">{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
  import { ValidationProvider } from 'vee-validate'

  export default {
    props: {
      rules: {
        type: String | Object,
        required: true,
      },
      vid: {
        type: String,
      },
      showError: {
        default: true,
      },
    },
    components: {
      ValidationProvider,
    },
  }
</script>