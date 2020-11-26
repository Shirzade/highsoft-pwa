<template>
    <div id="button-orange">
        <b-button @click="navigation(clickEvent)" block v-ripple variant="btn btn-orange-high-soft">
            <img class="img-fluid" v-bind:src="iconButton">
            <span>
                 {{title}}
            </span>
        </b-button>
        <div>
            <b-modal :id=clickEvent centered hide-footer hide-header>
                <div class="modal-message-style d-block text-center">
                    <img class="img-fluid" v-bind:src="imageMessage">
                    <div>
                        {{messageModal}}
                    </div>
                </div>
                <b-button @click="navigation(navigationPage)" block id="testIdConfirmButton" v-ripple
                          variant="btn btn-primary-high-soft buttonStyle">
                    {{titleButtonConfirm}}
                </b-button>
            </b-modal>
        </div>
    </div>
</template>
<script>
  import router from '../../router'
  import axios from 'axios'
  import { api } from '../../utils/api'
  import { valueString } from '../../utils/strings'
  import Loading from '../Loading'
  import { mapActions,mapGetters } from 'vuex'

  export default {
    name: 'ButtonOrange',
    components: { Loading },
    data () {
      return {
        categories: [],
        iconButton: '',
        showInSiteValue: false,
        navigationPage: '',
        imageMessage: '',
        messageModal: '',
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM
      }
    },
    props: {
      title: String,
      newProductBarcode: String,
      lineId: String,
      productImageSource: String,
      orderId: String,
      productUOM: String,
      icon: String,
      clickEvent: String,
      showInSite: String,
      barcode: Number,
      name: String,
      inPersonPrice: Number,
      internetPrice: Number,
      disCountPercent: Number,
      disCountMoney: Number,
      buyPrice: Number,
      internetDisCountPercent: Number,
      internetDisCountFix: Number,
      productId: String,
      categoryId: String,
      productQuantity: Number,
      deliveryMan: String,
      carrierId:Number
    },
      computed: {
    ...mapGetters([
      'getPlaceHelp',
      'getUserRole'
    ])
  },
    methods: {
      navigate () {
        router.push({ name: 'internetSale' })
      },
      ...mapActions([
        'showLoading',
        'setUserRole',
        'setPakInOrder',
        'setSuggestedProducts',
        'setInternetOrders',
        'setSelectStateInternetOrders',
        'setOrderId'
      ]),
      validationData () {
        let errors = ''
        let validData = true
        if (this.name == '') {
          errors = valueString.LABEL_DETAILS_PAGE_MESSAGE_NAME + '\n'
          validData = false
        }
        if (this.inPersonPrice == 0) {
          errors = errors + valueString.LABEL_DETAILS_PAGE_MESSAGE_IN_PERSON_PRICE
          validData = false
        }
        if (validData) {
          this.createProductInformation()
        } else {
          this.showLoading(false)
          this.$bvModal.show('CREATE_PRODUCT')
          this.messageModal = errors
          this.imageMessage = require('../../assets/img/ic_failure.png')
          this.navigationPage = 'CLOSE_MODAL_SHOW_ERROR'
        }
      },

      createProductInformation () {
        this.manageDisPlaySite()
        this.categories.push(this.categoryId)
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
            sid: this.$session.get('sid'),
            name: this.name,
            barcode: this.barcode,
            fixed_price: this.inPersonPrice,
            discount: this.disCountPercent,
            discount_web: this.internetDisCountPercent,
            fixed_price_web: this.internetPrice,
            purchase_last_price: this.buyPrice,
            price_discount_fix: this.disCountMoney,
            price_discount_fix_web: this.internetDisCountFix,
            display_website: this.showInSite,
            categ_ids: this.categories,
            uom_id: this.productUOM,
            uom_po_id: this.productUOM,
            image2: this.productImageSource
          },
          id: '382893928'
        }
        axios.post(api.API_CREATE_PRODUCT, data, config).then((res) => {
          if (res.data.result[0].status == 'ok') {
            this.showLoading(false)
            this.$bvModal.show('CREATE_PRODUCT')
            this.messageModal = valueString.LABEL_DETAILS_PAGE_MESSAGE_SUCCESS_CREATE
            this.imageMessage = require('../../assets/img/ic_success.png')
            this.navigationPage = 'CANCEL'
          } else {
            this.showLoading(false)
            this.$bvModal.show('CREATE_PRODUCT')
            this.messageModal = res.data.result[0].message
            this.imageMessage = require('../../assets/img/ic_failure.png')
            this.navigationPage = 'CLOSE_MODAL_SHOW_ERROR'
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      updateProductInformation (setQuantity) {
        this.manageDisPlaySite()
        this.categories.push(this.categoryId)
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
            sid: this.$session.get('sid'),
            pid: this.productId,
            name: this.name,
            barcode: this.barcode,
            fixed_price: this.inPersonPrice,
            discount: this.disCountMoney,
            price_discount_fix: this.disCountPercent,
            display_website: this.showInSiteValue,
            discount_web: this.internetDisCountPercent,
            fixed_price_web: this.internetPrice,
            price_discount_fix_web: this.internetDisCountFix,
            categ_ids: this.categories,
            purchase_last_price: this.buyPrice,
            uom_id: this.productUOM,
            uom_po_id: this.productUOM,
            image2: this.productImageSource
          },
          id: '382893928'
        }
        axios.post(api.API_UPDATE_PRODUCT, data, config).then((res) => {

          if (res.data.result[0].status == 'ok') {
            this.showLoading(false)
            if (setQuantity) {
              router.push({ name: 'setQuantity', params: { productInformation: [this.name, this.productId] } })
            } else {
              this.$bvModal.show('UPDATE_PRODUCT')
              this.messageModal = valueString.LABEL_DETAILS_PAGE_MESSAGE_SUCCESS_UPDATE
              this.imageMessage = require('../../assets/img/ic_success.png')
              this.navigationPage = 'CANCEL'
            }
          } else if (res.data.result[0].status == 'error') {
            this.showLoading(false)
            this.$bvModal.show('UPDATE_PRODUCT')
            this.messageModal = res.data.result[0].message
            this.imageMessage = require('../../assets/img/ic_failure.png')
            this.navigationPage = 'IMPORT_PRODUCT'
          } else {
            this.showLoading(false)
            this.$bvModal.show('UPDATE_PRODUCT')
            this.messageModal = valueString.LABEL_DETAILS_PAGE_MESSAGE_FAIL_UPDATE
            this.imageMessage = require('../../assets/img/ic_failure.png')
            this.navigationPage = 'IMPORT_PRODUCT'
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      manageDisPlaySite () {
        if (this.showInSite == 'true') {
          this.showInSiteValue = true
        } else {
          this.showInSiteValue = false
        }
      },
      setQuantityProduct (productQuantity) {
        if (productQuantity <= 0) {
          this.showLoading(false)
          this.$bvModal.show('SET_QUANTITY_BUTTON')
          this.messageModal = valueString.LABEL_SET_QUANTITY_MESSAGE_FAIL_SET_QUANTITY
          this.imageMessage = require('../../assets/img/ic_failure.png')
          this.navigationPage = 'CLOSE_MODAL_SET_QUANTITY'
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
              sid: this.$session.get('sid'),
              qty: this.productQuantity,
              pid: this.productId
            },
            id: '382893928'
          }
          axios.post(api.API_UPDATE_QUANTITY, data, config).then((res) => {
            if (res.data.result) {
              this.showLoading(false)
              this.$bvModal.show('SET_QUANTITY_BUTTON')
              this.messageModal = valueString.LABEL_DETAILS_PAGE_MESSAGE_SUCCESS_UPDATE
              this.imageMessage = require('../../assets/img/ic_success.png')
              this.navigationPage = 'CANCEL'
            }
          })
            .catch((err) => {
              console.log(err)
            })
        }
      },
      setToDeliveryMan (deliveryManId, orderId,carrierId) {
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
            order_id: orderId,
            delivery_man_id: deliveryManId,
            carrier_id :carrierId
          },
          id: '382893928'
        }
        axios.post(api.API_SET_TO_DELIVERY_MAN, data, config).then((res) => {
          let result = res.data.result
          if (result.response == 'ok') {
            this.showLoading(false)
            this.navigate()
            this.setSelectStateInternetOrders('express_delivery')
            this.setInternetOrders(this.$session.get('session_id'))
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      setToDeliveryToCustomer (orderId) {
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
            order_id: orderId,
          },
          id: '382893928'
        }
        axios.post(api.API_SET_STATE_CUSTOMER, data, config).then((res) => {
          let result = res.data.result
          if (result.response == 'ok') {
            this.showLoading(false)
            this.navigate()
            this.setSelectStateInternetOrders('customer_delivery')
            this.setInternetOrders(this.$session.get('session_id'))
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },

      setToConfirmCustomer (orderId) {
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
            order_id: orderId,
          },
          id: '382893928'
        }
        axios.post(api.API_STATE_EDIT, data, config).then((res) => {
          let result = res.data.result
          this.showLoading(false)
          this.navigate()
          this.setSelectStateInternetOrders('edit')
          this.setInternetOrders(this.$session.get('session_id'))

        })
          .catch((err) => {
            console.log(err)
          })
      },

      setSuggestedProduct (productBarcode, quantity, orderLineId) {
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
          console.log(result.product_suggested[0])
          console.log(result.product_suggested)
          this.setSuggestedProducts(result.product_suggested)
          this.showLoading(false)
          // if (result.response == 'ok') {
          //   this.showLoading(false)
          //   this.navigate()
          //   this.setSelectStateInternetOrders('customer_delivery')
          //   this.setInternetOrders(this.$session.get('session_id'))
          // }
        })
          .catch((err) => {
            console.log(err)
          })
      },
      navigation (here) {
        switch (here) {
          case 'START_APP':{
            if(this.getPlaceHelp ===  "help")
             router.push({ name: 'home' })
            else
             router.push({ name: 'login' })
          }
            break
          case 'SET_QUANTITY_PAGE':
            this.updateProductInformation(true)
            break
          case 'CANCEL':
            router.push({ name: 'importProduct' })
            break
          case  'UPDATE_PRODUCT':
            this.updateProductInformation(false)
            break
          case  'IMPORT_PRODUCT':
            this.$bvModal.hide('UPDATE_PRODUCT')
            break
          case  'CLOSE_MODAL_SET_QUANTITY':
            this.$bvModal.hide('SET_QUANTITY_BUTTON')
            break
          case 'SET_QUANTITY_BUTTON':
            this.setQuantityProduct(this.productQuantity)
            break
          case 'CREATE_PRODUCT':
            this.validationData()
            break
          case  'CLOSE_MODAL_SHOW_ERROR':
            this.$bvModal.hide('CREATE_PRODUCT')
            break
          case 'BARCODE-READER':
            router.push({ name: 'barcodeReader', params: {role:this.getUserRole,   from: 'IMPORT_PRODUCT' } })
            break
          case 'BARCODE_READER_SHOP_NEED':
            router.push({ name: 'barcodeReader', params: {role:this.getUserRole, from: 'SHOP_NEED' } })
            break
          case 'PREPARATION_ORDER':
            this.setPakInOrder(true)
            break
          case 'CANCEL_DELIVERY_MAN': {
            this.$bvModal.hide('SET_PAK')
            this.$bvModal.hide('ADD_NEW_PRODUCT')
          }
            break
          case 'SET_PAK': {
            if (this.deliveryMan == 0) {
              this.$bvModal.show('SET_PAK')
              this.messageModal = valueString.LABEL_DETAILS_PAGE_MESSAGE_FAIL_SELECT_DELIVERY_MAN
              this.imageMessage = require('../../assets/img/ic_failure.png')
              this.navigationPage = 'CANCEL_DELIVERY_MAN'
            } else {
              this.setToDeliveryMan(this.deliveryMan, this.orderId,this.carrierId)
            }
          }
            break
          case 'DELIVERY_ORDER_TO_CUSTOMER': {
            this.setOrderId(this.orderId)
             this.$bvModal.show('modal-with-form')
          }
            break
          case 'SET_TO_CONFIRM_CUSTOMER_ORDER': {
            this.setToConfirmCustomer(this.orderId)
          }
        }
      }

    },
    created () {
       this.setUserRole(this.$route.params.role)
      if (this.icon == 'BARCODE_READER') {
        this.iconButton = require('../../assets/img/ic_barcode.png')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/buttons/buttonOrangeStyle";
</style>
