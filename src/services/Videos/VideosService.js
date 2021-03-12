import axios from "axios";

class VideosService {
    storeVideo(data) {
        return axios.post('/v1/videos',data)
    }
    getVideoInformation(video_id){
        return axios.get('/v1/videos/'+video_id+'/edit')
    }


}
export  default new VideosService()