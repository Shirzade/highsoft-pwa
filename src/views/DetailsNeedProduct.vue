<template>
    <div id="details-product-need">
        <div class="d-flex flex-column">
            <Header :titlePage="title" showBackIcon="true"></Header>
            <b-container v-if="getContentPage">
                <b-row>
                    <b-col class="container-image">
                        <img class="img-fluid" :src="productImage">
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <title-x-medium :title="productName"></title-x-medium>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="12">
                        <div class="container-title">
                            {{labelDetailsTitle}}
                        </div>
                        <div class="container-content">
                            <div>
                                <span>{{predTodayQty}}</span>
                                <span>{{labelNeedShopToDay}}</span>
                            </div>
                            <div>
                                <span>{{predOneWeekQty}}</span>
                                <span>{{labelNeedShopToWeek}}</span>
                            </div>
                            <div>
                                <span>{{predOneMonthQty}}</span>
                                <span>{{labelNeedShopToMonth}}</span>
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <div class="container-title">
                            {{labelDetailsTitle}}
                        </div>
                        <div class="container-content">
                            <div>
                                <span>{{oneMonthAgoQty}}</span>
                                <span>{{labelNeedShopToLastMonth}}</span>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
            <loading></loading>
            <modal-single-button :message=messageNotEnterProduct :titleButton=titleButtonConfirm
                                 clickConfirm="NEED_SHOP"></modal-single-button>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import axios from 'axios'
  import { api } from '../utils/api'
  import TitleXMedium from '../components/labels/LabelXMedium'
  import Loading from '../components/Loading'
  import { mapActions, mapGetters } from 'vuex'
  import ModalSingleButton from '../components/modals/ModalSingleButton'

  export default {
    name: 'DetailsNeedProduct',
    components: { ModalSingleButton, Loading, TitleXMedium, Header },
    data () {
      return {
        productBarcode: '',
        productImage: '',
        productId: '',
        productName: '',
        oneMonthAgoQty: '',
        predOneWeekQty: '',
        predOneMonthQty: '',
        predTodayQty: '',
        oneWeekAgoQty: '',
        title: valueString.LABEL_DETAILS_PAGE_NEED_TITLE,
        labelDetailsTitle: valueString.LABEL_DETAIL_PAGE_NEED_CONTENT_TITLE,
        labelNeedShopToDay: valueString.LABEL_DETAILS_PAGE_NEED_TO_DAY,
        labelNeedShopToWeek: valueString.LABEL_DETAILS_PAGE_NEED_TO_WEEK,
        labelNeedShopToMonth: valueString.LABEL_DETAILS_PAGE_NEED_TO_MONTH,
        labelNeedShopToLastMonth: valueString.LABEL_DETAILS_PAGE_NEED_LAST_MONTH,
        messageNotEnterProduct: valueString.LABEL_MESSAGE_NOT_PRODUCT,
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM,
        title: valueString.LABEL_DETAILS_PAGE_NEED_TITLE,

      }
    },
    computed: {
      ...mapGetters([
        'getContentPage'
      ]),
    },
    methods: {
      ...mapActions([
        'showLoading',
        'showContent'
      ]),
      getReportSale () {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            barcode: this.productBarcode
          },
          id: '382893928'
        }
        axios.post(api.API_REPORT_SALE, data, config).then((res) => {
          if (res.data.result.reports.length == 0) {
            this.$bvModal.show('modal-single-button')
          } else {
            this.showLoading(false)
            this.showContent(true)
            let productInformation = res.data.result
            let reports = res.data.result.reports[0]
            this.productImage = api.MAIN_URL + api.URL_PRODUCT_IMAGE + productInformation.product_template_id + api.URL_PRODUCT_IMAGE_SECTION_2
            this.productId = productInformation.product_template_id
            this.productName = reports.shop_product[1]
            this.predTodayQty = reports.qty_pred_today
            this.predOneWeekQty = reports.qty_pred_one_week
            this.oneMonthAgoQty = reports.qty_one_month_ago
            this.predOneMonthQty = reports.qty_pred_one_month
          }
        })
          .catch((err) => {
            console.log(err)
          })
      },
    },
    created () {
      this.showLoading(true)
      this.showContent(false)
      this.productBarcode = this.$route.params.productBarcode
      this.getReportSale()
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewDetailsProductNeed";
</style>
