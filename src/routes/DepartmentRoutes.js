const Department = () => import('@/views/department/Department')
const CreateDepartment = () => import('@/views/department/CreateDepartment')
const AssignUserToDepartment=()=>import('@/views/department/AssingUserToDepartment')
const DepartmentList=()=>import('@/views/department/DepartmentsList')
const DepartmentRoutes = {
    path: 'departments', component: Department,
    children: [
        {
            path: 'create', component: CreateDepartment, name: 'department-create'
        },
        {
            path: 'assign-user',component:AssignUserToDepartment,name:'department-assign-user'
        },
        {
            path: 'list',component:DepartmentList,name:'department-list'
        }
    ]
}

export default DepartmentRoutes;