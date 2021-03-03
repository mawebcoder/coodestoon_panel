import axios from 'axios'
class ArticleService {
    storeArticle(data) {
        return axios.post('/v1/articles', data)
    }

    getArticleList() {
        return axios.get('/v1/articles');
    }

    switchArticleStatus(id, data) {

        return axios.post('/v1/articles/switch-status/' + id, data)
    }

    deleteArticles(data) {
        return axios.post('/v1/articles/delete/multi', data)
    }

    paginateArticles(pageNumber) {
        return axios.get('/v1/articles?page=' + pageNumber);
    }

    searchInArticles(value) {
        return axios.get('/v1/articles?search=' + value);

    }

    getArticleInformation(article_id) {
        return axios.get('/v1/articles/' + article_id + '/edit')
    }

    updateArticle(article_id, data) {
        return axios.post('/v1/articles/update/' + article_id, data)
    }


    getActiveArticles() {
        return axios.get('/v1/articles/actives')
    }

    paginateActiveArticles(pageNumber) {
        return axios.get('/v1/articles/actives?page=' + pageNumber)
    }

    searchInActiveArticles(search_value) {
        return axios.get('/v1/articles/actives?search=' + search_value)
    }

    getDeActiveArticles() {
        return axios.get('/v1/articles/de-actives')
    }

    paginateDeActiveArticles(pageNumber) {
        return axios.get('/v1/articles/de-actives?page=' + pageNumber)
    }

    searchInDeActiveArticles(search_value) {
        return axios.get('/v1/articles/de-actives?search=' + search_value)
    }

    getArticlesTrashes() {
        return axios.get('/v1/articles/trashed')
    }

    paginateTrashedArticles(pageNumber) {
        return axios.get('/v1/articles/trashed?page=' + pageNumber)
    }

    searchInTrashedArticles(search_value) {
        return axios.get('/v1/articles/trashed?search=' + search_value)
    }
    forceDeleteArticles(data){
        return axios.post('/v1/articles/force-delete',data)
    }
    restoreArticles(data){
        return axios.post('/v1/articles/restore',data)
    }
}

export default new ArticleService();