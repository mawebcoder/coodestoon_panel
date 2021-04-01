import AuthService from "@/services/Auth/AuthService";
import EditUser from "@/views/users/EditUser";
const TeacherList=()=>import('@/views/users/teachers/TeacherList')
const AdminList = () => import('@/views/users/AdminList')
const User = () => import('@/views/users/User')
const CreateUser = () => import('@/views/users/CreateUser')
const List = () => import('@/views/users/List')
const EditAdmin = () => import('@/views/users/EditAdmin')
const EditTeacher=()=>import('@/views/users/teachers/EditTeacher')
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


        },
        {
            path: 'admin/list', component: AdminList, name: "users-admin-list",
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'admin/edit/:id', component: EditAdmin, name: 'users-admin-edit',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path:'teachers/list',component:TeacherList,name:'users-teachers-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path:'teachers/edit/:teacher_id',component:EditTeacher,name:'users-teachers-edit',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }

    ]
}
export default UserRoutes