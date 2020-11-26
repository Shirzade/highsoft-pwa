<template>
    <div v-ripple id="item-main-menu" @click="navigation">
        <div class="container-item-menu">
            <img class="img-fluid float-right" v-bind:src="imageMenu">
            <div class="item-main-menu-title">
                {{titleMenu}}
            </div>
        </div>
    </div>
</template>

<script>
import { valueString } from '../../utils/strings'
import router from '../../router'
import ModalDoubleButton from '../modals/ModalDoubleButton'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { ModalDoubleButton },
  data () {
    return {
      titleMenu: '',
      imageMenu: require('../../assets/img/ic_menu_home.png'),
      itemMenuHome: valueString.LABEL_ITEM_MENU_HOME,
      itemMenuImportProduct: valueString.LABEL_ITEM_HOME_IMPORT_PRODUCT,
      itemMenuShopNeed: valueString.LABEL_ITEM_HOME_NEED_SHOP,
      itemMenuSaleInPerson: valueString.LABEL_ITEM_HOME_REPORT_SALE_IN_PERSON,
      itemMenuSaleInternet: valueString.LABEL_ITEM_HOME_REPORT_SALE_INTERNET,
      itemMenuExit: valueString.LABEL_ITEM_MENU_EXIT,
      itemMenuHelp: valueString.LABEL_ITEM_MENU_HELP,
      itemMenuSupport: valueString.LABEL_ITEM_MENU_ُSUPPORT
    }
  },
  name: 'ItemMainMenu',
  props: {
    page: String
  },
  computed: {
    ...mapGetters([
      'getUserRole'
    ])
  },
  methods: {
    ...mapActions([
      'setInternetOrders',
      'setSelectStateInternetOrders',
      'setPlaceHelp'
    ]),
    navigation () {


      
      if (this.page === 'exit') {
        this.$bvModal.show('modal-double-button')
      } else if(this.page === 'internetSale'){
        router.push({ name: this.page , params: {role: this.getUserRole}})
        if (this.getUserRole === 'store_owner') { this.setSelectStateInternetOrders('confirm_cart') } else { this.setSelectStateInternetOrders('express_delivery') }
        this.setInternetOrders(this.$session.get('session_id'))
      } 
      else {
        this.setPlaceHelp('help')
        router.push({ name: this.page,params: {role: this.getUserRole} })
      }
    },
    setContentItemMenu (title, image) {
      this.titleMenu = title
      this.imageMenu = require('../../assets/img/' + image)
    }
  },
  created () {
    switch (this.page) {
      case 'home': {
        this.setContentItemMenu(this.itemMenuHome, 'ic_menu_home.png')
      }
        break
      case 'importProduct': {
        this.setContentItemMenu(this.itemMenuImportProduct, 'ic_menu_persent.png')
      }
        break
      case 'needShop': {
        this.setContentItemMenu(this.itemMenuShopNeed, 'ic_menu_need.png')
      }
        break
      case 'inPersonSale': {
        this.setContentItemMenu(this.itemMenuSaleInPerson, 'ic_menu_intenet.png')
      }
        break
      case 'internetSale': {
        this.setContentItemMenu(this.itemMenuSaleInternet, 'ic_menu_need.png')
      }
        break
      case 'help': {
        this.setContentItemMenu(this.itemMenuHelp, 'ic_menu_import.png')
      }
        break
      case 'support': {
        this.setContentItemMenu(this.itemMenuSupport, 'ic_menu_support.png')
      }
        break
      case 'exit': {
        this.setContentItemMenu(this.itemMenuExit, 'ic_menu_exit.png')
      }
        break
    }
  }
}
</script>

<style scoped lang="scss">
    @import "../../assets/styles/items/itemMainMenuStyle.scss";
</style>
