import Vue from 'vue'
import Vuex from 'vuex'
import state from "./states";
Vue.use(Vuex)
const store = new Vuex.Store({
    state,


})
export default store;