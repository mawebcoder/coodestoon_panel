import VueRouter from "vue-router";
import store from "../store/vuex";
import routes from "./routes";

const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0, behavior: 'smooth',}
    },

})

router.beforeEach((to,from,next) => {

    store.state.loading = true;
    next()
})

router.afterEach(() => {

    store.state.loading = false;
})

export default router