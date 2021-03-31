import axios from "axios";

class UserService {

    storeNewUser(data) {
        return axios.post('/v1/users', data)
    }
    getUserList(){
        return axios.get('/v1/users/list')
    }

}

export default new UserService()