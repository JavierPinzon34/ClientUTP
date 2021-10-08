import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './views/index.vue'
import About from './views/about.vue'
import Admin from './views/admin.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/admin', component: Admin }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
