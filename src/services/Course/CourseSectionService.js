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

    // deActives

    getDeActiveCourseSections() {
        return axios.get('/v1/courses/sections/de-actives')
    }

    searchInDeActiveCourseSection(search) {
        return axios.get('/v1/courses/sections/de-actives?search=' + search)
    }

    paginateDeActiveCourseSectionList(page_number) {
        return axios.get('/v1/courses/sections/de-actives?page=' + page_number)
    }

    // trashes


    getTrashedCourseSections(){
        return axios.get('/v1/courses/sections/trashed')
    }
    paginateInTrashedCourseSections(page_number){
        return axios.get('/v1/courses/sections/trashed?page='+page_number)
    }
    searchInTrashedCourseSections(search){
        return axios.get('/v1/courses/sections/trashed?search='+search)
    }
    restoreCourseSections(data){
        return axios.post('/v1/courses/sections/restore',data)
    }
    forceDeleteCourseSections(data){
        return axios.post('/v1/courses/sections/force-delete',data)
    }
}

export default new CourseSectionService()