import axios from "axios";
class VideosTagService {

    storeVideoTag(data){
        return axios.post('/v1/videos/tags',data)
    }

}
export default new VideosTagService();