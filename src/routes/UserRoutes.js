const User = () => import('@/views/users/User')
const CreateUser = () => import('@/views/users/CreateUser')
const List = () => import('@/views/users/List')
const UserRoutes = {
    path: 'users', component: User,
    children: [
        {
            path: 'create', component: CreateUser, name: 'users-create'
        },
        {
            path: 'list', component: List, name: 'users-list'
        }
    ]
}
export default UserRoutes