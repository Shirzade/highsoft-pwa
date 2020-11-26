<template>
    <b-col v-ripple cols="6" id="item-home-sale-internet">
        <div>
            <div @click="navigate()" id="testIdInterOrders">
                <img src="../../assets/img/ic_homePage_internetOrder.png">
            </div>
            {{itemHomeReportSaleInternet}}
        </div>
    </b-col>
</template>

<script>
import { valueString } from '../../utils/strings'
import router from '../../router'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ItemHomeSaleInternet',
  data () {
    return {
      itemHomeReportSaleInternet: valueString.LABEL_ITEM_HOME_REPORT_SALE_INTERNET
    }
  },
  computed: {
    ...mapGetters([
      'getUserRole'
    ])
  },
  methods: {
    ...mapActions([
      'setInternetOrders',
      'setSelectStateInternetOrders'
    ]),
    navigate () {
      router.push({ name: 'internetSale' ,params:{'role':this.getUserRole}})
      if (this.getUserRole === 'store_owner') { this.setSelectStateInternetOrders('confirm_cart') } else { this.setSelectStateInternetOrders('express_delivery') }
      this.setInternetOrders(this.$session.get('session_id'))
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/components/componentItemHomeStyle";
</style>
