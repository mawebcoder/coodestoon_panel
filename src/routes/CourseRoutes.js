import AuthService from "@/services/Auth/AuthService";

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
const CourseList = () => import('@/views/course/CourseList')
const Edit = () => import('@/views/course/Edit')
const ActiveCourse = () => import('@/views/course/ActiveCourse')
const DeActives = () => import('@/views/course/DeActiveCourse')
const Trash = () => import('@/views/course/Trash')
const CreateCourseSection = () => import('@/views/course/sections/CreateCourseSection')
const CourseSection = () => import('@/views/course/sections/CourseSection')
const CourseSectionList = () => import('@/views/course/sections/CourseSectionList')
const EditCourseSection = () => import('@/views/course/sections/EditCourseSection')
const ActiveCourseSection = () => import('@/views/course/sections/ActiveCourseSection')
const DeActiveCourseSection = () => import('@/views/course/sections/DeActiveCourseSection')
const TrashedCourseSection = () => import('@/views/course/sections/Trash')
const CourseRoutes = {
    path: 'courses', component: Course,

    children: [
        // tags
        {
            path: 'tags', component: CourseTag,
            children: [
                {
                    path: 'create', component: CreateCourseTag, name: 'course-tag-create',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: CourseTagList, name: 'course-tag-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveTag, name: 'course-tag-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'de-actives', component: DeActiveCourseTag, name: 'course-tag-de-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }
            ]
        },
        // categories
        {
            path: 'categories', component: Category,
            children: [
                {
                    path: 'store', component: StoreCourseCategory, name: 'course-category-store',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: CourseCategoryList, name: 'course-category-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'edit/:courseCategory_id', component: EditCourseCategory, name: 'course-category-edit',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: AcitiveCourseCategory, name: 'course-category-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'de-actives', component: DeActiveCourseCategory, name: 'course-category-de-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'trashed', component: CourseCategoryTrash, name: 'course-category-trash',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }
            ]
        },
        {
            path: 'sections', component: CourseSection,
            children: [
                {
                    path: 'create', component: CreateCourseSection, name: 'course-section-create',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: CourseSectionList, name: 'course-section-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'edit/:id', component: EditCourseSection, name: 'course-section-edit',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveCourseSection, name: 'course-section-active',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'deactives', component: DeActiveCourseSection, name: 'course-section-deactive',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'trashes', component: TrashedCourseSection, name: 'course-section-trashes',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }
            ]
        },
        {
            path: 'create', component: CreateCourse, name: 'course-create',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: CourseList, name: 'course-list',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'edit/:id', component: Edit, name: 'course-edit',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'actives', component: ActiveCourse, name: 'course-actives',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'deactives', component: DeActives, name: 'course-deactives',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'trashes', component: Trash, name: 'course-trash',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]

}
export default CourseRoutes