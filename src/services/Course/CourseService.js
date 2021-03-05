import axios from "axios";

class CourseService {
    StoreNewCourse(data) {

        return axios.post('/v1/courses', data);
    }

    getCourses(select_box = null) {
        if (select_box !== null) {
            return axios.get('/v1/courses?select_box=true')
        }
        return axios.get('/v1/courses')
    }

    deleteCourses(data) {
        return axios.post('/v1/courses/delete-multiple', data)
    }

    switchCourseStatus(data, course_id) {
        return axios.post('/v1/courses/switch-status/' + course_id, data)
    }

    getCourseInformation(course_id) {
        return axios.get('/v1/courses/' + course_id + '/edit');
    }

    updateCourse(course_id,data) {
        return axios.post('/v1/courses/update/'+course_id,data)
    }

}

export default new CourseService();