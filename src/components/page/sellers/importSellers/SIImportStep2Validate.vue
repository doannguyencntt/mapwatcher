<template>
  <div>
    <Step2Validate :inputOptions='options'></Step2Validate>
  </div>
</template>

<script>
export default {
  name: 'SIImportStep2Validate',
  data() {
    return {
      options: {
        title: 'Validate',
        nextStepRouter: 'SIImportStep3Process',
        module: 'si-seller',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
