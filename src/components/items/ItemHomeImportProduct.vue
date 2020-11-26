<template>
    <b-col v-ripple cols="6" id="item-home-import-product">
        <div @click="navigate()" id="testIdImportProduct">
            <div>
                <img src="../../assets/img/ic_homePage_importProduct.png">
            </div>
            {{itemHomeImportProduct}}
        </div>
    </b-col>
</template>

<script>
  import { valueString } from '../../utils/strings'
  import router from '../../router'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ItemHomeImportProduct',
    data () {
      return {
        itemHomeImportProduct: valueString.LABEL_ITEM_HOME_IMPORT_PRODUCT,
      }
    },
      computed: {
    ...mapGetters([
      'getUserRole'
    ])
  },
    methods: {
    ...mapActions([
      'setUserRole',
    ]),
      navigate () {
        if(this.getUserRole ==='store_owner')
            router.push({ name: 'importProduct' ,params:{'role':this.getUserRole}})
      }
    },
  created () {
     this.setUserRole(this.$route.params.role)
  }
  }
</script>

<style scoped lang="scss">
    @import "../../assets/styles/components/componentItemHomeStyle";
</style>
