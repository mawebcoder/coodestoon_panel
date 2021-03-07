import axios from "axios";

class CourseSectionService {

    storeCourseSection(data) {
        return axios.post('/v1/courses/sections', data)
    }

    getCourseSections() {
        return axios.get('/v1/courses/sections')
    }

    updateCourseSection(course_section_id, data) {
        return axios.put('/v1/courses/sections/' + course_section_id, data)
    }

    deleteCourses(data) {
        return axios.post('/v1/courses/sections/delete-multi', data)
    }

    searchInCourseSection(search) {
        return axios.get('/v1/courses/sections?search=' + search)
    }

    paginateCourseSectionList(page_number) {
        return axios.get('/v1/courses/sections?page=' + page_number)
    }

    getCourseInformation(course_section_id) {
        return axios.get('/v1/courses/sections/' + course_section_id + '/edit')
    }

    // actives
    getActiveCourseSections() {
        return axios.get('/v1/courses/sections/actives')
    }

    searchInActiveCourseSection(search) {
        return axios.get('/v1/courses/sections/actives?search=' + search)
    }

    paginateActiveCourseSectionList(page_number) {
        return axios.get('/v1/courses/sections/actives?page=' + page_number)
    }
}

export default new CourseSectionService()