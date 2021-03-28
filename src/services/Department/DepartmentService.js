import axios from "axios";

class DepartmentService {

    storeNewDepartment(data) {
        return axios.post('/v1/departments', data)
    }

    getListOfTheDepartments(select_box = null) {
        if (select_box != null) {
            return axios.get('/v1/departments?select_box=true')
        }
    }

    AssignUsersToDepartment(department_id,data) {
        return axios.post('/v1/departments/' + department_id + '/users', data)
    }


}

export default new DepartmentService()