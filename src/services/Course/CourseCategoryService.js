import axios from "axios";

class CourseCategoryService {

    getCourseCategories(select_box=null){
        if (select_box!=null){
            return axios.get('/v1/courses/categories?select_box=true')
        }
        return axios.get('/v1/courses/categories?select_box=true')
    }
    storeCourseCategory(data){
        return axios.post('/v1/courses/categories',data)
    }

}

export default new CourseCategoryService();