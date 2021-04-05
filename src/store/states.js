import all_user_section_permissions from "@/store/permissions-values/UserPermissionsValues";
import article_section_permissions from "@/store/permissions-values/ArticleSectionPermissions";
import course_section_permissions from "@/store/permissions-values/CourseSectionPermissions";
import video_section_permissions from "@/store/permissions-values/VideoSectionPermissions";
import all_permission_section_values from "@/store/permissions-values/ACLPermissionsValues";
import comments_section_permissions from "@/store/permissions-values/CommentsSectionPermissions";
import department_section_values from "@/store/permissions-values/DepartmentSectionPermissions";
import discount_section_permissions from "@/store/permissions-values/DiscountSectionPermissions";
const state = {
    loading: false,
    user_profile_image:false,
    pageTitle: '',
    modal_show: false,
    file: null,
    csrfToken:'',
    user:'',
    user_id:'',
    department_section_values,
    discount_section_permissions,
    comments_section_permissions,
    video_section_permissions,
    course_section_permissions,
    article_section_permissions,
    all_user_section_permissions,
    baseUrl: 'http://localhost:8000',
    role: '',
    all_permission_section_values,
    permissions: [],
    user_name: ''
}
export default state