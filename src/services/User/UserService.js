import axios from "axios";

class UserService {

    storeNewUser(data) {
        return axios.post('/v1/users', data)
    }
}

export default new UserService()