<template>
  <div>
    <aside id="panel_side_bar">
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

        <!--        Users-->
        <li>
                    <span @click="subFour=!subFour,openerFour=!openerFour" class="sidebar_opener">
                        <box-icon type='solid' color="#596860" name='user-circle'></box-icon>
                        <p class="top_title">مدیریت کاربران</p>
                        <transition name="subFour" mode="out-in">
                             <span v-if="subFour" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
          <transition name="openerFour" mode="in-out">
            <ul v-show="openerFour" class="sidebar_ul_level_2">

              <li>
                <router-link :to="{name:'users-create'}">ایجاد کاربر جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'users-list'}"> لیست کاربران</router-link>
              </li>
              <li>
                <router-link :to="{name:'article-category-deactive'}">لیست مدیران
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'article-category-deactive'}">لیست مدرسین
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'article-category-deactive'}">لیست مدرسین فعال
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'article-category-deactive'}">لیست مدرسین غیر فعال
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'article-category-deactive'}">لیست کاربران حذف شده
                </router-link>
              </li>
            </ul>
          </transition>

        </li>


        <!--        ACL-->
        <li>
                    <span @click="subthree=!subthree,openerthree=!openerthree" class="sidebar_opener">
                        <box-icon type='solid' color="#596860" name='lock'></box-icon>
                        <p class="top_title">سطوح دسترسی</p>
                        <transition name="subthree" mode="out-in">
                             <span v-if="subthree" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
          <transition name="openerthree" mode="in-out">
            <ul v-show="openerthree" class="sidebar_ul_level_2">
              <li class="li_title">
                نقش ها
              </li>
              <li>
                <router-link :to="{name:'role-create'}">ایجاد نقش جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'role-list'}"> لیست نقش ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'assign-permissions'}">تخصیص مجوز به نقش ها
                </router-link>
              </li>
            </ul>
          </transition>

        </li>

        <!--                blogs-->
        <li>
                    <span @click="subone=!subone,openerone=!openerone" class="sidebar_opener">
                        <box-icon type='solid' color="#596860" name='book-alt'></box-icon>
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
                        <box-icon color="#596860" type='solid' name='camera-movie'></box-icon>
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
            <ul v-show="openertwo" class="sidebar_ul_level_2">
              <li class="li_title">
                دسته بندی ها
              </li>
              <li>
                <router-link :to="{name:'course-category-store'}">ایجاد دسته بندی</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-category-list'}"> لیست دسته بندی ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-category-active'}">دسته بندی های فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-category-de-active'}">دسته بندی های غیر فعال
                </router-link>
              </li>
              <li>
                <router-link :to="{name:'course-category-trash'}">دسته های حذف شده</router-link>
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
                <router-link :to="{name:'course-section-create'}">ایجاد فصل جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-section-list'}">لیست تمام فصل ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-section-active'}"> لیست فصل های فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-section-deactive'}"> لیست فصل های غیر فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-section-trashes'}">فصول حذف شده</router-link>
              </li>
              <li class="li_title">
                دوره ها
              </li>
              <li>
                <router-link :to="{name:'course-create'}">ایجاد دوره جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-list'}">لیست تمام دوره ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-actives'}">دوره های فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-deactives'}">دوره های غیر فعال</router-link>
              </li>
              <li>
                <router-link tag="a" :to="{name:'course-trash'}">دوره های حذف شده</router-link>
              </li>

            </ul>
          </transition>

        </li>


        <!--        videos-->

        <li>
                    <span @click="subFive=!subFive,openerFive=!openerFive" class="sidebar_opener">
                      <box-icon color="#596860" type='solid' name='movie-play'></box-icon>
                        <p class="top_title">ویدیوها</p>
                        <transition name="subtwo" mode="out-in">
                             <span v-if="subFive" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
          <transition name="openertwo" mode="in-out">
            <ul v-show="openerFive" class="sidebar_ul_level_2">
              <li class="li_title">
                تگ ها
              </li>
              <li>
                <router-link :to="{name:'videos-tag-create'}">ایجاد تگ جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-tag-list'}"> لیست تمام تگ ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-tag-actives'}"> لیست تگ های فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-tag-deactives'}"> لیست تگ های غیر فعال</router-link>
              </li>
              <li class="li_title">
                ویدیو ها
              </li>
              <li>
                <router-link :to="{name:'video-store'}"> ایجاد قسمت جدید</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-notuploaded'}">قسمت های آپلود نشده</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-list'}">لیست ویدیو ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-active'}">لیست قسمت های فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-deactive'}">لیست قسمت های غیر فعال</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-single'}">لیست تک ویدیو ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-trash'}">سطل زباله ویدیو ها</router-link>
              </li>
            </ul>
          </transition>

        </li>


        <!--        comments-->


        <li>
                    <span @click="subSix=!subSix,openerSix=!openerSix" class="sidebar_opener">
                      <box-icon color="#596860" name='comment-detail'></box-icon>
                      <p class="top_title">نظرات</p>
                        <transition name="subtwo" mode="out-in">
                             <span v-if="subSix" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
          <transition name="openertwo" mode="in-out">
            <ul v-show="openerSix" class="sidebar_ul_level_2">
              <li>
                <router-link :to="{name:'article-comments-un-accepted'}"> نظرات تایید نشده مقالات</router-link>
              </li>
              <li>
                <router-link :to="{name:'article-comments-accepted'}"> نظرات تایید شده مقالات</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-comments-unaccepted'}"> نظرات تایید نشده ویدیو ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'video-comments-accepted'}"> نظرات تایید شده ویدیو ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-comments-un-accepted'}"> نظرات تایید نشده دوره ها</router-link>
              </li>
              <li>
                <router-link :to="{name:'course-comment-accepted'}"> نظرات تایید شده دوره ها</router-link>
              </li>
            </ul>
          </transition>

        </li>


