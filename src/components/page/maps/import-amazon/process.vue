<template>
    <Step3Process :inputOptions="options"
                  ></Step3Process>
</template>

<script>
export default {
  name: 'MWProcessAmazonMaps',
  data() {
    return {
      options: {
        title: 'Amazon MAP validated result',
        nextStepRouter: 'MWResultAmazonMaps',
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
