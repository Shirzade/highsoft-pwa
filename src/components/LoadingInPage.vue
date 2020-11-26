<template>
    <div id="container-loading-in-page" v-if="getLoading">
        <b-spinner class="spinner" label="Busy"></b-spinner>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'LoadingInPage',
    computed: {
      ...mapGetters([
        'getLoading'
      ]),
    },
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/components/componentLoadingInPageStyle";
</style>
