import AuthService from "@/services/Auth/AuthService";

const Videos = () => import('@/views/videos/Videos')
const VideoTag = () => import('@/views/videos/tags/VideoTag')
const CreateVideoTag = () => import('@/views/videos/tags/CreateVideoTag')
const VideoTagList = () => import('@/views/videos/tags/VideoTagList')
const ActiveVideoTag = () => import('@/views/videos/tags/ActiveVideoTag')
const DeActiveVideoTags = () => import('@/views/videos/tags/DeActiveVideoTags')
const CreateVideo = () => import('@/views/videos/CreateVideo')
const UploadVideo = () => import('@/views/videos/UploadVideo')
const NotUploaded = () => import('@/views/videos/NotUploaded')
const VideoList = () => import('@/views/videos/VideoList')
const ActiveVideo = () => import('@/views/videos/ActiveVideo')
const DeActiveVideo = () => import('@/views/videos/DeActiveVideo')
const VideoTrash = () => import('@/views/videos/VideoTrash')
const SingleVideoList = () => import('@/views/videos/SingleVideoList')
const EditVideo = () => import('@/views/videos/EditVideo')
const VideoRotues = {
    path: 'videos', component: Videos,
    beforeEnter: (to, from, next) => {
        AuthService.checkLogin(next)
    },
    children: [
        {
            path: 'tags', component: VideoTag,
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
            children: [
                {
                    path: 'create', component: CreateVideoTag, name: 'videos-tag-create',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'list', component: VideoTagList, name: 'video-tag-list',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'actives', component: ActiveVideoTag, name: 'video-tag-actives',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                },
                {
                    path: 'deactives', component: DeActiveVideoTags, name: 'video-tag-deactives',
                    beforeEnter: (to, from, next) => {
                        AuthService.checkLogin(next)
                    },
                }
            ],
        },
        {
            path: 'create', component: CreateVideo, name: 'video-store',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'upload/:id', component: UploadVideo, name: 'video-upload',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'not-uploaded', component: NotUploaded, name: 'video-notuploaded',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'list', component: VideoList, name: "video-list",
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'actives', component: ActiveVideo, name: 'video-active',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'de-actives', component: DeActiveVideo, name: 'video-deactive',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'trashes', component: VideoTrash, name: 'video-trash',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'singles', component: SingleVideoList, name: 'video-single',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        },
        {
            path: 'edit/:id', component: EditVideo, name: 'video-edit',
            beforeEnter: (to, from, next) => {
                AuthService.checkLogin(next)
            },
        }
    ]
}
export default VideoRotues