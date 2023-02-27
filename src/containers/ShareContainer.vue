œ<template>
  <div class="app">
    <div class="app-body">
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import nav from '@/_nav'
import {
  Breadcrumb
} from '@coreui/vue'

export default {
  name: 'DefaultContainer',
  components: {
    Breadcrumb
  },
  data() {
    return {
      nav: nav.items
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => {
        return route.meta.label || route.name
      })
    }
  }
}
</script>
