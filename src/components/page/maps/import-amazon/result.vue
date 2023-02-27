<template>
  <div>
    <Step4Result :inputOptions="options" :btnCompleteText="buttonCompleteText" />
  </div>
</template>

<script>
export default {
  name: 'MWResultAmazonMaps',
  props: {
    buttonComplete: String
  },
  data() {
    return {
      options: {
        title: 'Amazon MAP import result',
        nextStepRouter: 'MWImportAmazonMaps',
        module: 'AmazonMapImport',
        progressBar: true,
        estimateTimeBar: true
      },
      buttonCompleteText: 'Import another file'
    }
  }
}
</script>

<style scoped></style>
