import axios from "axios";

class VideosTagService {

    storeVideoTag(data) {
        return axios.post('/v1/videos/tags', data)
    }

    getListOfTheVideoTags() {
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
    deleteVideoTags(data){
        return axios.post('/v1/videos/tags/delete-multi',data)
    }

}

export default new VideosTagService();