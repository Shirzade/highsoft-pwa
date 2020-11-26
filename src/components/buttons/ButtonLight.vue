<template>
    <b-button  v-ripple variant="outline-light" @click="eventClick(clickEvent)">به روز رسانی</b-button>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ButtonLight',
    data () {
      return {}
    },
    props: {
      clickEvent: String
    },
    methods: {
      ...mapActions([
        'setAmountStoreSales'
      ]),
      eventClick (event) {
        switch (event) {
          case 'UPDATE_NUMBER_SALE':
            this.setAmountStoreSales(this.$session.get('session_id'))
            break
        }
      }
    },
    created () {
      this.setAmountStoreSales(this.$session.get('session_id'))
    }
  }
</script>

<style scoped>

</style>
