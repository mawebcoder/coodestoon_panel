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
    getTicketInformation(ticket_id){
        return axios.get('/v1/tickets/original-children-tickets/'+ticket_id)
    }
    answerTicket(data){
        return axios.post('/v1/tickets',data)
    }

    getNotAnsweredTickets(){
        return axios.get('/v1/tickets/not-answered')
    }
    paginateInUnAnsweredTickets(page_number){
        return axios.get('/v1/tickets/not-answered?page='+page_number)

    }
}
export  default new TicketService();