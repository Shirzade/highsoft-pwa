<template>
    <div id="need-shop">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <title-page :title=labelContent></title-page>
                        <button-orange :title=labelButtonBarcodeReader clickEvent="BARCODE_READER_SHOP_NEED"
                                       icon="BARCODE_READER"></button-orange>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-button variant="warning" v-ripple @click="navigationDetails">
                                    <img class="img-fluid" src="../assets/img/ic_searchBar_find.png">
                                </b-button>
                            </b-input-group-prepend>
                            <b-form-input
                                    type="text" :placeholder="labelInputPlaceholder"
                                    v-model="productBarcode">
                            </b-form-input>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </div>
        <modal-single-button :message=messageNotEnterBarcode :titleButton=titleButtonConfirm></modal-single-button>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import router from '../router'
  import { valueString } from '../utils/strings'
  import ButtonOrange from '../components/buttons/ButtonOrange'
  import TitlePage from '../components/labels/LabelPage'
  import ModalSingleButton from '../components/modals/ModalSingleButton'

  export default {
    name: 'NeedShop',
    data () {
      return {
        productBarcode: '',
        title: valueString.LABEL_ITEM_HOME_NEED_SHOP,
        labelContent: valueString.LABEL_NEED_STORE_TITLE,
        labelButtonBarcodeReader: valueString.LABEL_IMPORT_PAGE_BARCODE,
        labelInputPlaceholder: valueString.LABEL_NEED_STORE_PLACEHOLDER_BARCODE,
        messageNotEnterBarcode: valueString.LABEL_DETAILS_PAGE_MESSAGE_NOT_BARCODE,
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM
      }
    },
    methods: {
      navigationDetails () {
        if (this.productBarcode == '') {
          this.$bvModal.show('modal-single-button')
        } else {
          router.push({ name: 'detailsNeedProduct', params: { productBarcode: this.productBarcode } })
        }
      }
    },
    components: { ModalSingleButton, Header, ButtonOrange, TitlePage }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewNeedShop";
</style>
