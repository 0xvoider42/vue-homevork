import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueBootstrapTypeahead from "vue-bootstrap-typeahead"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";

import MainPage from "./components/MainPage";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import HelpPage from "./components/HelpPage";
import ShoppingCartPage from "./components/ShoppingCartPage";
import OrderDetailsPage from "./components/OrderDetailsPage";
import OrdersPage from "./components/OrdersPage";
import ProductsPage from "./components/ProductsPage";


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

axios.defaults.headers.common['Authorization']  = 'Bearer osvaldhaha@gmail.com';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: MainPage },
    { name: 'products', path: '/products', component: ProductsPage },
    { name: 'help', path: '/help', component: HelpPage },
    { name: 'category', path: '/categories/:alias', component: CategoryPage },
    { name: 'product', path: '/products/:productId', component: ProductPage },
    { name: 'cart', path: '/cart', component: ShoppingCartPage },
    { name: 'orders', path: '/orders', component: OrdersPage },
    { name: 'orderDetails', path: '/orders/:orderId', component: OrderDetailsPage }

  ]
})

if(localStorage.cartId){
  axios
  .get("https://euas.person.ee/user/carts/" + localStorage.cartId).then((response) => {
    new Vue({
      router,
      render: h => h(App),
      cart: response.data
    }).$mount('#app')
  });
 }else{
  axios
  .post("https://euas.person.ee/user/carts").then((response) => {
    localStorage.cartId = response.data.id
    new Vue({
      router,
      render: h => h(App),
      cart: response.data
    }).$mount('#app')
  });
 }

