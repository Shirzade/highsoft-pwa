<template>
    <div id="login">
        <div class="d-flex flex-column flex-container">
            <div class="d-flex flex-column flex-grow-1 justify-content-center">
                <div class="text-center">
                    <img class="img-fluid" src="../assets/img/ic_loading.png">
                </div>
            </div>
            <div class="d-flex flex-column flex-grow-3 justify-content-center">


                <b-container>
                    <b-row>
                        <b-col class="containerForm" cols="10" offset="1">



                            <b-form>

                                <b-input-group class="container-form-login-page">
                                    <b-input-group-prepend>
                                    <span class="input-group-text">
                                        <font-awesome-icon icon="phone"/>
                                    </span>
                                    </b-input-group-prepend>
                                    <b-form-input
                                            class="input-class"
                                            :placeholder="loginUserName"
                                            aria-describedby="emailHelp"
                                            type="phone"
                                            id="testIdUsername"
                                            v-model="username"
                                            variant="form-control">
                                    </b-form-input>
                                </b-input-group>


                                <b-input-group class="container-form-login-page">
                                    <b-input-group-prepend>
                                    <span class="input-group-text">
                                        <font-awesome-icon icon="key"/>
                                    </span>
                                    </b-input-group-prepend>
                                    <b-form-input
                                            class="input-class"
                                            :placeholder="loginPassword"
                                            type="password"
                                            id="testIdPassword"
                                            v-model="password"
                                            variant="form-control">
                                    </b-form-input>
                                </b-input-group>

                                <b-button v-ripple @click="loginUser()" variant="btn btn-primary-high-soft" block>
                                    <span v-if="!getLoading">
                                        {{loginButton}}
                                    </span>
                                    <span v-if="getLoading">
                                        <b-spinner small label="Busy"></b-spinner>
                                    </span>
                                </b-button>
                            </b-form>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
            <div class="d-flex flex-column  flex-grow-1 justify-content-center">
                <b-container>
                    <b-row class="container-remember-me">
                        <!--<div>-->
                        <!--<b-form-checkbox-->
                        <!--class="containerCheckBox"-->
                        <!--id="checkbox-1"-->
                        <!--name="checkbox-1"-->
                        <!--unchecked-value="not_accepted"-->
                        <!--value="accepted">-->
                        <!--</b-form-checkbox>-->
                        <!--{{loginRememberMe}}-->
                        <!--</div>-->
                    </b-row>
                </b-container>
            </div>
        </div>
        <modal-single-button :message=messageNotEnterUserName :titleButton=titleButtonConfirm></modal-single-button>
    </div>
</template>

<script>
  import { valueString } from '../utils/strings'
  import router from '../router'
  import { api } from '../utils/api'
  import axios from 'axios'
  import ModalSingleButton from '../components/modals/ModalSingleButton'
  import { mapActions, mapGetters } from 'vuex'
  import Loading from '../components/Loading'

  export default {
    name: 'Login',
    components: { Loading, ModalSingleButton },
    data () {
      return {
        username: '',
        password: '',
        loginButton: valueString.LABEL_LOGIN_BUTTON,
        loginUserName: valueString.LABEL_LOGIN_USER_NAME,
        loginPassword: valueString.LABEL_LOGIN_PASSWORD,
        loginRememberMe: valueString.LABEL_LOGIN_REMEMBER_ME,
        messageNotEnterUserName: valueString.LABEL_DETAILS_PAGE_MESSAGE_NOT_USERNAME,
        titleButtonConfirm: valueString.LABEL_BUTTON_CONFIRM
      }
    },
    computed: {
      ...mapGetters([
        'getLoading',
        'getUserRole'
      ]),
    },
    methods: {
      ...mapActions([
        'showLoading',
        'setShopName',
        'setShopEmail',
        'setShopMobile',
        'setUserRole'
      ]),
      navigate () {
        router.push({ name: 'home' , params:{role:this.getUserRole}})
      },
      loginUser () {
        this.showLoading(true)
        console.log(process.env.BASE_URL)
        axios.post(api.API_LOGIN, {
          jsonrpc: '2.0',
          method: 'call',
          params: {
            db: 'hyper',
            login: this.parsePersianNumberToEnglish(this.username),
            password: this.parsePersianNumberToEnglish(this.password)
          },
          id: '382893928'
        })
          .then((res) => {
            if (typeof (res.data.result.uid) == 'number') {
              this.setUserRole(JSON.parse(res.data.result.user_context.property).role[0])
              this.$session.start()
              this.$session.set('session_id', res.data.result.session_id)
              this.getStoreInformation()
              this.showLoading(false)

            } else {
              this.$bvModal.show('modal-single-button')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getStoreInformation () {
        let config = {
          headers: {
            'X-Openerp-Session-id': this.$session.get('session_id')
          }
        }
        let data = {
          jsonrpc: '2.0',
          method: 'call',
          params: {},
          id: '382893928'
        }
        axios.post(api.API_INFORMATION_PROFILE, data, config).then((res) => {
          console.log(res.data.result)
          this.$session.set('base_info', res.data.result.base_info)
          let shopInformation = res.data.result.base_info
          this.setShopName(shopInformation.name)
          this.setShopEmail(shopInformation.email)
          this.setShopMobile(shopInformation.mobile)
          this.$session.set('sid', res.data.result.shops[0].id)
          this.$session.set('shopName', res.data.result.shops[0].name)
          this.navigate()
        })
          .catch((err) => {
            console.log(err)
          })
      },
      parsePersianNumberToEnglish (numberInput) {
        var number = numberInput
        number = number
          .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
            return d.charCodeAt(0) - 1632
          })
          .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d) {
            return d.charCodeAt(0) - 1776
          })
        return number
      }
    },
    created () {
      this.showLoading(false)
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/styles/views/viewLogin";
</style>
