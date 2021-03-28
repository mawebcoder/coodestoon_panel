const Discount=()=>import('@/views/discounts/Discount')
const CreateDiscount=()=>import('@/views/discounts/CreateDiscount')
const DiscountList=()=>import('@/views/discounts/DiscountsList')
const DiscountRoutes={
    path:'discounts',
    component:Discount,
    children:[
        {
            path:'create',component:CreateDiscount,name:'discount-create'
        },
        {
            path:'list',component:DiscountList,name:'discount-list'
        }
    ]
}
export default DiscountRoutes;