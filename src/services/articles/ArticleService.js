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
        return axios.get('/v1/articles/tags/actives?page=' + pageNumber)
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

}

export default new ArticleService();