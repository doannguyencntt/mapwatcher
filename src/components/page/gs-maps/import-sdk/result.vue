
<template>
    <div>
        <Step4Result
          :inputOptions="options"
          :btnCompleteText="buttonCompleteText">
        </Step4Result>
    </div>
</template>

<script>
export default {
  name: 'MWResultGSMaps',
  data() {
    return {
      options: {
        title: 'Result (Google Shopping MAP Pricing)',
        nextStepRouter: 'MWImportGSMaps',
        module: 'GoogleShoppingImport',
        progressBar: true,
        estimateTimeBar: true
      },
      buttonCompleteText: 'Import another file'
    }
  }
}
</script>

<style scoped>

</style>
