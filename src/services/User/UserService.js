import axios from "axios";

class UserService {

    storeNewUser(data) {
        return axios.post('/v1/users', data)
    }

    getUserList() {
        return axios.get('/v1/users/list')
    }

    deleteUser(data) {
        return axios.post('/v1/users/delete', data)
    }

    paginateInUserList(page_number) {
        return axios.get('/v1/users/list?page=' + page_number)
    }

    searchInUserList(search_value) {
        return axios.get('/v1/users/list?search=' + search_value)
    }
    getUserInfo(user_id){
        return axios.get('/v1/users/user-info/'+user_id)
    }
    updateUserInfo(user_id,data){
        return axios.post('/v1/users/update/user/'+user_id,data)
    }
}

export default new UserService()