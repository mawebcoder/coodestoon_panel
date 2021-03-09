const Videos=()=>import('@/views/videos/Videos')
const VideoTag=()=>import('@/views/videos/tags/VideoTag')
const CreateVideo=()=>import('@/views/videos/tags/CreateVideoTag')
const VideoRotues = {
    path:'videos',component:Videos,
    children:[
        {
            path:'tags',component:VideoTag,
            children: [
                {
                    path:'create',component:CreateVideo,name:'videos-tag-create'
                }
            ]
        }
    ]
}
export default VideoRotues