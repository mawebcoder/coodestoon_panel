const Department = () => import('@/views/department/Department')
const CreateDepartment = () => import('@/views/department/CreateDepartment')
const DepartmentRoutes = {
    path: 'departments', component: Department,
    children: [
        {
            path: 'create', component: CreateDepartment, name: 'department-create'
        }
    ]
}

export default DepartmentRoutes;