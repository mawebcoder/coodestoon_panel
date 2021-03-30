import store from "@/store/vuex";

class AuthorizationService {

    checkHasPermissions(target_permissions) {

        let has_permission = false;

        target_permissions.forEach(item => {
            if (store.state.permissions.includes(item)) {
                has_permission = true
            }

        })
        return has_permission;
    }
}

export default new AuthorizationService();