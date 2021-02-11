import axios from 'axios'

class ArticleService {


    // tags---------------------tags----------------------
    storeArticleTag(data) {
        return axios.post('/v1/articles/tags', data)
    }

    getListOfTheTags(page_number) {
        return axios.get('/v1/articles/tags?page=' + page_number);
    }

    switchActivation(id, data) {
        return axios.put('/v1/articles/tags/' + id, data)
    }

    updateTag(id, data) {
        return axios.put('/v1/articles/tags/' + id, data)
    }

    search(data) {
        return axios.get('/v1/articles/tags?search=' + data);
    }

    paginateTags(pageNumber) {
        return axios.get('/v1/articles/tags?page=' + pageNumber);
    }

    deleteTags(data) {
        return axios.post('/v1/articles/tags/deleteMultipleArticleTags', data)
    }


    // active tags
    getActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/actives?page=' + pageNumber + '&select_box=true')
    }

    searchInActives(data) {
        return axios.get('/v1/articles/tags/actives?search=' + data)
    }

    paginateActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/actives?page=' + pageNumber)
    }


    // de active tags
    getDeActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/de-actives?page=' + pageNumber)
    }

    paginateDeActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/de-actives?page=' + pageNumber)
    }

    searchInDeActives(data) {
        return axios.get('/v1/articles/tags/de-actives?search=' + data)
    }


    // tags trashes
    getTrashes(pageNumber) {
        return axios.get('/v1/articles/tags/get-Trashed?page=' + pageNumber)
    }

    paginateTrashedTags(pageNumber) {
        return axios.get('/v1/articles/tags/get-Trashed?page=' + pageNumber)
    }

    searchInTrashes(data) {
        return axios.get('/v1/articles/tags/get-Trashed?search=' + data)
    }

    forceDeleteTags(data) {
        return axios.post('/v1/articles/tags/force-delete', data)
    }

    restoreTags(data) {
        return axios.post('/v1/articles/tags/restore', data)
    }


    // categories-------------------------------------categories--------------categories---

    getAllCategories(isForSelect = false) {
        if (isForSelect) {
            return axios.get('/v1/articles/categories/actives?select_box=true')
        }
        return axios.get('/v1/articles/categories/actives')
    }

    storeArticleCategory(data) {
        return axios.post('/v1/articles/categories', data)
    }

    getListOfTheArticleCategories(pageNumber) {
        return axios.get('/v1/articles/categories?page=' + pageNumber)
    }

    deleteArticleCategories(data) {
        return axios.post('/v1/articles/categories/deleteMultipleArticleCategory', data);
    }

    switchArticleCategoryStatus(id, data) {
        return axios.post('/v1/articles/categories/' + id, data)
    }

    paginateArticleCategories(pageNumber) {
        return axios.get('/v1/articles/categories?page=' + pageNumber)
    }

    searchInArticleCategories(search_value) {
        return axios.get('/v1/articles/categories?search=' + search_value)
    }

    editArticleCategory(id) {
        return axios.get('/v1/articles/categories/edit/' + id)
    }

    UpdateArticleCategory(id, data) {
        return axios.post('/v1/articles/categories/' + id, data)
    }

    getListOfTheActiveArticleCategories() {
        return axios.get('/v1/articles/categories/actives')
    }

    paginateActiveArticleCategories(pageNumber) {
        return axios.get('/v1/articles/categories/de-actives?page=' + pageNumber)
    }

    searchInActiveArticleCategories(search_value) {
        return axios.get('/v1/articles/categories/actives?search=' + search_value)
    }


    getListOfTheDeActiveArticleCategories() {
        return axios.get('/v1/articles/categories/de-actives')
    }

    paginateDeActiveArticleCategories(pageNumber) {
        return axios.get('/v1/articles/categories/actives?page=' + pageNumber)
    }

    searchInDeActiveArticleCategories(search_value) {
        return axios.get('/v1/articles/categories/de-actives?search=' + search_value)
    }


    getListOfTheTrashesArticleCategories() {
        return axios.get('/v1/articles/categories/trashed')
    }

    paginateTrashesArticleCategories(pageNumber) {
        return axios.get('/v1/articles/categories/trashed?page=' + pageNumber)
    }

    searchInTrashesArticleCategories(search_value) {
        return axios.get('/v1/articles/categories/trashed?search=' + search_value)
    }

    forceDeleteArticleCategory(data) {
        return axios.post('/v1/articles/categories/force-delete', data)
    }

    restoreArticleCategories(data) {
        return axios.post('/v1/articles/cat/restore', data)
    }


    // Article

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