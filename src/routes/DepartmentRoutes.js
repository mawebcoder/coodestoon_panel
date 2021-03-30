import AuthService from "@/services/Auth/AuthService";

const Department = () => import('@/views/department/Department')
const CreateDepartment = () => import('@/views/department/CreateDepartment')
const AssignUserToDepartment = () => import('@/views/department/AssingUserToDepartment')
const DepartmentList = () => import('@/views/department/DepartmentsList')
const DepartmentRoutes = {
    path: 'departments', component: Department,
    beforeEnter: (to, from, next) => {
        AuthService.checkLogin(next)
    },
    children: [
        {
            path: 'create', component: CreateDepartment, name: 'department-create',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'assign-user', component: AssignUserToDepartment, name: 'department-assign-user',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: DepartmentList, name: 'department-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}

export default DepartmentRoutes;