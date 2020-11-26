<template>
    <div id="home">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="false"></Header>
            <div class="d-flex flex-column flex-grow-2 justify-content-center">
                <b-container>
                    <sale-counter></sale-counter>
                </b-container>
            </div>
            <div class="d-flex flex-column flex-grow-3 justify-content-center">
                <b-container>
                    <b-row>
                        <b-col class="text-center" cols="12">
                            <ButtonLight id="testIdReportSale" clickEvent="UPDATE_NUMBER_SALE"></ButtonLight>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <div class="d-flex flex-column flex-grow-1 justify-content-center">
                <b-container class="containerHomeItem">
                    <b-row>
                        <ItemHomeSaleInProduct></ItemHomeSaleInProduct>
                        <ItemHomeSaleInternet></ItemHomeSaleInternet>
                    </b-row>
                    <b-row>
                        <ItemHomeImportProduct></ItemHomeImportProduct>
                        <ItemHomeShopNeed></ItemHomeShopNeed>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

import Header from '../components/Header'
import SaleCounter from '../components/SaleCounter'
import ButtonLight from '../components/buttons/ButtonLight'
import ItemHomeImportProduct from '../components/items/ItemHomeImportProduct'
import ItemHomeSaleInternet from '../components/items/ItemHomeSaleInternet'
import ItemHomeSaleInProduct from '../components/items/ItemHomeSaleInPerson'
import ItemHomeShopNeed from '../components/items/ItemHomeShopNeed'

export default {
  name: 'home',
  components: {
    ItemHomeShopNeed,
    ItemHomeSaleInProduct,
    ItemHomeSaleInternet,
    ItemHomeImportProduct,
    ButtonLight,
    SaleCounter,
    Header
  },
  computed: {},
  methods: {},
  created () {

  }
}
</script>
<style scoped lang="scss">
    @import "../assets/styles/views/viewHome";
</style>
