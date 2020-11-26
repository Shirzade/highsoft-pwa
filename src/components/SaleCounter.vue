<template>
    <b-container>
        <b-row class="sale-counter">
            <b-col cols="2">{{realLabel}}</b-col>
            <b-col cols="5">{{getAmountSaleDaily | numeral('0,0')}}</b-col>
            <b-col cols="5">{{amountSaleDailyLabel}}</b-col>
        </b-row>
        <b-row class="sale-counter">
            <b-col cols="2">{{realLabel}}</b-col>
            <b-col cols="5">{{ getAmountSaleMonthly | numeral('0,0') }}</b-col>
            <b-col cols="5">{{amountSaleMonthlyLabel}}</b-col>
        </b-row>
    </b-container>
</template>

<script>
  import { valueString } from '../utils/strings'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'SaleCounter',
    data () {
      return {
        amountSaleDaily: 0,
        amountSaleMonthly: 0,
        amountSaleDailyLabel: valueString.LABEL_COMPONENT_SALE_COUNTER_DAILY,
        amountSaleMonthlyLabel: valueString.LABEL_COMPONENT_SALE_COUNTER_MONTHLY,
        realLabel: valueString.LABEL_COMPONENT_SALE_COUNTER_REAL
      }
    },
    computed: {
      ...mapGetters([
        'getAmountSaleDaily',
        'getAmountSaleMonthly'
      ]),
    },
    methods: {
      ...mapActions([
        'showLoading'
      ])
    },
    created () {
      this.getAmountStoreSales()
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/components/componentSaleCounterStyle";
</style>
