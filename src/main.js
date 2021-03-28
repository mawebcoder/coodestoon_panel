import Vue from 'vue'
import App from './App.vue'
import './assets/responsive/responsive.css'
import './assets/css/fontiran.css'
import 'boxicons';
import VueRouter from "vue-router";
import router from "./routes/router";
import Vuesax from 'vuesax'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';

Vue.use(VuePersianDatetimePicker, {
    name: 'custom-date-picker',
    props: {
        inputFormat: 'YYYY-MM-DD',
        format: 'YYYY-MM-DD',
        editable: false,
        inputClass: 'form-control my-custom-class-name',
        placeholder: 'تاریخ انقضا را مشخص کنید...',
        altFormat: 'YYYY-MM-DD',
        color: '#000',
        autoSubmit: false,
    }
});
import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
    // options here
})
import editor from "vue-editor-md2"

Vue.use(editor)
import PrettyCheckbox from 'pretty-checkbox-vue';
import axios from "axios";
import VueNoty from 'vuejs-noty-2'
import store from "./store/vuex";
import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'


Vue.use(VueGoodTablePlugin);

axios.defaults.baseURL = 'http://localhost:8000/api'
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
Vue.use(PrettyCheckbox);
Vue.use(VueRouter)
Vue.use(VueNoty)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
