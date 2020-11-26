<template>
    <div id="splash">
        <div class="d-flex flex-column flex-container">
            <div class="d-flex flex-column flex-grow-1 justify-content-center">
                <div class="text-center">
                    <img class="img-fluid" src="../assets/img/ic_loading.png">
                </div>
            </div>
            <div class="d-flex flex-column flex-grow-3 justify-content-center">
                <div class="d-flex justify-content-center">
                    <b-spinner class="m-5" label="Busy"></b-spinner>
                </div>
            </div>
            <div class="d-flex flex-column  flex-grow-1 justify-content-center">
                <div class="text-center">
                    <img class="img-fluid float-left" src="../assets/img/ic_connect_pos.png">
                    <img class="img-fluid float-left" src="../assets/img/ic_connect_cup.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  import router from '../router'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Splash',
    methods: {
      ...mapActions([
        'setFirstShow'
      ]),
      navigate () {
        setTimeout(function () {
          if (this.getFirstShow) {
            router.push({ name: 'login' })
          } else {
            router.push({ name: 'help' })
          }

        }, 200)
      },
    },
    computed: {
      ...mapGetters([
        'getFirstShow'
      ]),
    },
    created () {
      this.navigate()
      this.$session.destroy()
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewSplash";
</style>
