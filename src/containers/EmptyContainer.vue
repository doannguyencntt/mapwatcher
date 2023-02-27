<template>
  <div class="app">
    <div class="container-fluid pad-15">
      <router-view :key="$route.params.client_id"></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: 'EmptyContainer',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .pad-15 {
    padding: 0 15px;
  }
</style>
