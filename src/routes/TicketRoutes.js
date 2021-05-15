import AuthService from "@/services/Auth/AuthService";
const NotAnsweredTicket=()=>import('@/views/ticket/NotAnsweredTickets')
const Ticket=()=>import('@/views/ticket/Ticket')
const TicketPage=()=>import('@/views/ticket/TicketPage')
const TicketList=()=>import('@/views/ticket/TicketList')
const TicketRoutes={
    path:'tickets',component:Ticket,name:'ticket',
    children:[
        {
            path:'list',component:TicketList,name:'tickets-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'content/:ticket_id',component:TicketPage,name:'ticket-page',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },

        },
        {
            path: 'not-answered',name: 'ticket-not-answered',component:NotAnsweredTicket,
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },

        }
    ]
}

export default TicketRoutes;