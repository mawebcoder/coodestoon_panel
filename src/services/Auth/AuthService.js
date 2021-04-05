import axios from "axios";
import store from "@/store/vuex";


class AuthService {
    login(data) {
        return axios.post('/v1/admin/login', data)
    }

    verifyCode(data) {
        return axios.post('/v1/admin/verify-code',data)
    }
    resendVerificationCode(data){
        return axios.post('/v1/admin/resend-code',data)
    }
    checkLogin(next){
        localStorage.removeItem('pass');
        localStorage.removeItem('cell');
        axios.post('/v1/admin/authorization', {}, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {

            let values=res.data.data;
            store.state.role = values.role;
            store.state.user_id=values.user_id;
            store.state.user=values.user;
            store.state.user_profile_image=values.user_image;
            store.state.permissions = values.permissions
            store.state.fa_role = values.fa_role
            store.state.user_name = values.user_name
            if (new RegExp(/admin/).test(store.state.role)){
                next()
                return;
            }

            next({name: 'not-found'})


        }).catch(() => {

            localStorage.removeItem('token');

            next({name: 'login'})

        })
    }
}

export default new AuthService();