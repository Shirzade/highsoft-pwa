<template>
    <div id="details-product">
        <div class="d-flex flex-column">
            <Header :titlePage=title showBackIcon="true"></Header>
            <b-container v-if="getContentPage">

                <b-row v-if=showImage class="container-item">
                    <b-col class="text-center container-image" col sm="12">
                        <img class="img-fluid" :src="productImage">
                    </b-col>
                </b-row>


                <b-row>
                    <b-col sm="12" lg="12" class="container-new-image">
                        <base64-upload @change="onChangeImage"></base64-upload>
                    </b-col>
                </b-row>

                <b-row class="container-item">
                    <b-col cols="9">
                        <b-input-group>
                            <b-form-input type="text" v-model="valueBarcode"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="3">
                        <title-medium :title="labelBarcode"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="9">
                        <b-input-group>
                            <b-form-input type="text" v-model="valueName"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col col cols="3">
                        <title-medium :title="labelName"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input id="testIdInputInPersonPrice" type="text"
                                          v-model="valueInPersonPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="6">
                        <title-medium :title="labelPriceInPerson"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input v-model="valueDisCountPercent"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="6">
                        <title-medium :title="labelDiscountPercent"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input type="text" v-model="valueDisCountMoney"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="6">
                        <title-medium :title="labelDiscountPrice"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="6">
                        <b-input-group>
                            <b-form-input type="text" v-model="valueBuyPrice"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col col cols="6">
                        <title-medium :title="labelPriceBuy"></title-medium>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="6">
                        <div>
                            <b-form-select v-model="selectedCategory">
                                <option v-for="category in categories" :value="category.id">
                                    {{category.name}}
                                </option>
                            </b-form-select>
                        </div>
                    </b-col>
                    <b-col col cols="6">
                        <title-medium :title="labelCategories"></title-medium>
                    </b-col>
                </b-row>

                <b-row class="container-item">
                    <b-col cols="6">
                        <div>
                            <b-form-select v-model="selectedProductUOM">
                                <option v-for="productsUOM in productsUnitOfMeasurement" :value="productsUOM.id">
                                    {{productsUOM.name}}
                                </option>
                            </b-form-select>
                        </div>
                    </b-col>
                    <b-col col cols="6">
                        <title-medium :title="labelUnitOfMeasurement"></title-medium>
                    </b-col>
                </b-row>


                <b-row>
                    <b-col cols="6" offset="6">
                        <b-form-checkbox
                                class="containerCheckBox"
                                unchecked-value="false"
                                v-model="showInSite"
                                value="true">
                        </b-form-checkbox>
                        <div class="container-title-checkbox">
                            {{labelShowInSite}}
                        </div>
                    </b-col>
                </b-row>
                <div v-if="showInSite === 'true'">
                    <b-row class="container-item">
                        <b-col cols="6">
                            <b-input-group>
                                <b-form-input type="text" v-model="valueInternetPrice"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols="6">
                            <title-medium :title="labelPriceInternet"></title-medium>
                        </b-col>
                    </b-row>
                    <b-row class="container-item">
                        <b-col cols="6">
                            <b-input-group>
                                <b-form-input type="text" v-model="valueInternetDisCountPercent"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols="6">
                            <title-medium :title="labelDiscountInternet"></title-medium>
                        </b-col>
                    </b-row>
                    <b-row class="container-item">
                        <b-col cols="6">
                            <b-input-group>
                                <b-form-input type="text" v-model="valueInternetDisCountFix"></b-form-input>
                            </b-input-group>
                        </b-col>
                        <b-col cols="6">
                            <title-medium :title="labelDiscountInternetFix"></title-medium>
                        </b-col>
                    </b-row>
                </div>
                <div v-else-if="showInSite === 'false'"></div>
                <b-row class="container-item">
                    <b-col cols="6">
                        <button-orange
                                id="testIdImportButtonCancel"
                                :title="labelButtonCancel" clickEvent="CANCEL"></button-orange>
                    </b-col>
                    <b-col cols="6">
                        <button-orange
                                id="testIdImportButton"
                                :title="labelButtonCreate"
                                :clickEvent="valueClickEvent"
                                :showInSite="showInSite"
                                :barcode="valueBarcode"
                                :name="valueName"
                                :inPersonPrice="valueInPersonPrice"
                                :internetPrice="valueInternetPrice"
                                :internetDisCountFix="valueInternetDisCountFix"
                                :disCountPercent="valueDisCountPercent"
                                :disCountMoney="valueDisCountMoney"
                                :buyPrice="valueBuyPrice"
                                :internetDisCountPercent="valueInternetDisCountPercent"
                                :productId="valueProductId"
                                :productUOM="selectedProductUOM"
                                :productImageSource="sourceImage"
                                :categoryId="selectedCategory">
                        </button-orange>
                    </b-col>
                </b-row>
                <b-row class="container-item">
                    <b-col cols="12">
                        <button-orange :title="labelButtonUpdateAndSetQuantity"
                                       :showInSite="showInSite"
                                       id="testIdImportButtonSetQuantity"
                                       :barcode="valueBarcode"
                                       :name="valueName"
                                       :inPersonPrice="valueInPersonPrice"
                                       :internetPrice="valueInternetPrice"
                                       :disCountPercent="valueDisCountPercent"
                                       :disCountMoney="valueDisCountMoney"
                                       :buyPrice="valueBuyPrice"
                                       :internetDisCountPercent="valueInternetDisCountPercent"
                                       :internetDisCountFix="valueInternetDisCountFix"
                                       :productId="valueProductId"
                                       :categoryId="selectedCategory"
                                       :productUOM="selectedProductUOM"
                                       :productImageSource="sourceImage"
                                       clickEvent="SET_QUANTITY_PAGE">
                        </button-orange>
                    </b-col>
                </b-row>
            </b-container>
            <loading></loading>
        </div>
        <modal-single-button :message=messageNotFindProduct :titleButton=titleButtonConfirm></modal-single-button>
    </div>
