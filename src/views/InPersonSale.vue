<template>
    <div id="in-person-sale">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row>
                    <div class="title-orders">
                        <b-row>
                            <item-header-list :title=labelHeaderListMoney></item-header-list>
                            <item-header-list :title=labelHeaderListDate></item-header-list>
                            <item-header-list :title=labelHeaderListSeller></item-header-list>
                            <item-header-list :title=labelHeaderListCode></item-header-list>
                        </b-row>
                    </div>
                </b-row>
                <b-row class="list-orders">
                    <b-col cols="12" v-for="(order ,index) in orders" v-ripple :id=" 'testIdDetailsInPerson-'+index"
                           @click="viewDetails(order)"
                           :style="[index%2 == 0 ? {'background': '#fdfeff'} : {'background': '#bdbdbd'}]">
                        <item-in-person-sale-list :inPersonOrder="order"></item-in-person-sale-list>
                    </b-col>
                </b-row>
                <loading-in-page></loading-in-page>
            </b-container>
        </div>
    </div>
</template>

<script>
import Header from '../components/Header'
import { valueString } from '../utils/strings'
import ItemHeaderList from '../components/items/ItemHeaderList'
import axios from 'axios'
import { api } from '../utils/api'
import router from '../router'
import ItemInPersonSaleList from '../components/items/ItemInPersonSaleList'
import LoadingInPage from '../components/LoadingInPage'
import { mapActions ,mapGetters } from 'vuex'

export default {
  name: 'InPersonSale',
  data () {
    return {
      orders: [],
      title: valueString.LABEL_ITEM_HOME_REPORT_SALE_IN_PERSON,
      labelHeaderListCode: valueString.LABEL_IN_PERSON_SALE_HEADER_LIST_CODE,
      labelHeaderListSeller: valueString.LABEL_IN_PERSON_SALE_HEADER_LIST_SELLER,
      labelHeaderListDate: valueString.LABEL_INTERNET_SALE_HEADER_LIST_DATE,
      labelHeaderListMoney: valueString.LABEL_INTERNET_SALE_HEADER_LIST_MONEY
    }
  },
   computed: {
    ...mapGetters([
      'getUserRole'
    ])
  },
  methods: {
    ...mapActions([
      'showLoading',
      'setUserRole'
    ]),
    getInPersonOrder () {
      console.log(this.$session.get('session_id'))
      this.showLoading(true)
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
      axios.post(api.API_IN_PERSON_ORDER, data, config).then((res) => {
        console.log(res.data)
        this.showLoading(false)
        this.orders = res.data.result.orders
      })
        .catch((err) => {
          console.log(err)
        })
    },
    viewDetails (order) {
      router.push({ name: 'detailsInPersonOrder', params: { orderInformation: order } })
    }
  },
  components: { LoadingInPage, ItemInPersonSaleList, ItemHeaderList, Header },
  created () {
    this.setUserRole(this.$route.params.role)
    this.getInPersonOrder()
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewInpersonSale";
</style>
