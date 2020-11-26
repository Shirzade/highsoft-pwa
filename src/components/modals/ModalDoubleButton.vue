<template>
    <b-modal id="modal-double-button" centered hide-footer hide-header>
        <b-container>
            <b-row>
                <b-col cols="12">
                    <div class="d-block text-center title-single-button">
                        {{message}}
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <b-button v-ripple variant="btn btn-primary-high-soft" block @click="hideModal">
                        {{buttonLeft}}
                    </b-button>
                </b-col>
                <b-col cols="6">
                    <b-button v-ripple variant="btn btn-primary-high-soft" block @click="exitApp">
                        {{buttonRight}}
                    </b-button>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import router from '../../router'

export default {
  name: 'modalDoubleButton',
  props: {
    message: String,
    buttonRight: String,
    buttonLeft: String
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('modal-double-button')
    },
    exitApp () {
      router.push({ name: 'login' })
      this.$session.destroy()
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/modals/modalDoubleButtonStyle";
</style>