</template>

<script>
  import { valueString } from '../utils/strings'
  import Base64Upload from 'vue-base64-upload'
  import Header from '../components/Header'
  import ButtonOrange from '../components/buttons/ButtonOrange'
  import TitleMedium from '../components/labels/LabelMedium'
  import axios from 'axios'
  import { api } from '../utils/api'
  import Loading from '../components/Loading'
  import { mapActions, mapGetters } from 'vuex'
  import ModalSingleButton from '../components/modals/ModalSingleButton'

  export default {
    name: 'DetailsProduct',
    data () {
      return {
        paramsProductName: this.$route.params.productName,
        categories: [],
        sourceImage: '',
        productsUnitOfMeasurement: [],
        options: [
          { value: '', text: '' }
        ],
        selectedCategory: 1,
        showImage: true,
        selectedProductUOM: 98,
        productImage: '',
        statusLoading: 'TRUE',
        showInSite: 'false',
        valueClickEvent: '',
        valueBarcode: 0,
        valueName: '',
        valueInPersonPrice: 0,
        valueInternetPrice: 0,
        valueDisCountPercent: 0,
        valueDisCountMoney: 0,
        valueBuyPrice: 0,
        valueInternetDisCountPercent: 0,
        valueInternetDisCountFix: 0,
        valueProductId: '',
        valueTid: '',
        title: valueString.LABEL_DETAILS_PAGE_TITLE,
        labelName: valueString.LABEL_DETAILS_PAGE_NAME,
        labelBarcode: valueString.LABEL_DETAILS_PAGE_BARCODE,
        labelPriceInPerson: valueString.LABEL_DETAILS_PAGE_PRICE_IN_PERSON,
        labelPriceInternet: valueString.LABEL_DETAILS_PAGE_PRICE_INTERNET,
        labelDiscountPercent: valueString.LABEL_DETAILS_PAGE_PERCENT_DISCOUNT,
        labelDiscountInternet: valueString.LABEL_DETAILS_PAGE_DISCOUNT_INTERNET,
        labelDiscountInternetFix: valueString.LABEL_DETAILS_PAGE_DISCOUNT_INTERNET_FIX,
        labelDiscountPrice: valueString.LABEL_DETAILS_PAGE_PRICE_DISCOUNT,
        labelPriceBuy: valueString.LABEL_DETAILS_PAGE_PRICE_BUY,
        labelCategories: valueString.LABEL_DETAILS_PAGE_CATEGORIES,
        labelUnitOfMeasurement: valueString.LABEL_DETAILS_PAGE_UOM,
        labelShowInSite: valueString.LABEL_DETAILS_PAGE_SHOW_IN_SITE,
        labelButtonCancel: valueString.LABEL_DETAILS_PAGE_CANCEL,
        labelButtonUpdateAndSetQuantity: valueString.LABEL_DETAILS_PAGE_UPDATE_SET_QUANTITY,
        labelButtonChangeImage: valueString.LABEL_DETAILS_PAGE_CHANGE_IMAGE,
        messageNotFindProduct: valueString.LABEL_DETAILS_PAGE_MESSAGE_NOT_FIND_PRODUCT,
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM
      }
    },
    components: { Base64Upload, ModalSingleButton, Loading, TitleMedium, ButtonOrange, Header },
    props: {
      productName: String
    },
    computed: {
      ...mapGetters([
        'getContentPage'
      ]),
    },
    methods: {
      onChangeImage (file) {
        this.sourceImage = file.base64
        this.showImage = false
        /*
        {
          size: 93602,
          filetype: 'image/jpeg',
          filename: 'user.jpg',
          base64:   '/9j/4AAQSkZJRg...'
        }
        */
      },
      // setImage: function (output) {
      //   console.log(output)
      //   this.hasImage = true
      //   this.image = output
      //   console.log('Info', output.info)
      //   console.log('Exif', output.exif)
      // },
      ...mapActions([
        'showLoading',
        'showContent'
      ]),
      getProductInformationByName (name) {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            pname: name,
            sid: this.$session.get('sid')
          },
          id: '382893928'
        }
        axios.post(api.API_INFORMATION_PRODUCT_BY_NAME, data, config).then((res) => {
          console.log(res.data.result[0])
          let result = res.data.result[0].status
          console.log(result)
          if (result == 'ok') {
            this.showLoading(false)
            this.showContent(true)
            let result = res.data.result[0].result[0]
            this.valueBarcode = result.barcode
            this.valueProductId = result.id
            this.valueTid = result.tid
            this.valueName = result.name
            this.valueInPersonPrice = result.fixed_price
            this.valueInternetPrice = result.fixed_price_web
            this.valueDisCountPercent = result.price_discount_fix
            this.valueDisCountMoney = result.discount
            this.valueInternetDisCountFix = result.price_discount_fix_web
            this.valueInternetDisCountPercent = result.discount_web
            this.valueBuyPrice = result.purchase_last_price
            this.selectedCategory = result.pos_category_ids
            this.selectedProductUOM = result.uom_id
            this.labelButtonCreate = valueString.LABEL_DETAILS_PAGE_UPDATE
            this.valueClickEvent = 'UPDATE_PRODUCT'
            this.productImage = api.MAIN_URL + api.URL_PRODUCT_IMAGE + result.tid + api.URL_PRODUCT_IMAGE_SECTION_2
            if (result.display_website) {
              this.showInSite = 'true'
            } else {
              this.showInSite = 'false'
            }
          } else if (result == 'new') {
            this.showLoading(false)
            this.showContent(true)
            this.valueName = name
            this.labelButtonCreate = valueString.LABEL_DETAILS_PAGE_CREATE
            this.valueClickEvent = 'CREATE_PRODUCT'
          } else if (result == 'error') {
            alert('error')
          }
          this.getUnitMeasurements()
        })
          .catch((err) => {
            console.log(err)
          })
      },
      getProductInformationByBarcode (barcode) {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            barcode: barcode,
            sid: this.$session.get('sid')
          },
          id: '382893928'
        }
        axios.post(api.API_INFORMATION_PRODUCT_BY_NAME, data, config).then((res) => {
          console.log(res.data.result[0])
          let result = res.data.result[0].status
          if (result == 'ok') {
            this.showLoading(false)
            this.showContent(true)
            let result = res.data.result[0].result[0]
            this.valueBarcode = result.barcode
            this.valueProductId = result.id
            this.valueTid = result.tid
            this.valueName = result.name
            this.valueInPersonPrice = result.fixed_price
            this.valueInternetPrice = result.fixed_price_web
            this.valueInternetDisCountFix = result.price_discount_fix_web
            this.valueDisCountPercent = result.price_discount_fix
            this.valueDisCountMoney = result.discount
            this.valueInternetDisCountPercent = result.discount_web
            this.selectedCategory = result.pos_category_ids
            this.valueBuyPrice = result.purchase_last_price
            this.selectedProductUOM = result.uom_id
            this.labelButtonCreate = valueString.LABEL_DETAILS_PAGE_UPDATE
            this.showInSite = result.display_website
            this.valueClickEvent = 'UPDATE_PRODUCT'
            this.productImage = api.MAIN_URL + api.URL_PRODUCT_IMAGE + result.tid + api.URL_PRODUCT_IMAGE_SECTION_2
          } else if (result == 'new') {
            this.valueClickEvent = 'CREATE_PRODUCT'
            this.showLoading(false)
            this.showContent(true)
            this.valueBarcode = barcode
            this.labelButtonCreate = valueString.LABEL_DETAILS_PAGE_CREATE
          } else if (result == 'error') {
            this.showLoading(false)
            this.$bvModal.show('modal-single-button')
          }
          this.getUnitMeasurements()
        })
          .catch((err) => {
            console.log(err)
          })
      },
      getCategories () {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {},
          id: '382893928'
        }
        axios.post(api.API_CATEGORIES, data, config).then((res) => {
          for (let i = 0; i < 5; i++) {
            this.categories.push(res.data.result[i])
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },

      getUnitMeasurements () {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {},
          id: '382893928'
        }
        axios.post(api.API_UOM_LIST, data, config).then((res) => {
          if (this.valueClickEvent == 'CREATE_PRODUCT') {
            for (let i = 0; i < res.data.result.length; i++) {
              this.productsUnitOfMeasurement.push(res.data.result[i])
            }
          } else {
            for (let i = 0; i < res.data.result.length; i++) {
              if (res.data.result[i].id == this.selectedProductUOM) {
                this.productsUnitOfMeasurement.push(res.data.result[i])
              }
            }
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },

      getProductInformation (productData) {
        let pattern = /[a-z,آ-ی]/g
        let result = productData.match(pattern)
        if (result == null) {
          this.getProductInformationByBarcode(productData)
        } else {
          this.getProductInformationByName(productData)
        }
      },
      getSelectedItem () {

      },
      selectProductUOM () {

      }

    },
    created () {

      this.showLoading(true)
      this.showContent(false)
      this.getProductInformation(this.paramsProductName)
      this.getCategories()

    }
  }
</script>

<style scoped lang="scss">

    #fileInput {
        display: none;
    }

    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }

    .my-8 {
        margin-top: 4rem;
        margin-bottom: 4rem;
    }

    @import "../assets/styles/views/viewDetailsProduct";
</style>
