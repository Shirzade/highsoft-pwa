<template>
    <b-col v-ripple cols="6" id="item-home-sale-in-person">
        <div @click="navigate" id="testIdInPerson">
            <div>
                <img src="../../assets/img/ic_homePage_reportPersent.png">
            </div>
            {{itemHomeReportSaleInPerson}}
        </div>
    </b-col>
</template>

<script>
  import { valueString } from '../../utils/strings'
  import router from '../../router'
    import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'ItemHomeSaleInProduct',
    data () {
      return {
        itemHomeReportSaleInPerson: valueString.LABEL_ITEM_HOME_REPORT_SALE_IN_PERSON
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
         router.push({ name: 'inPersonSale' ,params:{'role':this.getUserRole}})
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
