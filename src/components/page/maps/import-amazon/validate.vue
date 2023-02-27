<template>
    <div>
        <Step2Validate :inputOptions="options">

        </Step2Validate>
    </div>
</template>

<script>
export default {
  name: 'MWValidateAmazonMaps',
  data() {
    return {
      options: {
        title: 'Amazon MAP import column mapping',
        nextStepRouter: 'MWProcessAmazonMaps',
        module: 'AmazonMapImport',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style scoped>

</style>
