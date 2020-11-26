<template>
    <div id="support">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
        </div>
    </div>
</template>

<script>
  import { valueString } from '../utils/strings'
  import Header from '../components/Header'

  export default {
    name: 'Support',
    components: { Header },
    data () {
      return {
        title: valueString.LABEL_ITEM_MENU_ُSUPPORT
      }
    }
  }
</script>

<style scoped>

</style>
