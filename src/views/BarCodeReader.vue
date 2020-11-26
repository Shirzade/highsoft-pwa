<template>
    <div id="barcode-reader">
        <div class="d-flex flex-column flex-container">
            <Header showBackIcon="true" :titlePage=title></Header>
            <b-container>
                <b-row class="container-barcode">
                    <v-quagga :onDetected="getBarcode" :readerSize="readerSize"
                              :readerTypes='["code_128_reader","ean_reader"]'
                              :aspectRatio="aspectRatio"></v-quagga>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import router from '../router'
  import OrangeLine from '../components/OrangeLine'

  export default {
    name: 'BarCodeReader',
    data () {
      return {
        title: valueString.LABEL_BARCODE_READER_PAGE_TITLE,
        aspectRatio: { min: 0, max: 10 },
        readerSize: {
          width: 300,
          height: 400
        },
        detecteds: []
      }
    },
    methods: {

      playSound () {
        let audio = new Audio(require('../assets/barcode.wav'))
        audio.play()
      },
      getBarcode (data) {
        this.playSound()
          router.push({ name: 'detailsProduct', params: { productName: data.codeResult.code } })
      }
    },
    components: { OrangeLine, Header }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewBarcodeReader";
</style>
