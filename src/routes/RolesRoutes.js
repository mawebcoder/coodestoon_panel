import AuthService from "@/services/Auth/AuthService";

const Role = () => import("@/views/Roles/Role");
const CreateRole = () => import("@/views/Roles/CreateRole");
const LIst = () => import("@/views/Roles/LIst");
const AssignPermissions = () => import('@/views/Roles/AssignPermission')
const RolesRoutes = {
    path: 'roles', component: Role,
    beforeEnter: (to, from, next) => {
        AuthService.checkLogin(next)
    },
    children: [
        {
            path: 'create', component: CreateRole, name: 'role-create',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: LIst, name: 'role-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'assign-permissions', component: AssignPermissions, name: 'assign-permissions',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default RolesRoutes;