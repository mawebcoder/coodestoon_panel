import axios from 'axios'

class TicketService {

    getListOfTheTickets(){
        return axios.get('/v1/tickets')
    }

    searchInTicketList(search){
        return axios.get('/v1/tickets?search='+search)
    }
    paginateInTicketList(page_number){
        return axios.get('/v1/tickets?page='+page_number)
    }
    softDeleteTickets(data){
        return axios.post('/v1/tickets/softDelete',data)
    }
}
export  default new TicketService();