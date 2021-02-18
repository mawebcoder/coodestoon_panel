import Role from "@/views/Roles/Role";
import CreateRole from "@/views/Roles/CreateRole";
const  RolesRoutes={
    path:'roles',component:Role,
    children:[
        {
            path:'create',component:CreateRole,name:'role-create'
        }
    ]
}
export default RolesRoutes;