import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Splash from './views/Splash'
import ImportProduct from './views/ImportProduct'
import NeedShop from './views/NeedShop'
import InternetSale from './views/InternetSale'
import InPersonSale from './views/InPersonSale'
import SetQuantity from './views/SetQuantity'
import Home from './views/Home'
import DetailsProduct from './views/DetailsProduct'
import DetailsNeedProduct from './views/DetailsNeedProduct'
import BarcodeReader from './views/BarCodeReader'
import DetailsInternetOrder from './views/DetailsInternetOrder'
import DetailsInPersonOrder from './views/DetailsInPersonOrder'
import Help from './views/Help'
import OffLine from './views/OffLine'
import Support from './views/Support'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'splash', component: Splash },
    { path: '/offline', name: 'offline', component: OffLine },
    { path: '/login', name: 'login', component: Login },
    { path: '/home/:role', name: 'home', component: Home },
    { path: '/needShop', name: 'needShop', component: NeedShop },
    { path: '/importProduct/:role', name: 'importProduct', component: ImportProduct },
    { path: '/internetSale/:role', name: 'internetSale', component: InternetSale },
    { path: '/barcodeReader/:role', name: 'barcodeReader', component: BarcodeReader, props: { name: 'from' } },
    { path: '/inPersonSale/:role', name: 'inPersonSale', component: InPersonSale },
    { path: '/support', name: 'support', component: Support },
    {
      path: '/detailsInPersonOrder/:role',
      name: 'detailsInPersonOrder',
      component: DetailsInPersonOrder,
      props: { name: 'orderInformation' }
    },
    {
      path: '/detailsInternetOrder/:role',
      name: 'detailsInternetOrder',
      component: DetailsInternetOrder,
      props: { name: 'orderInformation' }
    },
    { path: '/detailsProduct', name: 'detailsProduct', component: DetailsProduct, props: { name: 'productName' } },
    { path: '/setQuantity', name: 'setQuantity', component: SetQuantity, props: { name: 'productInformation' } },
    { path: '/help', name: 'help', component: Help },
    {
      path: '/detailsNeedProduct',
      name: 'detailsNeedProduct',
      component: DetailsNeedProduct,
      props: { name: 'productBarcode' }
    },
    { path: '*', name: 'OffLine', component: OffLine },

  ]
})
