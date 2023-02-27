<template>
  <div>
    <Step1Import :inputOptions='options'></Step1Import>
  </div>
</template>

<script>
export default {
  name: 'SIListingsImportStep1Upload',
  data() {
    return {
      options: {
        title: 'Upload',
        nextStepRouter: 'SIListingsImportStep2Validate',
        module: 'si-listing',
        progressBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
