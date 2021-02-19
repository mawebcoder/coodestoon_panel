const Role=()=>import("@/views/Roles/Role");
const CreateRole=()=>import("@/views/Roles/CreateRole");
const LIst=()=>import("@/views/Roles/LIst");
const  RolesRoutes={
    path:'roles',component:Role,
    children:[
        {
            path:'create',component:CreateRole,name:'role-create'
        },
        {
            path: 'list',component: LIst,name: 'role-list'
        }
    ]
}
export default RolesRoutes;