<template>
    <div id="help">
        <div class="d-flex flex-column flex-container">
            <!--<Header showBackIcon="true" :titlePage=title></Header>-->
            <slider style="height:90vh" animation="fade">
                <slider-item>
                    <div style="text-align: center;">
                        <img class="img-fluid" src="../assets/img/ic_help_slide1.jpg">
                    </div>
                </slider-item>
                <slider-item>
                    <div style=" height:100vh;text-align: center;background: #FBF7EC">
                        <img class="img-fluid" src="../assets/img/ic_help_slide2.jpg">
                    </div>
                </slider-item>
                <slider-item>
                    <div style="text-align: center;">
                        <img class="img-fluid" src="../assets/img/ic_help_slide3.jpg">
                    </div>
                </slider-item>
            </slider>
            <div class="start-button">
                <button-orange clickEvent="START_APP" :title=titleButton></button-orange>
            </div>
        </div>
    </div>
</template>

<script>
  import Header from '../components/Header'
  import { valueString } from '../utils/strings'
  import { Slider, SliderItem } from 'vue-easy-slider'
  import { mapActions, mapGetters } from 'vuex'
  import ButtonOrange from '../components/buttons/ButtonOrange'

  export default {
    name: 'Help',
    data () {
      return {
        title: valueString.LABEL_ITEM_MENU_HELP,
        titleButton: valueString.LABEL_BUTTON,
        list: [
          { width: '100%', height: '100%' },
          { width: '100%', height: '100%' },
          { width: '100%', height: '100%' },
        ],
      }
    },
    methods: {
      ...mapActions([
        'setFirstShow'
      ])
    },
    components: { ButtonOrange, Header, Slider, SliderItem, }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewHelp";
</style>
