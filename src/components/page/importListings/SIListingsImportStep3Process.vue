<template>
  <div>
    <Step3Process :inputOptions='options'></Step3Process>
  </div>
</template>

<script>
export default {
  name: 'SIListingsImportStep3Process',
  data() {
    return {
      options: {
        title: 'Process',
        nextStepRouter: 'SIListingsImportStep4Result',
        module: 'si-listing',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
