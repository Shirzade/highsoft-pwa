<template>
    <div id="loading-style" v-if="getLoading">
        <div class="container-loading">
            <b-spinner class="spinner" label="Busy"></b-spinner>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Loading',
    props: {
      status: String
    },
    computed: {
      ...mapGetters([
        'getLoading'
      ]),
    },

    created () {

    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/components/componentLoadingStyle";
</style>
