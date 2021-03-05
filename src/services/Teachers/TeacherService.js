import axios from "axios";

class TeacherService {

    getActiveTeachers() {
        return axios.get('/v1/teachers/actives')
    }
}
export default new TeacherService();