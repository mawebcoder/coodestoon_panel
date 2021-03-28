import axios from "axios";

class DiscountService {

    storeNewDiscount(data) {
        return axios.post('/v1/discounts', data)
    }

    generateRandomCodes(data) {
        return axios.post('/v1/discounts/random-generate', data)
    }

    getListOfTheDiscounts() {
        return axios.get('/v1/discounts')
    }

    switchCondition(id) {
        return axios.post('v1/discounts/switch-condition/' + id)
    }

    deleteDiscounts(data) {
        return axios.post('/v1/discounts/delete', data)
    }

    paginate(page_number) {
        return axios.get('/v1/discounts?page=' + page_number)
    }

    updateDiscount(discount_id, data) {
        return axios.put('/v1/discounts/' + discount_id, data)
    }

    SearchInCodes(search) {
        return axios.get('/v1/discounts?search='+search)
    }
}

export default new DiscountService();