import AuthService from "@/services/Auth/AuthService";
import EditUser from "@/views/users/EditUser";

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
        },
        {
            path: 'edit/:id',
            component: EditUser,
            name: 'users-edit',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default UserRoutes