<template>
    <b-col v-ripple cols="6" id="item-home-shop-need">
        <div @click="navigate" id="testIdNeedShop">
            <div>
                <img src="../../assets/img/ic_homePage_needShop.png">
            </div>
            {{itemHomeHelpShop}}
        </div>
    </b-col>
</template>

<script>
  import { valueString } from '../../utils/strings'
  import router from '../../router'
  import { mapActions } from 'vuex'

  export default {
    name: 'ItemHomeShopNeed',
    data () {
      return {
        // itemHomeNeedShop: valueString.LABEL_ITEM_HOME_NEED_SHOP,
        itemHomeHelpShop: valueString.LABEL_ITEM_HOME_HELP_SHOP,
      }
    },
    methods: {
    ...mapActions([
      'setPlaceHelp'
    ]),
      navigate () {
        this.setPlaceHelp('help')
        router.push({ name: 'help' })
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/components/componentItemHomeStyle";
</style>
