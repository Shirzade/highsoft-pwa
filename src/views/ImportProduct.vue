<template>
    <div id="import-product">
        <div class="d-flex flex-column">
            <Header :titlePage=title showBackIcon="true"></Header>
            <b-container>
                <b-row>
                    <b-col cols="12">
                        <title-page :title=titleContent></title-page>
                        <button-orange :title=titleButtonBarcodeReader clickEvent="BARCODE-READER"
                                       icon="BARCODE_READER"></button-orange>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-button @click="navigateToDetails" id="testIdSearchButton" v-ripple variant="warning">
                                    <div>
                                        <img class="img-fluid" src="../assets/img/ic_searchBar_find.png">
                                    </div>
                                </b-button>
                            </b-input-group-prepend>
                            <b-form-input
                                    :placeholder="messageNotEnterName"
                                    @input="getProductInformationByName()" class="input-style"
                                    id="testIdImportProductPage"
                                    type="text"
                                    v-model="productName">
                            </b-form-input>
                        </b-input-group>
                        <div :class="containerClass" v-if="showContainerItems">
                            <ul class="container-list">
                                <li @click="selectProduct(item.name)" v-for="item in items" v-ripple>
                                    <div>
                                        {{ item.name }}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </b-col>
                    <modal-single-button :message=messageNotEnterName
                                         :titleButton=titleButtonConfirm>
                    </modal-single-button>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import ButtonOrange from '../components/buttons/ButtonOrange'
  import router from '../router'
  import TitlePage from '../components/labels/LabelPage'
  import axios from 'axios'
  import { api } from '../utils/api'
  import ModalSingleButton from '../components/modals/ModalSingleButton'

  export default {
    name: 'ImportProduct',
    data () {
      return {
        items: [],
        showLoading: false,
        containerClass: 'container-suggest-without-scroll-bar',
        showContainerItems: false,
        productName: '',
        title: valueString.LABEL_ITEM_HOME_IMPORT_PRODUCT,
        titleContent: valueString.LABEL_IMPORT_PAGE_TITLE,
        titleButtonBarcodeReader: valueString.LABEL_IMPORT_PAGE_BARCODE,
        messageNotEnterName: valueString.LABEL_DETAILS_PAGE_MESSAGE_NOT_NAME,
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM
      }
    },
    components: { ModalSingleButton, TitlePage, ButtonOrange, Header },
    methods: {
      selectProduct (name) {
        this.productName = name
        this.items = []
        this.showContainerItems = false
        router.push({ name: 'detailsProduct', params: { productName: name } })
      },
      getProductInformationByName () {
        this.showLoading = true
        if (this.productName == '') {
          this.items = []
          this.containerClass = 'container-suggest-without-scroll-bar'
        } else {
          let config = {
            headers: {
              'X-Openerp-Session-id': this.$session.get('session_id')
            }
          }
          let data = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
              pname: this.productName,
              sid: this.$session.get('sid')
            },
            id: '382893928'
          }
          axios.post(api.API_INFORMATION_PRODUCT_BY_NAME, data, config).then((res) => {
            this.showContainerItems = true
            this.showLoading = false
            this.items = res.data.result[0].result
            if (res.data.result[0].result.length > 4) {
              this.containerClass = 'container-suggest'
            } else {
              this.containerClass = 'container-suggest-without-scroll-bar'
            }
          })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      navigateToDetails () {
        if (this.productName == '') {
          this.$bvModal.show('modal-single-button')
        } else {
          router.push({ name: 'detailsProduct', params: { productName: this.productName } })
        }
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewImportProduct";
</style>
