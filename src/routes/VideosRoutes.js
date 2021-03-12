const Videos = () => import('@/views/videos/Videos')
const VideoTag = () => import('@/views/videos/tags/VideoTag')
const CreateVideoTag = () => import('@/views/videos/tags/CreateVideoTag')
const VideoTagList = () => import('@/views/videos/tags/VideoTagList')
const ActiveVideoTag = () => import('@/views/videos/tags/ActiveVideoTag')
const DeActiveVideoTags = () => import('@/views/videos/tags/DeActiveVideoTags')
const CreateVideo = () => import('@/views/videos/CreateVideo')
const UploadVideo=()=>import('@/views/videos/UploadVideo')
const VideoRotues = {
    path: 'videos', component: Videos,
    children: [
        {
            path: 'tags', component: VideoTag,
            children: [
                {
                    path: 'create', component: CreateVideoTag, name: 'videos-tag-create'
                },
                {
                    path: 'list', component: VideoTagList, name: 'video-tag-list'
                },
                {
                    path: 'actives', component: ActiveVideoTag, name: 'video-tag-actives'
                },
                {
                    path: 'deactives', component: DeActiveVideoTags, name: 'video-tag-deactives'
                }
            ],
        },
        {
            path: 'create', component: CreateVideo, name: 'video-store'
        },
        {
            path:'upload/:id',component:UploadVideo,name: 'video-upload'
        }
    ]
}
export default VideoRotues