<template>
    <b-modal id="modal-single-button" centered hide-footer hide-header>
        <div class="d-block text-center title-single-button">
            {{message}}
        </div>
        <div class="d-block text-center">
            <b-button id="testIdConfirmButton" v-ripple variant="btn btn-primary-high-soft" block @click="hideModal">
                {{titleButton}}
            </b-button>
        </div>
    </b-modal>
</template>

<script>
import router from '../../router'
import { mapActions } from 'vuex'

export default {
  name: 'modalSingleButton',
  methods: {
    ...mapActions([
      'showLoading'
    ]),
    hideModal () {
      this.showLoading(false)
      if (this.clickConfirm == 'NEED_SHOP') {
        router.push({ name: 'needShop' })
      } else {
        this.$bvModal.hide('modal-single-button')
      }
    }
  },
  props: {
    message: String,
    titleButton: String,
    clickConfirm: String
  },
  created () {
    this.$bvModal.hide('modal-single-button')
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/modals/modalSingleButtonStyle";
</style>
