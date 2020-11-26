<template>
    <b-container id="item-in-person-sale">
        <b-row>
            <b-col cols="2">
                <span>
                    {{inPersonOrder.amount_total | numeral('0,0')}}
                </span>
            </b-col>
            <b-col cols="4">
                <span>
                    {{inPersonOrder.date_order.substring(0, 10)}}
                </span>
            </b-col>
            <b-col cols="3">
                <span>
                {{inPersonOrder.user_id}}
               </span>
            </b-col>
            <b-col cols="3">
                <span>
                    {{reverseWord(inPersonOrder.pos_reference.replace('سفارش', ''))}}
                </span>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'ItemInPersonSaleList',
  props: {
    inPersonOrder: Object
  },
  methods: {
    reverseWord (word) {
      return word.split('').reverse().join('')
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemInPersonSaleStyle";
</style>
