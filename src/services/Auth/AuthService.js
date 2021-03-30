import axios from "axios";


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
}

export default new AuthService();