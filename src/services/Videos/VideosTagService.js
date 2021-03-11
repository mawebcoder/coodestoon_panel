import axios from "axios";

class VideosTagService {

    storeVideoTag(data) {
        return axios.post('/v1/videos/tags', data)
    }

    getListOfTheVideoTags(select_box = null) {
        if (select_box != null) {
            return axios.get('/v1/videos/tags?select_box=true')
        }
        return axios.get('/v1/videos/tags')
    }

    paginateInVideoTags(page_number) {
        return axios.get('/v1/videos/tags?page=' + page_number)
    }

    searchInVideoTags(search) {
        return axios.get('/v1/videos/tags?search=' + search)
    }

    switchActivation(tag_id, data) {
        return axios.put('/v1/videos/tags/' + tag_id, data)
    }

    updateVideoTagService(tag_id, data) {

        return axios.put('/v1/videos/tags/' + tag_id, data)
    }

    deleteVideoTags(data) {
        return axios.post('/v1/videos/tags/delete-multi', data)
    }

    // active section


    getActivesVideoTags() {
        return axios.get('/v1/videos/tags/actives')
    }

    paginateActiveVideoTags(page_number) {
        return axios.get('/v1/videos/tags/actives?page=' + page_number)
    }

    searchInActiveVideoTags(search) {
        return axios.get('/v1/videos/tags/actives?search=' + search)
    }

    // de-actives
    getDeActivesVideoTags() {
        return axios.get('/v1/videos/tags/de-actives')
    }

    paginateDeActiveVideoTags(page_number) {
        return axios.get('/v1/videos/tags/de-actives?page=' + page_number)
    }

    searchInDeActiveVideoTags(search) {
        return axios.get('/v1/videos/tags/de-actives?search=' + search)
    }
}

export default new VideosTagService();