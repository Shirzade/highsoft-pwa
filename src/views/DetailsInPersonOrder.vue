<template>
    <div id="details-in-person-order">
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
                <!--total information order-->
                <section>
                    <b-row class="section-details-order">
                        <b-col cols="12">
                            <b-row>
                                <b-col cols="12">
                                    <title-large :title="labelOrderNumber" type="primary"></title-large>
                                    <title-large :title="orderInformation.pos_reference.substring(5, 27)"></title-large>
                                </b-col>
                                <b-col cols="12">
                                    <title-large type="primary" :title=labelOrderDate></title-large>
                                    <title-large type="primary" :title=orderInformation.date_order></title-large>
                                </b-col>
                                <b-col cols="12">
                                    <title-large :title="labelSellerName" type="primary"></title-large>
                                    <title-large :title="orderInformation.user_id" type="primary"></title-large>
                                </b-col>
                                <b-col cols="12">
                                    <title-large :title="labelCustomerName" type="primary"></title-large>
                                    <title-large :title="orderInformation.partner_id" type="primary"></title-large>
                                </b-col>
                                <b-col cols="12">
                                    <title-large :title=labelOrderMoney type="primary"></title-large>
                                    <title-large :title="orderInformation.amount_total | numeral('0,0')"
                                                 type="primary"></title-large>
                                    <title-large :title=labelOrderMoneyUnit type="primary"></title-large>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </section>
                <!--list lines order-->
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
                                <b-button  id="testIdDetailsInPersonLines" v-b-toggle.collapse-2 variant="btn btn-primary-detail" block
                                          class="button-show-list-lines">
                                    <img class="img-fluid" src="../assets/img/ic_close.png">
                                    <div>
                                        <title-large :title=labelButtonShowOrderLines></title-large>
                                    </div>
                                </b-button>
                                <b-collapse id="collapse-2" v-for="valueOrderLine in valueOrderLines" class="mt-12">
                                    <item-order-in-person-line :orderLine=valueOrderLine></item-order-in-person-line>
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
                            <title-large :title=labelOrderMoney type="primary"></title-large>
                            <title-large :title="orderInformation.amount_total | numeral('0,0')"
                                         type="primary"></title-large>
                            <title-large :title=labelOrderMoneyUnit type="primary"></title-large>
                        </b-col>
                        <b-col cols="12">
                            <title-large :title=labelOrderUseDisCount type="primary"></title-large>
                            <title-large title="0" type="primary"></title-large>
                            <title-large :title=labelOrderMoneyUnit type="primary"></title-large>
                        </b-col>
                    </b-row>
                </section>
            </b-container>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import OrangeLine from '../components/OrangeLine'
  import axios from 'axios'
  import { api } from '../utils/api'
  import TitleLarge from '../components/labels/LabelLarge'
  import ItemOrderInPersonLine from '../components/items/ItemOrderInPersonLine'

  export default {
    name: 'DetailsInPersonOrder',
    data () {
      return {
        valueOrderLines: [],
        orderInformation: this.$route.params.orderInformation,
        title: valueString.LABEL_DETAILS_PAGE_IN_PERSON_ORDER_TITLE,
        labelOrderInformation: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_INFO,
        labelOrderMoneyUnit: valueString.LABEL_MONEY_UNIT,
        labelOrderNumber: valueString.LABEL_DETAILS_PAGE_IN_PERSON_ORDER_CODE,
        labelOrderDate: valueString.LABEL_DETAILS_PAGE_IN_PERSON_ORDER_DATE,
        labelOrderListProduct: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_LIST,
        labelCustomerName: valueString.LABEL_DETAILS_PAGE_IN_PERSON_CUSTOMER,
        labelSellerName: valueString.LABEL_DETAILS_PAGE_IN_PERSON_SELLER,
        labelOrderMoney: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_ORDER_MONEY,
        labelButtonShowOrderLines: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_BUTTON_SHOW_LINES,
        labelTitleOrderMoney: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_TITLE_MONEY,
        labelOrderUseDisCount: valueString.LABEL_DETAILS_PAGE_INTERNET_ORDER_DISCOUNT_SHOP
      }
    },
    components: { ItemOrderInPersonLine, TitleLarge, OrangeLine, Header },
    methods: {
      getLinesInPersonOrder (orderId) {

        console.log(orderId)
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
        axios.post(api.API_DETAILS_IN_PERSON_ORDER, data, config).then((res) => {
          console.log(res.data.result.order_line)
          this.valueOrderLines = res.data.result.order_line
        })
          .catch((err) => {
            console.log(err)
          })
      },
    },
    created () {
      console.log(this.$route.params.orderInformation)
      this.getLinesInPersonOrder(this.orderInformation.id)
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewDetailsInPersonOrder";
</style>
