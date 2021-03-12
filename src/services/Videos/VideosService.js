import axios from "axios";

class VideosService {
    storeVideo(data) {
        return axios.post('/v1/videos',data)
    }
    getVideoInformation(video_id){
        return axios.get('/v1/videos/'+video_id+'/edit')
    }

    deleteVideos(data){
        return axios.post('/v1/videos/delete/multi',data)
    }

    // not uploaded
    getNotUploadedVideos(){
        return axios.get('/v1/videos/unuploaded')
    }

    searchInNotUploadedVideos(search){
        return axios.get('/v1/videos/unuploaded?search='+search)
    }
    paginateInNotUploadedVideos(page_number){
        return axios.get('/v1/videos/unuploaded?page='+page_number)
    }

    // videos list

    getVideoList(){
        return axios.get('/v1/videos')
    }
    switchStatus(video_id){
        return axios.post('/v1/videos/switch/condition/'+video_id)
    }
    paginateInVideoList(page_number){
        return axios.get('/v1/videos?page='+page_number)
    }
    searchInVideos(search){
        return axios.get('/v1/videos?search='+search)

    }

    // active videos
    getActiveVideos(){
        return axios.get('/v1/videos/actives')
    }
    searchInActiveVideos(search){
        return axios.get('/v1/videos/actives?search='+search)
    }
    paginateInActiveVideos(page_number){
        return axios.get('/v1/videos/actives?page='+page_number)
    }

    // deActive Videos

    getDeActiveVideos(){
        return axios.get('/v1/videos/de-actives')
    }
    searchInDeActiveVideos(search){
        return axios.get('/v1/videos/de-actives?search='+search)
    }
    paginateInDeActiveVideos(page_number){
        return axios.get('/v1/videos/de-actives?page='+page_number)
    }

    // trashes

    getVideoTrashes(){
        return axios.get('/v1/videos/trashed')
    }
    restoreVideos(data){
        return axios.post('/v1/videos/restore',data)
    }
    videosForceDelete(data){
        return axios.post('/v1/videos/force-delete',data)
    }
    searchInTrashedVideos(search){
        return axios.get('/v1/videos/trashed?search='+search)
    }
    paginateInVideoTrashes(page_number){
        return axios.get('/v1/videos/trashed?page='+page_number)
    }


    // single videos
    getSingleVideos(){
        return axios.get('/v1/videos/single-videos')
    }
    searchInSingleVideos(search){
        return axios.get('/v1/videos/single-videos?search='+search)
    }
    paginateInSingleVideos(page_number){
        return axios.get('/v1/videos/single-videos?page='+page_number)
    }

}
export  default new VideosService()