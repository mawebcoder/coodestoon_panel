import axios from "axios";

class TagService {

    storeCourseTag(data) {
        return axios.post('/v1/courses/tags', data)
    }

    getListOfTheTags(select_box = null) {
        if (select_box !== null) {
            return axios.get('/v1/courses/tags?select_box=true')
        }
        return axios.get('/v1/courses/tags')
    }

    switchActivation(id, data) {
        return axios.put('/v1/courses/tags/' + id, data)
    }

    deleteTags(data) {
        return axios.post('/v1/courses/tags/delete-multiple', data)
    }

    search(search_value) {
        return axios.get('/v1/courses/tags?search=' + search_value)
    }

    updateTag(id, data) {
        return axios.put('/v1/courses/tags/' + id, data)
    }

    getListOfTheActiveCourseTags() {
        return axios.get('/v1/courses/tags/actives')
    }

    searchInActiveTags(search_value) {
        return axios.get('/v1/courses/tags/actives?search=' + search_value)
    }

    getListOfTheDeActiveTags() {
        return axios.get('/v1/courses/tags/de-actives')
    }

    searchInDeActiveTags(search_value) {
        return axios.get('/v1/courses/tags/de-actives?search=' + search_value)
    }

}

export default new TagService()