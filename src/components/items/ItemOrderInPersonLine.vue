<template>
    <b-container>
        <b-row>
            <b-col id="item-order-line">
                <b-row>
                    <b-col cols="4">
                        <img class="img-fluid" :src="productImage">
                    </b-col>
                    <b-col cols="8">
                        <div class="line-name">
                            {{orderLine.product_name}}
                        </div>
                        <div class="line-name">
                            <b-row>
                                <b-col cols="6">
                                    {{labelMoneyUnit}}
                                </b-col>
                                <b-col cols="6">
                                    {{orderLine.price_unit | numeral('0,0')}}
                                </b-col>
                            </b-row>
                        </div>
                        <div class="line-name">
                            <b-row>
                                <b-col cols="6">
                                    {{orderLine.uom}}
                                </b-col>
                                <b-col cols="6">
                                    {{orderLine.qty}}
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import { api } from '../../utils/api'
  import { valueString } from '../../utils/strings'

  export default {
    name: 'ItemOrderInPersonLine',
    data () {
      return {
        productImage: '',
        labelMoneyUnit: valueString.LABEL_MONEY_UNIT
      }
    },
    props: {
      orderLine: Array
    },
    created () {

      this.productImage = api.MAIN_URL + api.URL_PRODUCT_PRODUCT_IMAGE + this.orderLine.product_id + api.URL_PRODUCT_IMAGE_SECTION_2
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemOrderLineStyle";
</style>
