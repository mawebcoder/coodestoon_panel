import AuthService from "@/services/Auth/AuthService";

const User = () => import('@/views/users/User')
const CreateUser = () => import('@/views/users/CreateUser')
const List = () => import('@/views/users/List')
const UserRoutes = {
    path: 'users', component: User,
    children: [
        {
            path: 'create', component: CreateUser, name: 'users-create',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: List, name: 'users-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default UserRoutes