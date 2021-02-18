import axios from "axios";

class RoleService {
    StoreNewRole(data) {
        return axios.post('/v1/roles', data)
    }
}
export default new RoleService()