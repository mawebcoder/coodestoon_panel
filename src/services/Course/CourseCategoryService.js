import axios from "axios";

class CourseCategoryService {

    getCourseCategories(select_box = null) {
        if (select_box != null) {
            return axios.get('/v1/courses/categories?select_box=true')
        }
        return axios.get('/v1/courses/categories')
    }

    storeCourseCategory(data) {
        return axios.post('/v1/courses/categories', data)
    }

    paginateCourseCategories(page_number) {
        return axios.get('/v1/courses/categories?page=' + page_number)
    }

    switchCourseCategoryStatus(id, data) {
        return axios.post('/v1/courses/categories/' + id, data)
    }

    deleteCourseCategories(data) {
        return axios.post('/v1/courses/delete/categories/delete-multi', data)
    }

    searchInCourseCategories(search_value) {
        return axios.get('/v1/courses/categories?search=' + search_value)
    }

    getSpecificCourseCategoryInfo(courseCategory_id) {
        return axios.get('/v1/courses/categories/edit/' + courseCategory_id)
    }


    getActiveCourseCategoryList() {
        return axios.get('/v1/courses/categories/actives')
    }

    paginateActiveCourseCategories(page_number) {
        return axios.get('/v1/courses/categories/actives?page=' + page_number)
    }
    searchInActiveCourseCategories(search_value){
        return axios.get('/v1/courses/categories/actives?search=' + search_value)
    }

    getDeActiveCourseCategoryList() {
        return axios.get('/v1/courses/categories/de-actives')
    }

    paginateDeActiveCourseCategories(page_number) {
        return axios.get('/v1/courses/categories/de-actives?page=' + page_number)
    }
    searchInDeActiveCourseCategories(search_value){
        return axios.get('/v1/courses/categories/de-actives?search=' + search_value)
    }

    updateCourseCategory(id,data){
        return axios.post('/v1/courses/categories/'+id,data)
    }


    // trashed
    getTrashedCourseCategories(){
        return axios.get('/v1/courses/category/trashed')
    }
    searchInDeletedCourseCategories(search_value){
        return axios.get('/v1/courses/category/trashed?search='+search_value)
    }
    paginateDeletedCourseCategories(page_number){
        return axios.get('/v1/courses/category/trashed?page='+page_number)
    }
    forceDeleteCourseCategories(data){
        return axios.post('/v1/courses/category/force-delete',data)
    }
    restoreCourseCategories(data){
        return axios.post('/v1/courses/category/restore',data)
    }


}

export default new CourseCategoryService();