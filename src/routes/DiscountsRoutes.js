import AuthService from "@/services/Auth/AuthService";

const Discount = () => import('@/views/discounts/Discount')
const CreateDiscount = () => import('@/views/discounts/CreateDiscount')
const DiscountList = () => import('@/views/discounts/DiscountsList')
const DiscountRoutes = {
    path: 'discounts',
    component: Discount,
    children: [
        {
            path: 'create', component: CreateDiscount, name: 'discount-create',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: DiscountList, name: 'discount-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default DiscountRoutes;