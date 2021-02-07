import Vue from 'vue'
import App from './App.vue'
import './assets/responsive/responsive.css'
import './assets/css/fontiran.css'
import 'boxicons';
import VueRouter from "vue-router";
import router from "./routes/router";

import PrettyCheckbox from 'pretty-checkbox-vue';
import axios from "axios";
import VueNoty from 'vuejs-noty-2'
import store from "./store/vuex";
import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles


Vue.use(VueGoodTablePlugin);

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
Vue.use(PrettyCheckbox);
Vue.use(VueRouter)
Vue.use(VueNoty)
Vue.config.productionTip = false
Vue.use(Vuesax, {
    // options here
})
new Vue({

    router,
    store,
    render: h => h(App),
}).$mount('#app')
