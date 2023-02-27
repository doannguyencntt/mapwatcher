<template>
    <Step3Process :inputOptions="options"
                  ></Step3Process>
</template>

<script>
export default {
  name: 'MWProcessGSMaps',
  data() {
    return {
      options: {
        title: 'Validation Result (Google Shopping MAP Pricing)',
        nextStepRouter: 'MWResultGSMaps',
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
