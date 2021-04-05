import axios from "axios";

class TeacherService {

    getActiveTeachers() {
        return axios.get('/v1/teachers/actives')
    }

    updateTeacherInfo(user_id,data) {
        return axios.post('/v1/users/update/teacher/'+user_id,data)
    }

}

export default new TeacherService();