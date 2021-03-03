const Course = () => import("@/views/course/Course");
const CourseTag = () => import("@/views/course/tag/CourseTag");
const CreateCourseTag = () => import("@/views/course/tag/CreateCourseTag");
const CourseTagList = () => import('../views/course/tag/List')
const ActiveTag = () => import('@/views/course/tag/ActiveTag')
const DeActiveCourseTag = () => import('@/views/course/tag/DeActiveCourseTag')
const Category = () => import('@/views/course/category/Category')
const StoreCourseCategory = () => import('@/views/course/category/StoreCourseCategory')
const CourseCategoryList = () => import('@/views/course/category/CourseCategoryList')
const EditCourseCategory = () => import('@/views/course/category/Edit')
const CourseCategoryTrash = () => import('@/views/course/category/CourseCategoryTrashes')
const AcitiveCourseCategory = () => import('@/views/course/category/ActiveCourseCategory');
const DeActiveCourseCategory = () => import('@/views/course/category/DeAcgiveCourseCategory')
const CreateCourse = () => import('@/views/course/CreateCourse');
const CourseRoutes = {
    path: 'courses', component: Course,
    children: [
        // tags
        {
            path: 'tags', component: CourseTag,
            children: [
                {
                    path: 'create', component: CreateCourseTag, name: 'course-tag-create'
                },
                {
                    path: 'list', component: CourseTagList, name: 'course-tag-list'
                },
                {
                    path: 'actives', component: ActiveTag, name: 'course-tag-active'
                },
                {
                    path: 'de-actives', component: DeActiveCourseTag, name: 'course-tag-de-active'
                }
            ]
        },
        // categories
        {
            path: 'categories', component: Category,
            children: [
                {
                    path: 'store', component: StoreCourseCategory, name: 'course-category-store'
                },
                {
                    path: 'list', component: CourseCategoryList, name: 'course-category-list'
                },
                {
                    path: 'edit/:courseCategory_id', component: EditCourseCategory, name: 'course-category-edit'
                },
                {
                    path: 'actives', component: AcitiveCourseCategory, name: 'course-category-active'
                },
                {
                    path: 'de-actives', component: DeActiveCourseCategory, name: 'course-category-de-active'
                },
                {
                    path: 'trashed', component: CourseCategoryTrash, name: 'course-category-trash'
                }
            ]
        },
        {
            path: 'create', component: CreateCourse, name: 'course-create'
        },
    ]

}
export default CourseRoutes