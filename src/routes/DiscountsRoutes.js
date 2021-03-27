const Discount=()=>import('@/views/discounts/Discount')
const CreateDiscount=()=>import('@/views/discounts/CreateDiscount')
const DiscountRoutes={
    path:'discounts',
    component:Discount,
    children:[
        {
            path:'create',component:CreateDiscount,name:'discount-create'
        }
    ]
}
export default DiscountRoutes;