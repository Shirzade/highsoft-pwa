<template>
    <b-container>
        <b-row>
            <b-col id="item-order-line">
                <b-row>
                    <b-col cols="4">
                        <img class="img-fluid" :src="productImage">
                    </b-col>
                    <b-col cols="8">
                        <div class="line-name">
                            {{orderLine.product_id[1]}}
                        </div>
                        <div class="line-name">
                            <b-row>
                                <b-col cols="6">
                                    {{labelMoneyUnit}}
                                </b-col>
                                <b-col cols="6">
                                    {{orderLine.price_unit | numeral('0,0')}}
                                </b-col>
                            </b-row>
                        </div>
                        <div class="line-name">
                            <b-row>
                                <b-col cols="6">
                                    {{orderLine.product_uom[1]}}
                                </b-col>
                                <b-col cols="6">
                                    {{orderLine.product_uom_qty}}
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                    <b-col v-if="getAbilitySetAvailable" cols="12" class="container-set-available-product">
                        <div class="container-available">
                            <div class="container-icons" v-if=showAvailableButton
                                 @click="setAvailableProduct(orderLine.id)">
                                <img v-ripple class="img-fluid" :src=imageAvailableProduct>
                                <div class="text-available-active">
                                    موجود
                                </div>
                            </div>
                            <div v-else class="container-icons">
                                <img v-ripple class="img-fluid" :src=imageAvailableProductInActive>
                                <div class="text-available-in-active">
                                    موجود
                                </div>
                            </div>
                        </div>
                        <div class="container-not-available">
                            <div class="container-icons" v-if=showNotAvailableButton
                                 @click="setNotAvailableProduct(orderLine.id)">
                                <img v-ripple class="img-fluid" :src=imageNotAvailableProduct>
                                <div class="text-not-available-in-active">
                                    ناموجود
                                </div>
                            </div>
                            <div class="container-icons" v-else>
                                <img v-ripple class="img-fluid" :src=imageNotAvailableProductInActive>
                                <div class="text-available-in-active">
                                    ناموجود
                                </div>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <div v-if="showLoadingNewProduct" class="loading-container">
                             <span>
                                 <b-spinner small label="Busy"></b-spinner>
                             </span>
                        </div>
                        <div v-if=showSectionNewProduct class="container-select-new-product">

                            <b-col cols="12" v-for="(suggestedProduct , index) in newProductSuggest" v-ripple
                                   :style="[{'background': '#fdfeff'} ]"
                                   :id=" 'testIdDetailsInternet-'+index">
                                <item-suggest-new-product
                                        :productName=suggestedProduct.product_suggested[1]></item-suggest-new-product>
                            </b-col>


                            <div>
                                {{labelEnterProductBarcode}}
                            </div>
                            <b-input-group>
                                <b-form-input
                                        class="input-style"
                                        id="testIdImportProductPage"
                                        type="text"
                                        v-model="newProductBarcode"
                                >
                                </b-form-input>
                            </b-input-group>
                            <div class="container-button-new-product">
                                <div class="container-add-new-product-button">

                                    <div v-ripple class="container-button-suggest-product"
                                         @click=setSuggestedProduct(newProductBarcode,1,orderLine.id)>
                                        {{labelAddNewProduct}}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <modal-single-button
                :message=labelTitleMessage
                :titleButton=labelConfirmButton
        ></modal-single-button>
    </b-container>
</template>

<script>
  import { api } from '../../utils/api'
  import { valueString } from '../../utils/strings'
  import axios from 'axios'
  import ButtonOrange from '../buttons/ButtonOrange'
  import { mapActions, mapGetters } from 'vuex'
  import ItemSuggestNewProduct from './ItemSuggestNewProduct'
  import ModalSingleButton from '../modals/ModalSingleButton'

  export default {
    name: 'ItemOrderLine',
    components: { ModalSingleButton, ItemSuggestNewProduct, ButtonOrange },
    data () {
      return {
        newProductBarcode: '',
        newProductSuggest: [],
        suggestProducts: this.getSuggestedProducts,
        showAvailableButton: true,
        showLoadingNewProduct: false,
        showNotAvailableButton: true,
        showSectionNewProduct: false,
        productImage: '',
        imageAvailableProduct: require('../../assets/img/ic_available.png'),
        imageAvailableProductInActive: require('../../assets/img/ic_available_inactive.png'),
        imageNotAvailableProduct: require('../../assets/img/ic_not_available.png'),
        imageNotAvailableProductInActive: require('../../assets/img/ic_not_available_inactive.png'),
        labelMoneyUnit: valueString.LABEL_MONEY_UNIT,
        labelEnterProductBarcode: valueString.LABEL_ENTER_NEW_PRODUCT,
        labelAddNewProduct: valueString.LABEL_ENTER_ADD_NEW_PRODUCT_BUTTON,
        labelConfirmButton: valueString.LABEL_BUTTON_CONFIRM,
        labelTitleMessage: valueString.LABEL_TITLE_MESSAGE,
      }
    },
    props: {
      orderLine: Array
    },
    methods: {
      ...mapActions([
        'setConfirmCustomerState',
        'showLoading'
      ]),
      setAvailableProduct (orderLineId) {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            order_line_id: orderLineId,
          },
          id: '382893928'
        }
        axios.post(api.API_SET_AVAILABLE_PRODUCT, data, config).then((res) => {
          if (res.data.result.orderline[0].available) {
            this.showNotAvailableButton = false
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },

      setNotAvailableProduct (orderLineId) {
        this.showLoadingNewProduct = true
        this.setConfirmCustomerState(true)
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            order_line_id: orderLineId,
          },
          id: '382893928'
        }
        axios.post(api.API_SET_NOT_AVAILABLE_PRODUCT, data, config).then((res) => {
          if (res.data.result.orderline[0].not_available) {

            this.showAvailableButton = false
            this.showLoadingNewProduct = false
            this.showSectionNewProduct = true
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },

      setSuggestedProduct (productBarcode, quantity, orderLineId) {

        if (productBarcode == '') {
          this.$bvModal.show('modal-single-button')
        } else {

          this.showLoading(true)
          let config = {
            headers: {
              'X-Openerp-Session-id': this.$session.get('session_id')
            }
          }
          let data = {
            jsonrpc: '2.0',
            method: 'call',
            params: {
              order_line_id: orderLineId,
              quantity: quantity,
              barcode: productBarcode
            },
            id: '382893928'
          }
          axios.post(api.API_SET_SUGGESTED_PRODUCT, data, config).then((res) => {
            let result = res.data.result
            if (result.Error) {
              this.$bvModal.show('modal-single-button')
              this.labelTitleMessage = "محصولی با این بارکد در فروشگاه شما یافت نشد"
            } else {
              this.newProductSuggest = result.product_suggested
            }
            this.showLoading(false)

          })
            .catch((err) => {
              console.log(err)
            })
        }

      },

    },
    computed: {
      ...mapGetters([
        'getSuggestedProducts',
        'getAbilitySetAvailable'
      ]),
    },
    created () {
      this.setConfirmCustomerState(false)
      this.productImage = api.MAIN_URL + api.URL_PRODUCT_PRODUCT_IMAGE + this.orderLine.product_id[0] + api.URL_PRODUCT_IMAGE_SECTION_2
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemOrderLineStyle";
</style>
