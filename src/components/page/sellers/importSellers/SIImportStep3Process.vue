<template>
  <div>
    <Step3Process :inputOptions='options'></Step3Process>
  </div>
</template>

<script>
export default {
  name: 'SIImportStep3Process',
  data() {
    return {
      options: {
        title: 'Process',
        nextStepRouter: 'SIImportStep4Result',
        module: 'si-seller',
        progressBar: true,
        estimateTimeBar: true
      }
    }
  }
}
</script>

<style lang='scss' scoped></style>
