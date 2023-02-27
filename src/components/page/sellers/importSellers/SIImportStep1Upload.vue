<template>
  <div>
    <Step1Import :inputOptions='options'></Step1Import>
  </div>
</template>

<script>
export default {
  name: 'SIImportStep1Upload',
  data() {
    return {
      options: {
        title: 'Upload',
        nextStepRouter: 'SIImportStep2Validate',
        module: 'si-seller',
        progressBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
