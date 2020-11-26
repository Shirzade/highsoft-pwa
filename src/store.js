/* eslint-disable no-lone-blocks */
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { api } from "../src/utils/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    shopName: "",
    shopEmail: "",
    shopPhone: "",
    shopMobile: "",
    shopName: '',
    shopEmail: '',
    shopPhone: '',
    firstShow: false,
    shopMobile: '',
    amountSaleDaily: 0,
    amountSaleMonthly: 0,
    orderId: 0,
    loading: true,
    content: false,
    userRole: null,
    showMessage: false,
    internetOrders: [],
    suggestedProducts: [],
    setPakInOrder: false,
    selectStateInternetOrders: 'confirm_cart',
    imgNewOrdersInInternetOrder: 'ic_order_new.png',
    imgConfirmOrderInInternetOrder: 'ic_order_confirm.png',
    imgSetPakInInternetOrder: 'ic_order_pake.png',
    imgDeliveryInInternetOrder: 'ic_order_delivery.png',
    styleTextNewInInternetOrders: 'style-order',
    styleTextEditInInternetOrders: 'style-order',
    styleTextPakInInternetOrders: 'style-order',
    styleTextCustomerInInternetOrders: 'style-order',
    confirmCustomerState: false,
    abilitySetAvailable: false,
    placeHelp:null
  },

  // ---------------------------------- getters ---------------------------
  getters: {
    getPlaceHelp:state=>{
      return state.placeHelp
    },
    getFirstShow: state => {
      return state.firstShow
    },
    getOrderId:state=>{
       return state.orderId
    },
    getUserRole : state=>{
      return state.userRole
    },
    getAbilitySetAvailable: state => {
      return state.abilitySetAvailable
    },
    getConfirmCustomerState: state => {
      return state.confirmCustomerState
    },
    getSuggestedProducts: state => {
      return state.suggestedProducts
    },
    getStyleTextNewInInternetOrders: state => {
      return state.styleTextNewInInternetOrders;
    },
    getStyleTextEditInInternetOrders: state => {
      return state.styleTextEditInInternetOrders;
    },
    getStyleTextPakInInternetOrders: state => {
      return state.styleTextPakInInternetOrders;
    },
    getStyleTextCustomerInInternetOrders: state => {
      return state.styleTextCustomerInInternetOrders;
    },
    getImgNewOrdersInInternetOrder: state => {
      return state.imgNewOrdersInInternetOrder;
    },
    getImgConfirmOrderInInternetOrder: state => {
      return state.imgConfirmOrderInInternetOrder;
    },
    getImgSetPakInInternetOrder: state => {
      return state.imgSetPakInInternetOrder;
    },
    getImgDeliveryInInternetOrder: state => {
      return state.imgDeliveryInInternetOrder;
    },
    getSelectStateInternetOrders: state => {
      return state.selectStateInternetOrders;
    },
    getLoading: state => {
      return state.loading;
    },
    getContentPage: state => {
      return state.content;
    },
    getInternetOrders: state => {
      return state.internetOrders;
    },
    getShopName: state => {
      return state.shopName;
    },
    getShopEmail: state => {
      return state.shopEmail;
    },
    getShopMobile: state => {
      return state.shopMobile;
    },
    showMessage: state => {
      return state.showMessage;
    },
    getAmountSaleDaily: state => {
      return state.amountSaleDaily;
    },
    getAmountSaleMonthly: state => {
      return state.amountSaleMonthly;
    },
    getPakInOrder: state => {
      return state.setPakInOrder;
    }
  },

  // -------------------------- mutations----------------------------------
  mutations: {
    setPlaceHelp:(state,payload)=>{
          state.placeHelp = payload
    },
    setOrderId: (state, payload) => {
      state.orderId = payload;
    },
    setUserRole: (state, payload) => {
      state.userRole = payload;
    },
    showLoading: (state, payload) => {
      state.loading = payload;
    },
    showContent: (state, payload) => {
      state.content = payload;
    },
    setInternetOrders: (state, payload) => {
      state.internetOrders = [];
      let config = {
        headers: {
          "X-Openerp-Session-id": payload
        }
      };
      let data = {
        jsonrpc: "2.0",
        method: "call",
        params: {
          state: state.selectStateInternetOrders
        },
        id: "382893928"
      };
      axios
        .post(api.API_INTERNET_ORDERS, data, config)
        .then(res => {
          switch (state.selectStateInternetOrders) {
            case "confirm_cart":
              {
                state.imgNewOrdersInInternetOrder = "ic_order_new_clicked.png";
                state.imgConfirmOrderInInternetOrder = "ic_order_confirm.png";
                state.imgSetPakInInternetOrder = "ic_order_pake.png";
                state.imgDeliveryInInternetOrder = "ic_order_delivery.png";
                state.styleTextNewInInternetOrders = "style-order-selected";
                state.styleTextEditInInternetOrders = "style-order";
                state.styleTextPakInInternetOrders = "style-order";
                state.styleTextCustomerInInternetOrders = "style-order";
              }
              break;
            case "edit":
              {
                state.imgNewOrdersInInternetOrder = "ic_order_new.png";
                state.imgConfirmOrderInInternetOrder =
                  "ic_order_confirm_clicked.png";
                state.imgSetPakInInternetOrder = "ic_order_pake.png";
                state.imgDeliveryInInternetOrder = "ic_order_delivery.png";
                state.styleTextNewInInternetOrders = "style-order";
                state.styleTextEditInInternetOrders = "style-order-selected";
                state.styleTextPakInInternetOrders = "style-order";
                state.styleTextCustomerInInternetOrders = "style-order";
              }
              break;
            case "express_delivery":
              {
                state.imgNewOrdersInInternetOrder = "ic_order_new.png";
                state.imgConfirmOrderInInternetOrder = "ic_order_confirm.png";
                state.imgSetPakInInternetOrder = "ic_order_pake_clicked.png";
                state.imgDeliveryInInternetOrder = "ic_order_delivery.png";
                state.styleTextNewInInternetOrders = "style-order";
                state.styleTextEditInInternetOrders = "style-order";
                state.styleTextPakInInternetOrders = "style-order-selected";
                state.styleTextCustomerInInternetOrders = "style-order";
              }
              break;
            case "customer_delivery":
              {
                state.imgNewOrdersInInternetOrder = "ic_order_new.png";
                state.imgConfirmOrderInInternetOrder = "ic_order_confirm.png";
                state.imgSetPakInInternetOrder = "ic_order_pake.png";
                state.imgDeliveryInInternetOrder =
                  "ic_order_delivery_clicked.png";
                state.styleTextNewInInternetOrders = "style-order";
                state.styleTextEditInInternetOrders = "style-order";
                state.styleTextPakInInternetOrders = "style-order";
                state.styleTextCustomerInInternetOrders =
                  "style-order-selected";
              }
              break;
          }

          state.loading = false;
          if (res.data.result.orders.length > 0) {
            state.showMessage = false;
            state.internetOrders = res.data.result.orders;
          } else {
            state.showMessage = true;
            state.internetOrders = [];
          }
        })
        .catch(err => {
          console.log(err);
        });
      // state.internetOrders = payload
    },
    setSelectStateInternetOrders: (state, payload) => {
      state.selectStateInternetOrders = payload;
    },
    showMessage: (state, payload) => {
      state.showMessage = payload;
    },
    setShopName: (state, payload) => {
      state.shopName = payload;
    },
    setShopEmail: (state, payload) => {
      state.shopEmail = payload;
    },
    setShopMobile: (state, payload) => {
      state.shopMobile = payload;
    },
    setAmountStoreSale: (state, payload) => {
      let config = {
        headers: {
          "X-Openerp-Session-id": payload
        }
      };
      let data = {
        jsonrpc: "2.0",
        method: "call",
        params: {},
        id: "382893928"
      };
      axios
        .post(api.API_COUNT_STORE_ORDERS, data, config)
        .then(res => {
          state.amountSaleDaily = res.data.result.in_day_price;
          state.amountSaleMonthly = res.data.result.in_month_price;
        })
        .catch(err => {
          console.log(err);
        });
    },
    setPakInOrder: (state, payload) => {
      state.setPakInOrder = payload
    },
    setSuggestedProducts: (state, payload) => {
      state.suggestedProducts = payload
    },
    setConfirmCustomerState: (state, payload) => {
      state.confirmCustomerState = payload
    },
    setAbilitySetAvailable: (state, payload) => {
      state.abilitySetAvailable = payload
    },
    setFirstShow: (state, payload) => {
      state.firstShow = payload
    }
  },

  // -----------------------------  action -------------------------------
  actions: {

    setPlaceHelp:({commit},payload)=>{
        commit('setPlaceHelp',payload)
    },
    setOrderId: ({ commit }, payload) => {
      commit("setOrderId", payload);
    },
    setUserRole: ({ commit }, payload) => {
      commit("setUserRole", payload);
    },
    showLoading: ({ commit }, payload) => {
      commit("showLoading", payload);
    },
    showContent: ({ commit }, payload) => {
      commit("showContent", payload);
    },
    showMessage: ({ commit }, payload) => {
      commit("showMessage", payload);
    },
    setInternetOrders: ({ commit }, payload) => {
      commit("setInternetOrders", payload);
    },
    setShopName: ({ commit }, payload) => {
      commit("setShopName", payload);
    },
    setShopEmail: ({ commit }, payload) => {
      commit("setShopEmail", payload);
    },
    setShopMobile: ({ commit }, payload) => {
      commit("setShopMobile", payload);
    },
    setAmountStoreSales: ({ commit }, payload) => {
      commit("setAmountStoreSale", payload);
    },
    setPakInOrder: ({ commit }, payload) => {
      commit("setPakInOrder", payload);
    },
    setSelectStateInternetOrders: ({ commit }, payload) => {
      commit('setSelectStateInternetOrders', payload)
    },
    setSuggestedProducts: ({ commit }, payload) => {
      commit('setSuggestedProducts', payload)
    },
    setConfirmCustomerState: ({ commit }, payload) => {
      commit('setConfirmCustomerState', payload)
    },
    setAbilitySetAvailable: ({ commit }, payload) => {
      commit('setAbilitySetAvailable', payload)
    },
    setFirstShow: ({ commit }, payload) => {
      commit('setFirstShow', payload)
    }
  }
});
