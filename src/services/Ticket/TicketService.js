import axios from 'axios'

class TicketService {

    getListOfTheTickets(){
        return axios.get('/v1/tickets')
    }
}
export  default new TicketService();