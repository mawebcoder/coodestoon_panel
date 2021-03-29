import axios from "axios";

class DepartmentService {

    storeNewDepartment(data) {
        return axios.post('/v1/departments', data)
    }

    getListOfTheDepartments(select_box = null) {
        if (select_box != null) {
            return axios.get('/v1/departments?select_box=true')
        }
        return axios.get('/v1/departments')
    }

    AssignUsersToDepartment(department_id, data) {
        return axios.post('/v1/departments/' + department_id + '/users', data)
    }
    deleteDepartments(data){
        return axios.post('/v1/departments/delete',data)
    }
    updateDepartment(department_id,data){
        return axios.put('/v1/departments/'+department_id,data)
    }
    paginateInDepartments(page_number){
        return axios.get('/v1/departments?page='+page_number)
    }
    getDepartmentsMembers(department_id){
        return axios.get('/v1/departments/'+department_id+'/members')
    }


}

export default new DepartmentService()