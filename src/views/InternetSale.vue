<template>
    <div id="internet-sale">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row>
                  <item-header-internet-report
                            testId="testIdInterOrdersCustomerDelivery"
                            :title=labelStateOrderDelivery></item-header-internet-report>
                </b-row>

                <b-row>
                    <div class="title-orders">
                        <b-row>
                            <item-header-list :title=labelHeaderListMoney></item-header-list>
                            <item-header-list :title=labelHeaderListDate></item-header-list>
                            <item-header-list :title=labelHeaderListCustomer></item-header-list>
                            <item-header-list :title=labelHeaderListNumber></item-header-list>
                        </b-row>
                    </div>
                </b-row>
                <b-row class="list-orders">
                    <b-col cols="12" v-for="(internetOrder , index) in getInternetOrders" v-ripple
                           @click="viewDetails(internetOrder)"
                           :key="index"
                           :style="[index%2 == 0 ? {'background': '#fdfeff'} : {'background': '#bdbdbd'} ]" :id=" 'testIdDetailsInternet-'+index">
                        <item-internet-sale-list :internetOrder="internetOrder"></item-internet-sale-list>
                    </b-col>
                </b-row>
                <loading-in-page></loading-in-page>
                <b-row v-if="showMessage">
                    <message-empty-list-orders :message=messageNotOrder></message-empty-list-orders>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import { valueString } from '../utils/strings'
import ItemHeaderInternetReport from '../components/items/ItemHeaderInternetReport'
import ItemHeaderList from '../components/items/ItemHeaderList'
import { mapActions, mapGetters } from 'vuex'
import ItemInternetSaleList from '../components/items/ItemInternetSaleList'
import Loading from '../components/Loading'
import router from '../router'
import LoadingInPage from '../components/LoadingInPage'
import MessageEmptyListOrders from '../components/MessageEmptyListOrders'

export default {
  name: 'InternetSale',
  data () {
    return {
      orders: this.getInternetOrders,
      title: valueString.LABEL_ITEM_HOME_REPORT_SALE_INTERNET,
      labelStateOrderNew: valueString.LABEL_INTERNET_SALE_HEADER_NEW,
      labelStateOrderWaiting: valueString.LABEL_INTERNET_SALE_HEADER_WAITING,
      labelStateOrderPack: valueString.LABEL_INTERNET_SALE_HEADER_PACK,
      labelStateOrderDelivery: valueString.LABEL_INTERNET_SALE_HEADER_DELIVERY,
      labelHeaderListNumber: valueString.LABEL_INTERNET_SALE_HEADER_LIST_NUMBER,
      labelHeaderListCustomer: valueString.LABEL_INTERNET_SALE_HEADER_LIST_CUSTOMER,
      labelHeaderListDate: valueString.LABEL_INTERNET_SALE_HEADER_LIST_DATE,
      labelHeaderListMoney: valueString.LABEL_INTERNET_SALE_HEADER_LIST_MONEY,
      messageNotOrder: valueString.LABEL_INTERNET_SALE_MESSAGE_NOT_ORDER
    }
  },
  components: {
    MessageEmptyListOrders,
    LoadingInPage,
    Loading,
    ItemInternetSaleList,
    ItemHeaderList,
    ItemHeaderInternetReport,
    Header
  },
  methods: {
    ...mapActions([
      'showLoading',
      'setUserRole',
      'setSelectStateInternetOrders'
    ]),
    viewDetails (internetOrder) {
      console.log('internetOrder',internetOrder);
      router.push({ name: 'detailsInternetOrder', params: { role:this.getUserRole,orderInformation: internetOrder } })
    }
  },
  computed: {
    ...mapGetters([
      'getInternetOrders',
      'getUserRole',
      'showMessage'
    ])
  },
  created () {
     this.setUserRole(this.$route.params.role)
    if (this.$route.params.role === 'store_owner') { this.setSelectStateInternetOrders('confirm_cart') } else { this.setSelectStateInternetOrders('express_delivery') }
    this.showLoading(false)
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewInternetSale";
</style>
