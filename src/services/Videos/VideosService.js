import axios from "axios";

class VideosService {
    storeVideo(data) {
        return axios.post('/v1/videos',data)
    }


}
export  default new VideosService()