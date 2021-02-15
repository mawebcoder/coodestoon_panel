import axios from "axios";

class TagService {

    // store article tag in server
    storeArticleTag(data) {
        return axios.post('/v1/articles/tags', data)
    }

    // get list of the all tags from serve
    getListOfTheTags(page_number) {
        return axios.get('/v1/articles/tags?page=' + page_number);
    }

    // change status condition of the tag
    switchActivation(id, data) {
        return axios.put('/v1/articles/tags/' + id, data)
    }

    // update the tag in the serve
    updateTag(id, data) {
        return axios.put('/v1/articles/tags/' + id, data)
    }

    // search between all article tags base on the fa-title and en_title
    search(data) {
        return axios.get('/v1/articles/tags?search=' + data);
    }

    // paginating
    paginateTags(pageNumber) {
        return axios.get('/v1/articles/tags?page=' + pageNumber);
    }

    // delete multi tag
    deleteTags(data) {
        return axios.post('/v1/articles/tags/deleteMultipleArticleTags', data)
    }


    // active tags
    getActiveTags() {
        return axios.get('/v1/articles/tags/actives')
    }

    // search in active tags
    searchInActives(data) {
        return axios.get('/v1/articles/tags/actives?search=' + data)
    }

    // paginate in active tags
    paginateActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/actives?page=' + pageNumber)
    }


    // de active tags
    getDeActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/de-actives?page=' + pageNumber)
    }

    // paginate in de active tags
    paginateDeActiveTags(pageNumber) {
        return axios.get('/v1/articles/tags/de-actives?page=' + pageNumber)
    }

    // search in de active tags
    searchInDeActives(data) {
        return axios.get('/v1/articles/tags/de-actives?search=' + data)
    }


    // tags trashes
    getTrashes(pageNumber) {
        return axios.get('/v1/articles/tags/get-Trashed?page=' + pageNumber)
    }

    // paginate trashed tags
    paginateTrashedTags(pageNumber) {
        return axios.get('/v1/articles/tags/get-Trashed?page=' + pageNumber)
    }

    // search in trashes
    searchInTrashes(data) {
        return axios.get('/v1/articles/tags/get-Trashed?search=' + data)
    }

    // force delete the soft deleted tags
    forceDeleteTags(data) {
        return axios.post('/v1/articles/tags/force-delete', data)
    }

    // restore the soft deleted tags
    restoreTags(data) {
        return axios.post('/v1/articles/tags/restore', data)
    }
}

export default new TagService();