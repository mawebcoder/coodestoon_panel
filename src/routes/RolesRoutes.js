const Role=()=>import("@/views/Roles/Role");
const CreateRole=()=>import("@/views/Roles/CreateRole");
const LIst=()=>import("@/views/Roles/LIst");
const AssignPermissions=()=>import('@/views/Roles/AssignPermission')
const  RolesRoutes={
    path:'roles',component:Role,
    children:[
        {
            path:'create',component:CreateRole,name:'role-create'
        },
        {
            path: 'list',component: LIst,name: 'role-list'
        },
        {
            path:'assign-permissions',component:AssignPermissions,name: 'assign-permissions'
        }
    ]
}
export default RolesRoutes;