<!--        discounts-->
        <li>
                    <span @click="subSeven=!subSeven,openerSeven=!openerSeven" class="sidebar_opener">
                      <box-icon color="#596860" name='comment-detail'></box-icon>
                      <p class="top_title">کدهای تخفیف</p>
                        <transition name="subSeven" mode="out-in">
                             <span v-if="subSeven" :key="0" class="down_arrow">
                                     <box-icon size="xs" color="#596860" type='solid' name='down-arrow'></box-icon>
                                 </span>
                             <span v-else :key="1" class="up_arrow">
                           <box-icon size="xs" color="#596860" name='up-arrow' type='solid'></box-icon>
                         </span>
                        </transition>

                    </span>
          <transition name="openerSeven" mode="in-out">
            <ul v-show="openerSeven" class="sidebar_ul_level_2">
              <li>
                <router-link :to="{name:'article-comments-un-accepted'}">ایجاد کد تخفیف</router-link>
              </li>
              <li>
                <router-link :to="{name:'article-comments-accepted'}">لیست کدهای تخفیف</router-link>
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
      openertwo: false,
      subthree: true,
      openerthree: false,
      subFour: true,
      openerFour: false,
      subFive: true,
      openerFive: false,
      subSix: true,
      openerSix: false,
      subSeven:false,
      openerSeven:false
    }
  },
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

.router-link-exact-active {
  color: red !important;
  transform: scale(1.09);
  background-color: #fff;
  box-shadow: 0 0 4px #000;
  padding-right: 10px;
  line-height: 36px;
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
    position: relative;

    span {
      position: absolute;
      z-index: 2;
      left: 3px;
      font-size: .8em;
      line-height: 25px;
      text-align: center;
      top: 10px;
    }

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


.subthree-enter {
  opacity: .4;
  transform: translateY(-5px);
}

subthree-leave-active {
  opacity: 1;
  transform: translateY(0);
}

.openerthree-enter {
  max-height: 0;
}

.openerthree-leave-active {
  max-height: 0;
}

/*from here*/

.subFour-enter {
  opacity: .4;
  transform: translateY(-5px);
}

subFour-leave-active {
  opacity: 1;
  transform: translateY(0);
}

//five
.subFive-enter {
  opacity: .4;
  transform: translateY(-5px);
}

subFive-leave-active {
  opacity: 1;
  transform: translateY(0);
}

.openerFive-enter {
  max-height: 0;
}

.openerFive-leave-active {
  max-height: 0;
}


//six

.subSix-enter {
  opacity: .4;
  transform: translateY(-5px);
}

subSix-leave-active {
  opacity: 1;
  transform: translateY(0);
}

.openerSix-enter {
  max-height: 0;
}

.openerSix-leave-active {
  max-height: 0;
}

//seven
.subSeven-enter {
  opacity: .4;
  transform: translateY(-5px);
}

subSeven-leave-active {
  opacity: 1;
  transform: translateY(0);
}

.openerSeven-enter {
  max-height: 0;
}

.openerSeven-leave-active {
  max-height: 0;
}


.li_title {
  font-weight: bold;
  font-size: .9em;
  color: orange;
  line-height: 50px;

}
</style>