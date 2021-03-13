import axios from "axios";

class CommentService{


    switchCommentStatus(comment_id){
        return axios.post('/v1/comments/switch-status/'+comment_id)
    }
    deleteComments(data){
        return axios.post('/v1/comments/delete/multi',data)
    }

    // active article comments
    getActiveArticleComments(){
        return axios.get('/v1/comments/actives?target=article')
    }
    paginateInActiveArticleComments(page_number){
        return axios.get('/v1/comments/actives?target=article&page='+page_number)
    }


    // de active article comments

    getDeActiveArticleComments(){
        return axios.get('/v1/comments/de-actives?target=article')
    }
    paginateInDeActiveArticleComments(page_number){
        return axios.get('/v1/comments/de-actives?target=article&page='+page_number)
    }

    // active course comments

    getActiveCourseComments(){
        return axios.get('/v1/comments/actives?target=course')
    }
    paginateInActiveCourseComments(page_number){
        return axios.get('/v1/comments/actives?target=course&page='+page_number)
    }


    //de active course comments

    getDeActiveCourseComments(){
        return axios.get('/v1/comments/de-actives?target=course')
    }
    paginateInDeActiveCourseComments(page_number){
        return axios.get('/v1/comments/de-actives?target=course&page='+page_number)
    }


    // get active video comments
    getActiveVideoComments(){
        return axios.get('/v1/comments/actives?target=video')
    }

    paginateInActiveVideoComments(page_number){
        return axios.get('/v1/comments/actives?target=video&page='+page_number)
    }

    // get de active video comments
    getDeActiveVideoComments(){
        return axios.get('/v1/comments/de-actives?target=video')
    }

    paginateInDeActiveVideoComments(page_number){
        return axios.get('/v1/comments/de-actives?target=video&page='+page_number)
    }


}
export default new CommentService();