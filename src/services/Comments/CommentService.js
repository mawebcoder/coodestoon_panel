import axios from "axios";

class CommentService{

    getActiveArticleComments(){
        return axios.get('/v1/comments/actives?target=article')
    }
    paginateInActiveArticleComments(page_number){
        return axios.get('/v1/comments/actives?target=article&page='+page_number)
    }
    switchCommentStatus(comment_id){
        return axios.post('/v1/comments/switch-status/'+comment_id)
    }
    deleteComments(data){
        return axios.post('/v1/comments/delete/multi',data)
    }

}
export default new CommentService();