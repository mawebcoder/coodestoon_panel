import axios from "axios";

class RoleService {
    StoreNewRole(data) {
        return axios.post('/v1/roles', data)
    }

    getListOfTheRoles(select_box = null) {
        if (select_box != null) {
            return axios.get('/v1/roles?select_box=true')
        }
        return axios.get('/v1/roles')
    }

    update(id, data) {
        return axios.put('/v1/roles/' + id, data)
    }

    delete(data) {
        return axios.post('/v1/roles/multi/delete', data)
    }

    paginate(page_number) {
        return axios.get('/v1/roles?page=' + page_number)
    }

    search(search_value) {
        return axios.get('/v1/roles?search=' + search_value)
    }

    getPermissions() {
        return axios.get('/v1/roles/permissions');
    }

    assignPermissionsToRole(data, rol_id) {
        return axios.post('/v1/roles/set-permissions/' + rol_id, data)
    }
}

export default new RoleService()