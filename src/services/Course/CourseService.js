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

    updateCourse(course_id, data) {
        return axios.post('/v1/courses/update/' + course_id, data)
    }

    searchInCourses(search) {
        return axios.get('/v1/courses?search=' + search)
    }

    paginateCourses(page_number) {
        return axios.get('/v1/courses?page=' + page_number)
    }

    // actives
    getActiveCourses() {

        return axios.get('/v1/courses/actives')
    }

    searchInActiveCourses(search) {
        return axios.get('/v1/courses/actives?search=' + search)
    }

    paginateActiveCourses(page_number) {
        return axios.get('/v1/courses/actives?page=' + page_number)
    }


    // deactives
    getDeActiveCourses() {

        return axios.get('/v1/courses/de-actives')
    }

    searchInDeActiveCourses(search) {
        return axios.get('/v1/courses/de-actives?search=' + search)
    }

    paginateDeActiveCourses(page_number) {
        return axios.get('/v1/courses/de-actives?page=' + page_number)
    }

    // trashes
    getTrashesCourses() {

        return axios.get('/v1/courses/trashed')
    }

    searchInTrashesCourses(search) {
        return axios.get('/v1/courses/trashed?search=' + search)
    }

    paginateInTrashesCourses(page_number) {
        return axios.get('/v1/courses/trashed?page=' + page_number)
    }
    forceDeleteCourses(data){
        return axios.post('/v1/courses/force-delete',data)
    }
    restoreCourses(data){
        return  axios.post('/v1/courses/restore',data)
    }

}

export default new CourseService();