import axios from "axios";


class AuthService {
    login(data) {
        return axios.post('/v1/admin/login',data)
    }
}
export default new AuthService();