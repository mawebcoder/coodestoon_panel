const Department = () => import('@/views/department/Department')
const CreateDepartment = () => import('@/views/department/CreateDepartment')
const AssignUserToDepartment=()=>import('@/views/department/AssingUserToDepartment')
const DepartmentRoutes = {
    path: 'departments', component: Department,
    children: [
        {
            path: 'create', component: CreateDepartment, name: 'department-create'
        },
        {
            path: 'assign-user',component:AssignUserToDepartment,name:'department-assign-user'
        }
    ]
}

export default DepartmentRoutes;