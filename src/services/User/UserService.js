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

    getAdminList(){
        return axios.get('/v1/users/admins/list')
    }
    searchInAdminList(search){
        return axios.get('/v1/users/admins/list?search='+search)
    }
    paginateInAdminList(page_number){
        return axios.get('/v1/users/admins/list?page='+page_number)
    }
    updateAdmin(user_id,data){
        return axios.post('/v1/users/admin/update/'+user_id,data)
    }
    getTeachersList(){
        return axios.get('/v1/users/teachers/list')
    }
    paginateInTeachersList(page_number){
        return axios.get('/v1/users/teachers/list?page='+page_number)
    }
    searchInTeacherList(search){
        return axios.get('/v1/users/teachers/list?search='+search)
    }
    getTeacherInfo(user_id){
        return axios.get('/v1/users/teachers/info/'+user_id)
    }

    // actives teachers
    getActiveTeacherList(){
        return axios.get('/v1/users/teachers/list/actives')
    }
    paginateInActiveTeacherList(page_number){
        return axios.get('/v1/users/teachers/list/actives?page='+page_number)
    }
    searchInActiveTeacherList(search){
        return axios.get('/v1/users/teachers/list/actives?search='+search)
    }

    // inactive teachers
    getInActiveTeachers(){
        return axios.get('/v1/users/teachers/list/de-actives')
    }

    paginateInInActiveTeachers(page_number){
        return axios.get('/v1/users/teachers/list/de-actives?page='+page_number)
    }
    searchInInActiveTeachers(search){
        return axios.get('/v1/users/teachers/list/de-actives?search='+search)
    }




    // users
    getTrashesUsers(){
        return axios.get('/v1/users/trashes')
    }

    paginateInTrashesUsers(page_number){
        return axios.get('/v1/users/trashes?page='+page_number)
    }
    searchInTrashesUsers(search){
        return axios.get('/v1/users/trashes?search='+search)
    }

    forceDeleteUsers(data){
        return axios.post('/v1/users/user/force-delete',data)
    }

    restoreUsers(data){
        return axios.post('/v1/users/restore',data)
    }


    // teachers


    getTrashesTeachers(){
        return axios.get('/v1/users/teachers/trashes')
    }

    paginateInTrashesTeachers(page_number){
        return axios.get('/v1/users/teachers/trashes?page='+page_number)
    }

    searchInTrashesTeachers(search){
        return axios.get('/v1/users/teachers/trashes?search='+search)
    }

    forceDeleteTheTeachers(data){
        return axios.post('/v1/users/teachers/force-delete',data)
    }

    










}

export default new UserService()