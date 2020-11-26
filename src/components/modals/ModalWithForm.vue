<template>
  <b-modal id="modal-with-form" centered hide-footer hide-header>
    <div class="d-block text-center title">{{ message }}</div>
    <div class="d-block text-center" dir="rtl">
      <b-form-group>
        <b-form-input
          :placeholder="deliveryCodeLabel"
          aria-describedby="emailHelp"
          type="phone"
          v-model="deliveryCode"
          variant="form-control"
        ></b-form-input>
      <span class="message" v-if="showMessage">کد را صحیح وارد نمایید</span>
      </b-form-group>
      <b-button
        id="testIdConfirmButton"
        v-ripple
        variant="btn btn-primary-high-soft"
        block
        @click="confirmOrder"
      >
      <span  v-if="!loading">
        {{titleButton}}
      </span>
      <span v-if="loading">
        <b-spinner small label="Busy"></b-spinner>
      </span>
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import router from "../../router";
import { mapActions, mapGetters } from "vuex";
import { valueString } from "../../utils/strings";
import { api } from "../../utils/api";
import axios from "axios";

export default {
  name: "modalWithForm",

  data() {
    return {
      deliveryCode: "",
      showMessage:false,
      deliveryCodeLabel: valueString.LABEL_DELIVERY_CODE,
      loading: false,
    };
  },
  computed: {
    ...mapGetters([
      "getOrderId",
      "getLoading"
      ])
  },
  methods: {
    ...mapActions([
      "showLoading",
      "setInternetOrders",
      "setSelectStateInternetOrders"
      ]),
       navigate() {
      router.push({ name: "internetSale" });
    },
    confirmOrder() {
       this.loading = true
      if(this.deliveryCode === ""){
          this.loading = false
          this.showMessage = true
      }else {
        this.showMessage = false
        this.setToDeliveryToCustomer(this.getOrderId, this.deliveryCode);
      }
      
    },
    setToDeliveryToCustomer(orderId, deliveryCode) {
      this.loading = true
      let config = {
        headers: {
          "X-Openerp-Session-id": this.$session.get("session_id")
        }
      };
      let data = {
        jsonrpc: "2.0",
        method: "call",
        params: {
          order_id: orderId,
          confirm_code: deliveryCode
        },
        id: "382893928"
      };
      axios
        .post(api.API_SET_STATE_CUSTOMER, data, config)
        .then(res => {
          if(res.data.error === undefined){
                if(res.data.result.response === 'ok'){
            this.navigate()
            this.setSelectStateInternetOrders("customer_delivery");
            this.setInternetOrders(this.$session.get("session_id"));
            this.loading = false
            this.$bvModal.hide("modal-with-form");
          } else {
              this.showMessage = true
              this.loading = false
          }
          } else{
            this.loading = false
            this.$bvModal.hide("modal-with-form"); 
            alert("خطای سرور") 
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: {
    message: String,
    titleButton: String,
    clickConfirm: String
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/modals/modalWithForm";
</style>
