<template>
    <div id="header">
        <b-container>
            <img v-ripple class="img-fluid float-left image-header" v-bind:src="leftIconHeader" @click="goBack()">
            <Slide noOverlay
                   width="250"
                   :burgerIcon="true"
                   :crossIcon="false"
                   class="bm-burger-button"
                   right>
                <div class="menu-header">
                    <div class="menu-shop-name">{{nameOwnerStore}}</div>
                    <div class="menu-owner-info">{{nameStore}}</div>
                    <div class="menu-owner-info">{{phoneStore}}</div>
                </div>
                <item-main-menu page="home"></item-main-menu>
                <item-main-menu v-if="this.getUserRole === 'store_owner'" page="importProduct"></item-main-menu>
                <!--<item-main-menu page="needShop"></item-main-menu>-->
                <item-main-menu v-if="this.getUserRole === 'store_owner'" page="inPersonSale"></item-main-menu>
                <item-main-menu page="internetSale"></item-main-menu>
                <item-main-menu page="help"></item-main-menu>
                <!--<item-main-menu page="support"></item-main-menu>-->
                <item-main-menu page="exit"></item-main-menu>
                <modal-double-button :message="messageExit"
                                     :buttonRight="labelButtonYes"
                                     :buttonLeft="labelButtonMessageNo">
                </modal-double-button>
            </Slide>
            <div class="title-header">{{titlePage}}</div>
        </b-container>
    </div>
</template>

<script>
  import { Slide } from 'vue-burger-menu'
  import { mapGetters , mapActions } from 'vuex'
  import ItemMainMenu from './items/ItemMainMenu'
  import router from '../router'
  import { valueString } from '../utils/strings'
  import ModalDoubleButton from './modals/ModalDoubleButton'

  export default {
    name: 'Header',
    data () {
      return {
        shopInformation: '',
        nameOwnerStore:'',
        nameStore: '',
        emailStore: '',
        phoneStore: '',
        leftIconHeader: require('../assets/img/ic_back.png'),
        messageExit: valueString.LABEL_MESSAGE_EXIT,
        labelButtonYes: valueString.LABEL_MESSAGE_YES,
        labelButtonMessageNo: valueString.LABEL_MESSAGE_NO,
      }
    },
    props: {
      showBackIcon: String,
      titlePage: String
    },
    components: {
      ModalDoubleButton,
      ItemMainMenu,
      Slide
    },
    computed: {
      ...mapGetters([
        'getShopName',
        'getUserRole',
        'getShopEmail',
        'getShopMobile'
      ]),
    },
    methods: {
 ...mapActions([
        'setUserRole'
      ]),
      goBack () {
        router.back()
      },
      getShopInformation () {
        this.nameOwnerStore = this.$session.get('base_info').name
        this.nameStore = this.$session.get('shopName')
        this.emailStore = this.$session.get('base_info').email
        this.phoneStore = this.$session.get('base_info').mobile
      }
    },
    created () {
      this.setUserRole(this.$route.params.role)
      this.getShopInformation()
      if (this.showBackIcon == 'true') {
        this.leftIconHeader = require('../assets/img/ic_back.png')
      } else {
        this.leftIconHeader = require('../assets/img/ic_logo_shop.png')
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/components/componentHeaderStyle";
</style>
