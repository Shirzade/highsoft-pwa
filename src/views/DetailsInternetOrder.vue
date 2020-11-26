<template>
    <div id="details-internet-order">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row class="title-image">
                    <div class="container-image">
                        <img class="img-fluid" src="../assets/img/ic_order_specifications.png">
                    </div>
                    {{labelOrderInformation}}
                </b-row>
                <orange-line></orange-line>
                <!--information orders section-->
                <section>
                    <b-row class="section-details-order">
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="12">
                                    <title-large :title=internetOrderInformation.confirm_cart_date
                                                 type="primary"></title-large>
                                    <title-large :title=labelDateAndWatch type="primary"></title-large>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="12">
                                    <title-large :title=internetOrderInformation.name type="primary"></title-large>
                                    <title-large :title=labelOrderNumber type="primary"></title-large>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="6">
                                    <b-row>
                                        <b-col cols="12">

                                            <title-large :title=labelOrderCustomer type="primary"></title-large>
                                            <title-large :title=internetOrderInformation.partner_id[1]
                                                         type="primary"></title-large>
                                        </b-col>
                                    </b-row>
                                </b-col>
                                <b-col cols="6">
                                    <b-row>
                                        <b-col cols="12">
                                            <title-large :title=labelOrderMoney type="primary"></title-large>
                                            <title-large :title="internetOrderInformation.amount_total| numeral('0,0')"
                                                         type="primary"></title-large>
                                            <title-large :title=labelOrderMoneyUnit type="primary"></title-large>

                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="6">
                                    <title-large :title=valueAddressFirstSection type="primary"></title-large>
                                </b-col>
                                <b-col cols="6">
                                    <title-large :title=labelOrderAddress type="primary"></title-large>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="12">
                                    <title-large :title=noteUser type="primary"></title-large>
                                    <title-large :title=labelOrderNotes type="primary"></title-large>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </section>
                <!--lines order list section-->
                <section>
                    <b-row class="title-image">
                        <div class="container-image">
                            <img v-ripple class="img-fluid" src="../assets/img/ic_order_list_page.png">
                        </div>
                        {{labelOrderListProduct}}
                    </b-row>
                    <orange-line></orange-line>
                    <b-container>
                        <b-row class="container-order-lines">
                            <b-col cols="12">
                                <b-button v-b-toggle.collapse-1 variant="btn btn-primary-detail" block
                                          class="button-show-list-lines">
                                    <img class="img-fluid" src="../assets/img/ic_close.png">
                                    <div>
                                        <title-large :title=labelButtonShowOrderLines></title-large>
                                    </div>
                                </b-button>
                                <b-collapse id="collapse-1" 
                                v-for="valueOrderLine in valueOrderLines" 
                                :key="valueOrderLine.id"
                                class="mt-12">
                                    <item-order-line :orderLine=valueOrderLine></item-order-line>
                                </b-collapse>
                            </b-col>
                        </b-row>
                    </b-container>
                </section>
                <!--financial order section-->
                <section>
                    <b-row class="title-image">
                        {{labelTitleOrderMoney}}
                    </b-row>
                    <orange-line></orange-line>
                    <b-row class="container-financial">
                        <b-col cols="12">
                            <title-large :title=labelOrderTotalPrice type="primary"></title-large>
                            <title-large :title="this.internetOrderInformation.amount_total|numeral('0,0')"
                                         type="primary"></title-large>
                            <title-large :title=labelOrderMoneyUnit type="primary"></title-large>
                        </b-col>
                        <b-col cols="12">
                            <title-large title="0" type="primary"></title-large>
                            <title-large :title=labelOrderUseCredit type="primary"></title-large>
                        </b-col>
                        <b-col cols="12">
                            <title-large :title=labelOrderMoneyFromCustomer type="primary"></title-large>
                            <title-large :title=this.internetOrderInformation.amount_total type="primary"></title-large>
                            <title-large :title=labelOrderMoneyUnit type="primary"></title-large>
                        </b-col>
                    </b-row>
                </section>
                <!--state section-->
                <section>
                    <b-row>
                        <b-col cols="12" class="container-message" v-if="showMessage">
                            <title-large :title=messageDeliveryOrder type="orange"></title-large>
                        </b-col>
                        <b-col v-if="getPakInOrder" col="12" class="container-select-pak">
                            {{labelInformationPak}}
                            <orange-line></orange-line>
                            <b-col cols="12">
                                <b-row>
                                    <b-col cols="7">
                                        <div>
                                            <b-form-select v-model="selectedDeliveryMan">
                                                <option  v-for="deliveryMan in valueDeliveryMans"
                                                        :key="deliveryMan.id"
                                                        :value="deliveryMan.id">
                                                    {{deliveryMan.name}}
                                                </option>
                                            </b-form-select>
                                        </div>
                                    </b-col>
                                    <b-col col cols="5">
                                        <title-medium :title=labelSelectPak></title-medium>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <button-orange
                                    :title=labelButtonSelectPak
                                    click-event="SET_PAK"
                                    :order-id=orderId
                                    :carrierId = valueCarrierId
                                    :delivery-man=selectedDeliveryMan>
                            </button-orange>
                        </b-col>


                        <b-col class="container-message" cols="12" v-if="showButtonDeliveryToCustomer">
                            <button-orange
                                    :order-id=orderId
                                    :title=labelButtonDeliveryToCustomer
                                    clickEvent="DELIVERY_ORDER_TO_CUSTOMER">
                                    </button-orange>

                        </b-col>
                    </b-row>
                </section>
            </b-container>
            <loading></loading>
        </div>
        <modal-with-form message="کدتحویل را وارد نمایید" titleButton="تایید"></modal-with-form>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import OrangeLine from '../components/OrangeLine'
  import axios from 'axios'
  import { api } from '../utils/api'
  import TitleLarge from '../components/labels/LabelLarge'
  import ItemOrderLine from '../components/items/ItemOrderLine'
  import ButtonOrange from '../components/buttons/ButtonOrange'
  import { mapActions, mapGetters } from 'vuex'
  import TitlePage from '../components/labels/LabelPage'
  import TitleMedium from '../components/labels/LabelMedium'
  import Loading from '../components/Loading'
  import modalWithForm from '../components/modals/ModalWithForm' 

  export default {
    name: 'DetailsInternetOrder',

    components: { Loading, modalWithForm,TitleMedium, TitlePage, ButtonOrange, ItemOrderLine, TitleLarge, OrangeLine, Header },
    data () {
      return {
        selectedDeliveryMan: 0,
        noteUser:    this.$route.params.orderInformation.wk_notes ? this.$route.params.orderInformation.wk_notes : '-',
        orderId: this.$route.params.orderInformation.id,
        title: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE,
        internetOrderInformation: this.$route.params.orderInformation,
        labelOrderInformation: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_INFO,
        labelOrderListProduct: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_LIST,
        labelTitleOrderMoney: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_MONEY,
        labelDateAndWatch: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_DATE,
        labelOrderNumber: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_ORDER_NUMBER,
        labelOrderMoney: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_ORDER_MONEY,
        labelOrderCustomer: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_CUSTOMER,
        labelOrderAddress: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_ORDER_ADDRESS,
        labelOrderNotes: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_ORDER_NOTES,
        labelOrderTotalPrice: valueString.LABEL_DETAILS_TOTAL_PRICE,
        labelOrderUseCredit: valueString.LABEL_DETAILS_USE_CREDIT,
        labelOrderDisCountShop: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_DISCOUNT_SHOP,
        labelOrderMoneyUnit: valueString.LABEL_MONEY_UNIT,
        labelOrderMoneyFromCustomer: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_MONEY_CUSTOMER,
        labelButtonShowOrderLines: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_BUTTON_SHOW_LINES,
        labelButtonSetPak: valueString.LABEL_PREPARATION_ORDER,
        labelButtonSetCustomerConfirmState: valueString.LABEL_SET_TO_CONFIRM_CUSTOMER,
        labelButtonSelectPak: valueString.LABEL_SELECT_PAK,
        labelInformationPak: valueString.LABEL_INFORMATION_PAK,
        labelSelectPak: valueString.LABEL_SELECT_DELIVERY_MAN,
        labelButtonDeliveryToCustomer: valueString.LABEL_DELIVERY_TO_CUSTOMER,
        messageDeliveryOrder: valueString.LABEL_MESSAGE_DELIVERY_ORDER,
        valueAddressFirstSection: '',
        valueDeliveryMans: [],
        valueCarrierId:0,
        valueStateOrder: '',
        valueOrderLines: [],
        showMessage: false,
        showButtonSelectPak: false,
        showButtonDeliveryToCustomer: false
      }
    },
    methods: {
      ...mapActions([
        'showLoading',
        'setPakInOrder',
        'setAbilitySetAvailable'
      ]),
      getDetailsInternetOrder (orderId) {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            order_id: orderId
          },
          id: '382893928'
        }
        axios.post(api.API_INTERNET_ORDERS, data, config).then((res) => {
          let result = res.data.result
          this.valueCarrierId = result.carrier_id[0].id
          this.valueAddressFirstSection = result.address
          this.valueDeliveryMans = result.delivery_man
        })
          .catch((err) => {
            console.log(err)
          })
      },
      getLinesInternetOrder (orderId) {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            order_id: orderId
          },
          id: '382893928'
        }
        axios.post(api.API_DETAILS_INTERNET_ORDERS, data, config).then((res) => {
          this.valueOrderLines = res.data.result.orderline
        })
          .catch((err) => {
            console.log(err)
          })
      },
      handleStateOrder (state) {
        switch (state) {
          case 'customer_delivery': {
            this.setAbilitySetAvailable(false)
            this.setPakInOrder(false)
            this.showMessage = true
          }
            break
          case 'confirm_cart': {
            this.showButtonSelectPak = true
            this.setAbilitySetAvailable(true)
            this.setPakInOrder(true)
          }
            break
          case 'edit': {
            this.setPakInOrder(false)
            this.setAbilitySetAvailable(false)
            this.showButtonSelectPak = true
          }
            break
          case 'express_delivery': {
            this.setAbilitySetAvailable(false)
             this.setPakInOrder(false)
            this.showButtonSelectPak = true
            this.showButtonDeliveryToCustomer = true
          }
            break
        }

      }
    },
    computed: {
      ...mapGetters([
        'getPakInOrder',
        'getConfirmCustomerState',
        'getAbilitySetAvailable'
      ]),
    },
    created () {
      this.showLoading(false)
      this.setPakInOrder(false)
      this.orderId = this.$route.params.orderInformation.id
      this.getLinesInternetOrder(this.$route.params.orderInformation.id)
      this.getDetailsInternetOrder(this.$route.params.orderInformation.id)
      this.handleStateOrder(this.$route.params.orderInformation.state)
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewDetailsInternetOrder";
</style>
