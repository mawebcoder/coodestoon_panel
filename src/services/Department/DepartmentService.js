import axios from "axios";

class DepartmentService {

    storeNewDepartment(data){
        return axios.post('/v1/departments',data)
    }

}
export default new DepartmentService()