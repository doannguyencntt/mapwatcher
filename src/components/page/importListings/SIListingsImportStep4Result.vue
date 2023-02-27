<template>
  <div>
    <Step4Result :inputOptions='options'></Step4Result>
  </div>
</template>

<script>
export default {
  name: 'SIListingsImportStep4Result',
  data() {
    return {
      options: {
        title: 'Finish',
        nextStepRouter: 'MWSIListings',
        module: 'si-listing',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
