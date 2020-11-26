<template>
    <b-container id="item-internet-sale">
        <b-row>
            <b-col cols="2">
                <span>
                    {{internetOrder.amount_total | numeral('0,0')}}
                </span>
            </b-col>
            <b-col cols="4">
                <span>
                {{internetOrder.confirm_cart_date.substring(0, 10)}}
                </span>
            </b-col>
            <b-col cols="3">
                <span>
                {{internetOrder.partner_id[1]}}
                </span>
            </b-col>
            <b-col cols="3">
                <span>
                {{internetOrder.name}}
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: 'ItemInternetSaleList',
    props: {
      internetOrder: Object,
      testId: String
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemInternetSaleStyle";
</style>
