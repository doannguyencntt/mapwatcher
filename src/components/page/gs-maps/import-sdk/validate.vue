<template>
    <div>
        <Step2Validate :inputOptions="options">

        </Step2Validate>
    </div>
</template>

<script>
export default {
  name: 'MWValidateGSMaps',
  data() {
    return {
      options: {
        title: 'Validation (Google Shopping MAP Pricing)',
        nextStepRouter: 'MWProcessGSMaps',
        module: 'GoogleShoppingImport',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style scoped>

</style>
