const Course=()=>import("@/views/course/Course");
const CourseTag=()=> import("@/views/course/tag/CourseTag");
const CreateCourseTag=()=>import("@/views/course/tag/CreateCourseTag");
const CourseTagList=()=>import('../views/course/tag/List')
const ActiveTag=()=>import('@/views/course/tag/ActiveTag')
const DeActiveCourseTag=()=>import('@/views/course/tag/DeActiveCourseTag')
const CourseRoutes={
    path:'/panel/courses',component:Course,
    children:[
        {
            path:'tags',component: CourseTag,
            children: [
                {
                    path: 'create',component: CreateCourseTag,name:'course-tag-create'
                },
                {
                    path: 'list',component:CourseTagList,name: 'course-tag-list'
                },
                {
                    path: 'actives',component:ActiveTag,name: 'course-tag-active'
                },
                {
                    path: 'de-actives',component:DeActiveCourseTag,name: 'course-tag-de-active'
                }
            ]
        }
    ]
}
export default CourseRoutes