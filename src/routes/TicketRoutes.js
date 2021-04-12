const Ticket=()=>import('@/views/ticket/Ticket')
const TicketList=()=>import('@/views/ticket/TicketList')
const TicketRoutes={
    path:'tickets',component:Ticket,name:'ticket',
    children:[
        {
            path:'list',component:TicketList,name:'tickets-list'
        }
    ]
}

export default TicketRoutes;