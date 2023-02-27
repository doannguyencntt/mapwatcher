<template>
  <div>
    <Step2Validate :inputOptions='options'></Step2Validate>
  </div>
</template>

<script>
export default {
  name: 'SIListingsImportStep2Validate',
  data() {
    return {
      options: {
        title: 'Validate',
        nextStepRouter: 'SIListingsImportStep3Process',
        module: 'si-listing',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
