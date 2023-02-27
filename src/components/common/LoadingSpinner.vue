<template>
    <div class="align-middle d-flex justify-content-center align-items-center spinner-container" v-if="isLoading">
        <div class="spinner-border thin-spinner spinner-border-sm thin-spinner"></div>&nbsp;Loading...
    </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: ['isLoading']
}
</script>
