<template>
    <div>
        <aside>
            <div class="user_profile_info">
                <div class="profile_image">
                    <img src="@/assets/avatars/profile_avatar.jpg" alt="" id="avatar_image">
                </div>
                <div class="user_info_section">
                    <p class="user_name">
                        محمد امیری اسطلخ جانی
                    </p>
                    <p class="user_role">
                        مدیر سیستم
                    </p>
                </div>
            </div>
            <ul id="sidebar_ul">

                <!--                blogs-->
                <li>
                    <span @click="subone=!subone,openerone=!openerone" class="sidebar_opener">
                        <box-icon color="#596860" name='library'></box-icon>
                        <p class="top_title">مقالات</p>
                        <transition name="subone" mode="out-in">
                             <span v-if="subone" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
                    <transition name="openerone" mode="in-out">
                        <ul v-if="openerone" class="sidebar_ul_level_2">
                            <li class="li_title">
                                دسته بندی ها
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-create'}">ایجاد دسته بندی</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-list'}"> لیست دسته بندی ها</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-active'}">دسته بندی های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-deactive'}">دسته بندی های غیر فعال
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-trash'}">دسته های حذف شده</router-link>
                            </li>
                            <li class="li_title">
                                تگ ها
                            </li>
                            <li>
                                <router-link :to="{name:'article-tag-create'}">ایجاد تگ</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-tag-list'}">لیست تگ ها</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-tags-active'}">لیست تگ های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-tags-de-active'}">لیست تگ غیر فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-tags-trashes'}">تگ های حذف شده</router-link>
                            </li>
                            <li class="li_title">
                                مقالات
                            </li>
                            <li>
                                <router-link :to="{name:'article-store'}">ایجاد مقاله</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-list'}">لیست مقالات</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-actives'}"> لیست مقالات فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-de-actives'}"> لیست مقالات غیر فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">مقالات حذف شده</router-link>
                            </li>
                        </ul>
                    </transition>

                </li>

                <!--                course-->
                <li>
                    <span @click="subtwo=!subtwo,openertwo=!openertwo" class="sidebar_opener">
                        <box-icon color="#596860" name='library'></box-icon>
                        <p class="top_title">دوره ها</p>
                        <transition name="subtwo" mode="out-in">
                             <span v-if="subtwo" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
                    <transition name="openertwo" mode="in-out">
                        <ul v-if="openertwo" class="sidebar_ul_level_2">
                            <li class="li_title">
                                دسته بندی ها
                            </li>
                            <li>
                                <router-link :to="{name:'course-category-store'}">ایجاد دسته بندی</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-list'}"> لیست دسته بندی ها</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-active'}">دسته بندی های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-deactive'}">دسته بندی های غیر فعال
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-category-trash'}">دسته های حذف شده</router-link>
                            </li>
                            <li class="li_title">
                                تگ ها
                            </li>
                            <li>
                                <router-link :to="{name:'course-tag-create'}">ایجاد تگ</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'course-tag-list'}">لیست تگ ها</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'course-tag-active'}">لیست تگ های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'course-tag-de-active'}">لیست تگ غیر فعال</router-link>
                            </li>
                            <li class="li_title">
                                فصل بندی ها
                            </li>
                            <li>
                                <router-link :to="{name:'article-store'}">ایجاد فصل جدید</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-list'}">لیست تمام فصل ها</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-actives'}"> لیست فصل های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-de-actives'}"> لیست فصل های غیر فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">فصول حذف شده</router-link>
                            </li>
                            <li class="li_title">
                                دوره ها
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">ایجاد دوره جدید</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">لیست تمام دوره ها</router-link>
                            </li>
                             <li>
                                <router-link :to="{name:'article-trashes'}">دوره های فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">دوره های غیر فعال</router-link>
                            </li>
                            <li>
                                <router-link :to="{name:'article-trashes'}">دوره های حذف شده</router-link>
                            </li>

                        </ul>
                    </transition>

                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                subone: true,
                openerone: false,
                subtwo: true,
                openertwo: false
            }
        }
    }
</script>

<style scoped lang="scss">
    aside {
        background-color: #fff;
        min-height: 100px;
        box-shadow: 0 0 5px rgba(116, 131, 123, 0.91);
        border-radius: 4px;
        padding: 10px;
    }

    .user_profile_info {
        height: 200px;

        .profile_image {
            height: 120px;
            margin: 0 auto;
            width: 120px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;
            background-color: #fff;

            img {
                width: 90%;
                height: 90%;
                border-radius: 100%;
            }
        }

        .user_name {
            color: rgba(41, 46, 42, 0.91);
            font-weight: bold;
            font-size: .9em;
            text-align: center;
            margin-top: 5px;
        }

        .user_role {
            color: rgba(41, 46, 42, 0.91);
            text-align: center;
            font-size: .8em;
        }
    }

    #sidebar_ul {
        min-height: 100px;

        > li {
            min-height: 50px;

            .sidebar_opener {
                height: 50px;
                display: block;
                margin-top: 5px;
                transition: .5s;
                cursor: pointer;
                border-radius: 5px;
                line-height: 66px;
                padding-right: 8px;
                position: relative;
                background-color: rgba(157, 174, 166, 0.4);
                margin-bottom: 5px;

                .down_arrow {
                    position: absolute;
                    left: 5px;
                    top: -3px;
                    transition: .1s;

                }

                .up_arrow {
                    position: absolute;
                    left: 5px;
                    top: -3px;
                    transition: .1s;
                }

                &:hover {
                    .top_title {
                        color: #000;
                    }

                    box-shadow: 0 0 4px rgba(89, 99, 94, 0.76);
                }


            }
        }
    }

    .top_title {
        display: inline-block;
        position: relative;
        bottom: 5px;
        right: 10px;
        color: rgba(28, 31, 29, 0.74);
    }

    .sidebar_ul_level_2 {
        max-height: 1000px;
        border-radius: 4px;
        transition: .5s;
        overflow: hidden;
        padding-top: 5px;
        border: 1px solid rgba(27, 30, 29, 0.3);

        > li {
            height: 40px;
            padding-right: 10px;
            border-radius: 4px;

            > a {
                height: 100%;
                width: 100%;
                line-height: 48px;
                color: rgba(27, 30, 29, 0.85);
                font-size: .9em;
                display: block;
                transition: .1s;

            }

            &:hover a {
                color: red;
                transform: translateX(-5px);
            }
        }
    }

    /*blogs*/
    .subone-enter {
        opacity: .4;
        transform: translateY(-5px);
    }

    subone-leave-active {
        opacity: 1;
        transform: translateY(0);
    }

    .openerone-enter {
        max-height: 0;
    }

    .openerone-leave-active {
        max-height: 0;
    }


    /*course*/
    .subtwo-enter {
        opacity: .4;
        transform: translateY(-5px);
    }

    subtwo-leave-active {
        opacity: 1;
        transform: translateY(0);
    }

    .openertwo-enter {
        max-height: 0;
    }

    .openertwo-leave-active {
        max-height: 0;
    }

    .li_title {
        font-weight: bold;
        font-size: .9em;
        color: orange;
        line-height: 50px;

    }
</style>