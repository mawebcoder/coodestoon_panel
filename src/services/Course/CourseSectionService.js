import axios from "axios";

class CourseSectionService {

    storeCourseSection(data) {
        return axios.post('/v1/courses/sections',data)
    }
}

export default new CourseSectionService()