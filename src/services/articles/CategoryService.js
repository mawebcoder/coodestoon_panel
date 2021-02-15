import axios from "axios";

class CategoryService {
    // get all list of the article categories
    getAllCategories(isForSelect = false) {
        if (isForSelect) {
            return axios.get('/v1/articles/categories/actives?select_box=true')
        }
        return axios.get('/v1/articles/categories/actives')
    }

    // store new Article CAtegory in server
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


}
export default new CategoryService()