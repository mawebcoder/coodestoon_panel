import axios from "axios";

class CourseService {
    StoreNewCourse(data) {

        return axios.post('/v1/courses', data);

    }

}

export default new CourseService();