<template>
    <div id="item-header-internet-report">
        <div  v-ripple class="container-item-internet-sale" :id="testId" @click="getInternetOrder('customer_delivery')">
            <div class="text-center">
                <img class="img-fluid" :src="require('../../assets/img/' + this.getImgDeliveryInInternetOrder)">
            </div>
            <div :class=getStyleTextCustomerInInternetOrders>
                {{labelStateOrderDelivery}}
            </div>
        </div>
        <div  v-ripple class="container-item-internet-sale" :id="testId" @click="getInternetOrder('express_delivery')">
            <div class="text-center">
                <img class="img-fluid" :src="require('../../assets/img/' + this.getImgSetPakInInternetOrder)">
            </div>
            <div :class=getStyleTextPakInInternetOrders>
                {{labelStateOrderPack}}
            </div>
        </div>
        <div v-if="userRole ==='store_owner'" v-ripple class="container-item-internet-sale" :id="testId" @click="getInternetOrder('edit')">
            <div class="text-center">
                <img class="img-fluid" :src="require('../../assets/img/' + this.getImgConfirmOrderInInternetOrder)">
            </div>
            <div :class=getStyleTextEditInInternetOrders>
                {{labelStateOrderWaiting}}
            </div>
        </div>
        <div v-if="userRole ==='store_owner'" v-ripple class="container-item-internet-sale" :id="testId" @click="getInternetOrder('confirm_cart')">
            <div class="text-center">
                <img class="img-fluid" :src="require('../../assets/img/' + this.getImgNewOrdersInInternetOrder)">
            </div>
            <div :class=getStyleTextNewInInternetOrders>
                {{labelStateOrderNew}}
            </div>
        </div>
    </div>
</template>

<script>
import LabelSmall from '../labels/LabelSmall'
import { mapActions, mapGetters } from 'vuex'
import { valueString } from '../../utils/strings'

export default {
  name: 'ItemHeaderInternetReport',
  data () {
    return {
      userRole:null,
      imageState: require('../../assets/img/ic_menu_home.png'),
      labelStateOrderWaiting: valueString.LABEL_INTERNET_SALE_HEADER_WAITING,
      labelStateOrderPack: valueString.LABEL_INTERNET_SALE_HEADER_PACK,
      labelStateOrderDelivery: valueString.LABEL_INTERNET_SALE_HEADER_DELIVERY,
      labelStateOrderNew: valueString.LABEL_INTERNET_SALE_HEADER_NEW
    }
  },
  components: { LabelSmall },
  props: {
    title: String,
    state: String,
    testId: String
  },
  methods: {
    ...mapActions([
      'showLoading',
      'setInternetOrders',
      'setSelectStateInternetOrders',
      'showMessage'
    ]),
    setImageItemState (image) {
      this.imageState = require('../../assets/img/' + image)
    },
    getInternetOrder (state) {
      this.setSelectStateInternetOrders(state)
      this.setInternetOrders(this.$session.get('session_id'))
      this.showLoading(true)
    }
  },
  computed: {
    ...mapGetters([
      'getUserRole',
      'getSelectStateInternetOrders',
      'getImgConfirmOrderInInternetOrder',
      'getImgSetPakInInternetOrder',
      'getImgDeliveryInInternetOrder',
      'getImgNewOrdersInInternetOrder',
      'getStyleTextNewInInternetOrders',
      'getStyleTextEditInInternetOrders',
      'getStyleTextPakInInternetOrders',
      'getStyleTextCustomerInInternetOrders'
    ])
  },
  created () {
    this.userRole = this.$route.params.role
    this.getInternetOrder(this.getSelectStateInternetOrders)
    switch (this.state) {
      case 'confirm_cart': {
        if (this.getSelectStateInternetOrders() == 'confirm_cart') {
          this.setImageItemState('ic_order_new.png')
        } else {
          this.setImageItemState('ic_order_new_clicked.png')
        }
      }
        break
      case 'edit': {
        this.setImageItemState('ic_order_confirm.png')
      }
        break
      case 'express_delivery': {
        this.setImageItemState('ic_order_pake.png')
      }
        break
      case 'customer_delivery': {
        this.setImageItemState('ic_order_delivery.png')
      }
        break
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemHeaderInternetReportStyle";
</style>
