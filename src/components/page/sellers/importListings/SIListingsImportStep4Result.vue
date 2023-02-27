<template>
  <div>
    <Step4Result :inputOptions='options' :btnCompleteText="buttonCompleteText"></Step4Result>
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
      },
      buttonCompleteText: 'Import another file'
    }
  }
}
</script>

<style lang='scss' scoped></style>
