<template>
    <div id="set-quantity">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row>
                    <b-col class="container-image">
                        <img class="img-fluid" :src="productImage">
                    </b-col>
                    <b-col cols="12">
                        <title-x-medium :title=valueProductName></title-x-medium>
                    </b-col>
                    <b-col cols="12">
                        <b-input-group>
                            <b-form-input id="testIdSetQuantityInput" class="input-style" type="number"
                                          v-model="valueProductQuantity"></b-form-input>
                        </b-input-group>
                    </b-col>
                    <b-col cols="12" class="container-button">
                        <button-orange
                                id="testIdSetQuantityButton"
                                :productQuantity="valueProductQuantity"
                                :productId="valueProductId"
                                clickEvent="SET_QUANTITY_BUTTON"
                                :title="titleButtonSetQuantity">
                        </button-orange>
                    </b-col>
                    <loading></loading>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import ButtonOrange from '../components/buttons/ButtonOrange'
  import { api } from '../utils/api'
  import TitleXMedium from '../components/labels/LabelXMedium'
  import Loading from '../components/Loading'

  export default {
    name: 'SetQuantity',
    data () {
      return {
        title: valueString.LABEL_SET_QUANTITY_TITLE,
        valueProductQuantity: 0,
        valueProductName: '',
        valueProductId: '',
        productImage: '',
        titleButtonSetQuantity: valueString.LABEL_SET_QUANTITY_TITLE_BUTTON
      }
    },
    components: { Loading, TitleXMedium, ButtonOrange, Header },
    created () {
      this.valueProductName = this.$route.params.productInformation[0]
      this.valueProductId = this.$route.params.productInformation[1]
      this.productImage = api.MAIN_URL + api.URL_PRODUCT_PRODUCT_IMAGE + this.valueProductId + api.URL_PRODUCT_IMAGE_SECTION_2
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewSetQuantity";
</style>
