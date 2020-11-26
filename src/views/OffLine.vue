<template>
    <div id="offline-page">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" titlePage=""></Header>
            <b-container>
                <b-row>
                    <b-col cols="12" class="container-message">
                        <img class="img-fluid" src="../assets/img/ic_not_internet.png">
                        <div>
                            {{title}}
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'

  export default {
    name: 'OffLine',
    data () {
      return {
        title: valueString.LABEL_NOT_INTERNET,
      }
    },
    components: { Header }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewOfflinePage";
</style>
