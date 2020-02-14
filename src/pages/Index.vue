<template>
  <div id="page-container" class="fade page-sidebar-fixed page-header-fixed show"
       :class="{'page-sidebar-minified': !isShowMenu}">
    <!-- begin #header -->
    <div id="header" class="header navbar-default">
      <!-- begin navbar-header -->
      <div class="navbar-header">
        <router-link :to="{
  							name: 'welcome'
  						}" class="navbar-brand">
          <span class="navbar-logo"></span> <b>抖影管理系统</b>
        </router-link>
        <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- end navbar-header -->

      <!-- begin header-nav -->
      <ul class="navbar-nav navbar-right">
        <li class="dropdown navbar-user">
          <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">

            <img v-if="account.cover" :src="account.cover.path" />
            <img v-else src="/resource/assets/img/user/user-13.jpg" alt="" />

            <span class="d-none d-md-inline" v-if="account">{{ account.display_name }}</span>
            <b class="caret"></b>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <router-link class="dropdown-item" :to="{
                    name: 'edit-profile'
                }">个人资料
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="javascript:;" class="dropdown-item" @click="doLogout()">登出</a>
          </div>
        </li>
      </ul>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->

    <!-- begin #sidebar -->
    <div id="sidebar" class="sidebar">
      <!-- begin sidebar scrollbar -->
      <div data-scrollbar="true" data-height="100%">
        <!-- begin sidebar user -->
        <ul class="nav">
          <li class="nav-profile">
            <a href="javascript:;" data-toggle="nav-profile">
              <div class="cover with-shadow"></div>
              <div class="image">

                <img v-if="account.cover" :src="account.cover.path" />
                <img v-else src="/resource/assets/img/user/user-13.jpg" alt="" />

              </div>
              <div class="info" v-if="account">
                {{ account.display_name }}
              </div>
            </a>
          </li>
        </ul>
        <!-- end sidebar user -->
        <!-- begin sidebar nav -->
        <ul class="nav">
          <li class="has-sub" v-if="hasMenu(Menu.ROLE_MG, Menu.ACCOUNT_MG, Menu.SITE_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-cog"></i>
              <span>系统设置</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ROLE_MG)">
                <router-link :to="{name: 'role-manage'}">角色管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.ACCOUNT_MG)">
                <router-link :to="{name: 'account-manage'}">帐号管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.SITE_MG)">
                <router-link :to="{name: 'site-manage'}">站台管理</router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub " v-if="hasMenu(Menu.ANNOUNCE_MG, Menu.AD_SLIDER, Menu.QA, Menu.PAGE_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-globe"></i>
              <span>网站管理</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ANNOUNCE_MG)">
                <router-link :to="{name: 'announce-manage'}">公告管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.AD_SLIDER)">
                <router-link :to="{name: 'ad-slider'}">广告轮播</router-link>
              </li>
              <li v-if="hasMenu(Menu.QA)">
                <router-link :to="{name: 'qa'}">常见问题</router-link>
              </li>
              <li v-if="hasMenu(Menu.PAGE_MG)">
                <router-link :to="{name: 'page-manage'}">页面管理</router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub" v-if="hasMenu(Menu.MEMBER_MG)">
            <router-link :to="{name: 'member-manage'}">
              <i class="fa fa-user"></i><span>会员管理</span>
            </router-link>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.DRAMA_SOURCE_SET, Menu.DRAMA_AREA_SET, Menu.DRAMA_TYPE_SET, Menu.DRAMA_YEAR_SET, Menu.DRAMA_LANG_SET, Menu.DRAMA_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-television"></i>
              <span>影音戏剧</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.DRAMA_SOURCE_SET, Menu.DRAMA_AREA_SET, Menu.DRAMA_TYPE_SET, Menu.DRAMA_YEAR_SET, Menu.DRAMA_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.DRAMA_SOURCE_SET)">
                    <router-link :to="{name: 'drama-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_AREA_SET)">
                    <router-link :to="{name: 'drama-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_TYPE_SET)">
                    <router-link :to="{name: 'drama-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_YEAR_SET)">
                    <router-link :to="{name: 'drama-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_LANG_SET)">
                    <router-link :to="{name: 'drama-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.DRAMA_MG)">
                <router-link :to="{name: 'drama-manage'}"><span>戏剧管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub"
              v-if="hasMenu(Menu.MOVIE_SOURCE_SET, Menu.MOVIE_AREA_SET, Menu.MOVIE_TYPE_SET, Menu.MOVIE_YEAR_SET, Menu.MOVIE_LANG_SET, Menu.MOVIE_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-film"></i>
              <span>影音电影</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.MOVIE_SOURCE_SET, Menu.MOVIE_AREA_SET, Menu.MOVIE_TYPE_SET, Menu.MOVIE_YEAR_SET, Menu.MOVIE_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.MOVIE_SOURCE_SET)">
                    <router-link :to="{name: 'movie-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_AREA_SET)">
                    <router-link :to="{name: 'movie-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_TYPE_SET)">
                    <router-link :to="{name: 'movie-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_YEAR_SET)">
                    <router-link :to="{name: 'movie-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_LANG_SET)">
                    <router-link :to="{name: 'movie-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.MOVIE_MG)">
                <router-link :to="{name: 'movie-manage'}"><span>电影管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.ANIME_SOURCE_SET, Menu.ANIME_AREA_SET, Menu.ANIME_TYPE_SET, Menu.ANIME_YEAR_SET, Menu.ANIME_LANG_SET, Menu.ANIME_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-play-circle"></i>
              <span>影音动漫</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.ANIME_SOURCE_SET, Menu.ANIME_AREA_SET, Menu.ANIME_TYPE_SET, Menu.ANIME_YEAR_SET, Menu.ANIME_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ANIME_SOURCE_SET)">
                    <router-link :to="{name: 'anime-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_AREA_SET)">
                    <router-link :to="{name: 'anime-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_TYPE_SET)">
                    <router-link :to="{name: 'anime-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_YEAR_SET)">
                    <router-link :to="{name: 'anime-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_SOURCE_SET)">
                    <router-link :to="{name: 'anime-source-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.ANIME_MG)">
                <router-link :to="{name: 'anime-manage'}"><span>动漫管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.VARIETY_SOURCE_SET, Menu.VARIETY_AREA_SET, Menu.VARIETY_TYPE_SET, Menu.VARIETY_YEAR_SET, Menu.VARIETY_LANG_SET, Menu.VARIETY_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-smile-o"></i>
              <span>影音综艺</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.VARIETY_SOURCE_SET, Menu.VARIETY_AREA_SET, Menu.VARIETY_TYPE_SET, Menu.VARIETY_YEAR_SET, Menu.VARIETY_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.VARIETY_SOURCE_SET)">
                    <router-link :to="{name: 'variety-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_AREA_SET)">
                    <router-link :to="{name: 'variety-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_TYPE_SET)">
                    <router-link :to="{name: 'variety-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_YEAR_SET)">
                    <router-link :to="{name: 'variety-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_SOURCE_SET)">
                    <router-link :to="{name: 'variety-source-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.VARIETY_MG)">
                <router-link :to="{name: 'variety-manage'}"><span>综艺管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.AV_LONG_AREA_SET, Menu.AV_LONG_ACTRESS_SET, Menu.AV_LONG_CUP_SET, Menu.AV_LONG_TYPE_SET, Menu.AV_LONG_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-youtube-play"></i>
              <span>成人长片</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.AV_LONG_AREA_SET, Menu.AV_LONG_ACTRESS_SET, Menu.AV_LONG_CUP_SET, Menu.AV_LONG_TYPE_SET, Menu.AV_LONG_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_LONG_AREA_SET)">
                    <router-link :to="{name: 'av-long-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_ACTRESS_SET)">
                    <router-link :to="{name: 'av-long-atress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_CUP_SET)">
                    <router-link :to="{name: 'av-long-area-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_TYPE_SET)">
                    <router-link :to="{name: 'av-long-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_YEAR_SET)">
                    <router-link :to="{name: 'av-long-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.AV_SHORT_AREA_SET, Menu.AV_SHORT_ACTRESS_SET, Menu.AV_SHORT_CUP_SET, Menu.AV_SHORT_TYPE_SET, Menu.AV_SHORT_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file-video-o"></i>
              <span>成人短片</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.AV_SHORT_AREA_SET, Menu.AV_SHORT_ACTRESS_SET, Menu.AV_SHORT_CUP_SET, Menu.AV_SHORT_TYPE_SET, Menu.AV_SHORT_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_SHORT_AREA_SET)">
                    <router-link :to="{name: 'av-short-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_ACTRESS_SET)">
                    <router-link :to="{name: 'av-short-atress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_CUP_SET)">
                    <router-link :to="{name: 'av-short-area-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_TYPE_SET)">
                    <router-link :to="{name: 'av-short-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_YEAR_SET)">
                    <router-link :to="{name: 'av-short-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.AV_SELFIE_AREA_SET, Menu.AV_SELFIE_ACTRESS_SET, Menu.AV_SELFIE_CUP_SET, Menu.AV_SELFIE_TYPE_SET, Menu.AV_SELFIE_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-camera"></i>
              <span>成人自拍</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.AV_SELFIE_AREA_SET, Menu.AV_SELFIE_ACTRESS_SET, Menu.AV_SELFIE_CUP_SET, Menu.AV_SELFIE_TYPE_SET, Menu.AV_SELFIE_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_SELFIE_AREA_SET)">
                    <router-link :to="{name: 'av-selfie-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_ACTRESS_SET)">
                    <router-link :to="{name: 'av-selfie-atress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_CUP_SET)">
                    <router-link :to="{name: 'av-selfie-area-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_TYPE_SET)">
                    <router-link :to="{name: 'av-selfie-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_YEAR_SET)">
                    <router-link :to="{name: 'av-selfie-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET, Menu.ADULT_PHOTO_ACTRESS_SET, Menu.ADULT_PHOTO_CUP_SET, Menu.ADULT_PHOTO_TYPE_SET, Menu.ADULT_PHOTO_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file-image-o"></i>
              <span>成人写真</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET, Menu.ADULT_PHOTO_ACTRESS_SET, Menu.ADULT_PHOTO_CUP_SET, Menu.ADULT_PHOTO_TYPE_SET, Menu.ADULT_PHOTO_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET)">
                    <router-link :to="{name: 'adult-photo-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_ACTRESS_SET)">
                    <router-link :to="{name: 'adult-photo-atress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_CUP_SET)">
                    <router-link :to="{name: 'adult-photo-area-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_TYPE_SET)">
                    <router-link :to="{name: 'adult-photo-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_YEAR_SET)">
                    <router-link :to="{name: 'adult-photo-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.AV_AREA_SET, Menu.AV_ACTRESS_SET, Menu.AV_CUP_SET, Menu.AV_TYPE_SET, Menu.AV_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-video-camera"></i>
              <span>成人视频</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.AV_AREA_SET, Menu.AV_ACTRESS_SET, Menu.AV_CUP_SET, Menu.AV_TYPE_SET, Menu.AV_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_AREA_SET)">
                    <router-link :to="{name: 'av-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_ACTRESS_SET)">
                    <router-link :to="{name: 'av-atress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_CUP_SET)">
                    <router-link :to="{name: 'av-area-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_TYPE_SET)">
                    <router-link :to="{name: 'av-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_YEAR_SET)">
                    <router-link :to="{name: 'av-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET, Menu.ADULT_COMIC_TYPE_SET, Menu.ADULT_COMIC_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-video-camera"></i>
              <span>成人漫画</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET, Menu.ADULT_COMIC_TYPE_SET, Menu.ADULT_COMIC_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET)">
                    <router-link :to="{name: 'adult-comic-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_COMIC_TYPE_SET)">
                    <router-link :to="{name: 'adult-comic-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_COMIC_YEAR_SET)">
                    <router-link :to="{name: 'adult-comic-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET, Menu.ADULT_LITERATURE_TYPE_SET, Menu.ADULT_LITERATURE_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file"></i>
              <span>成人文学</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET, Menu.ADULT_LITERATURE_TYPE_SET, Menu.ADULT_LITERATURE_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET)">
                    <router-link :to="{name: 'adult-literature-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_TYPE_SET)">
                    <router-link :to="{name: 'adult-literature-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_YEAR_SET)">
                    <router-link :to="{name: 'adult-literature-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-if="hasMenu(Menu.ADULT_STORY_AREA_SET, Menu.ADULT_STORY_TYPE_SET, Menu.ADULT_STORY_YEAR_SET)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-book"></i>
              <span>成人说书</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-if="hasMenu(Menu.ADULT_STORY_AREA_SET, Menu.ADULT_STORY_TYPE_SET, Menu.ADULT_STORY_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_STORY_AREA_SET)">
                    <router-link :to="{name: 'adult-story-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_STORY_TYPE_SET)">
                    <router-link :to="{name: 'adult-story-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_STORY_YEAR_SET)">
                    <router-link :to="{name: 'adult-story-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub" v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-history"></i>
              <span>历程记录</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY)">
                <router-link :to="{name: 'account-login-history'}">帐号登入历程</router-link>
              </li>
            </ul>
          </li>
          <!-- begin sidebar minify button -->
          <li>
            <a class="sidebar-minify-btn"
               @click="isShowMenu = !isShowMenu"><i class="fa fa-angle-double-left"></i></a>
          </li>
          <!-- end sidebar minify button -->
        </ul>
        <!-- end sidebar nav -->
      </div>
      <!-- end sidebar scrollbar -->
    </div>
    <div class="sidebar-bg"></div>
    <!-- end #sidebar -->

    <!-- begin #content -->
    <router-view></router-view>
    <!-- end #content -->

    <!-- begin scroll to top btn -->
    <a href="javascript:;" class="btn btn-icon btn-circle btn-success btn-scroll-to-top fade" data-click="scroll-top">
      <i class="fa fa-angle-up"></i>
    </a>
    <!-- end scroll to top btn -->
  </div>
</template>

<script>
  import CheckLoginMixins from 'mixins/CheckLogin'
  import IndexMixins from 'mixins/Index'
  import { LoginType } from 'module/login'
  import Menu from 'constants/Menu'

  export default {
    mixins: [CheckLoginMixins, IndexMixins],
    data: () => ({
      isShowMenu: true,
      Menu,
    }),
    methods: {
      doLogout()
      {
        this.$store.commit(LoginType.clearAccessToken)
        this.$router.push({
          name: 'login',
        })
      },
      dataInit()
      {
        axios.all([this.getNodes(), this.getAccount()]).then(() =>
        {
          this.$nextTick(() =>
          {
            App.init()
          })
        })
      },
      hasMenu(...codes)
      {
        for (const code of codes)
        {
          const menu = _.find(this.menus, {code})
          if (codes.length > 1)
          {
            return !!menu
          }
          else
          {
            return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
          }
        }
        return false
      },
    },
    mounted()
    {
      this.dataInit()
    },
  }
</script>
