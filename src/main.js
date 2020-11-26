import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueSession from 'vue-session'
import VueQuagga from 'vue-quaggajs'
import Ripple from 'vue-ripple-directive'
import './registerServiceWorker'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone,faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueNumeralFilterInstaller from 'vue-numeral-filter'
import EasySlider from 'vue-easy-slider'
import ImageUploader from 'vue-image-upload-resize'

var options = {
  persist: true
}
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' })
Vue.use(BootstrapVue)

Vue.use(EasySlider)
Vue.use(VueSession, options)
Vue.directive('ripple', Ripple)
Vue.use(VueQuagga)
Vue.use(ImageUploader)

library.add(faPhone)
library.add(faKey)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Ripple.color = 'rgba(255, 255, 255, 0.35)'

axios.defaults.baseURL = 'https://www.highsoft.ir'
// axios.defaults.baseURL = 'https://news.highsoft.ir'
// axios.defaults.baseURL = 'https://www.highsoft.ir'
// axios.defaults.baseURL = 'http://10.1.24.180'
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'No'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
