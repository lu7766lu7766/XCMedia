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
          <li class="has-sub" v-bind:class="{'active':this.$route.name =='role-manage'|| this.$route.name =='account-manage'|| this.$route.name =='site-manage'}" v-if="hasMenu(Menu.ROLE_MG, Menu.ACCOUNT_MG, Menu.SITE_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-cog"></i>
              <span>系统设置</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ROLE_MG)"  v-bind:class="{'active':this.$route.name =='role-manage'}">
                <router-link :to="{name: 'role-manage'}">角色管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.ACCOUNT_MG)"  v-bind:class="{'active':this.$route.name =='account-manage'}">
                <router-link :to="{name: 'account-manage'}">帐号管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.SITE_MG)" v-bind:class="{'active':this.$route.name =='site-manage'}">
                <router-link :to="{name: 'site-manage'}">站台管理</router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
           v-bind:class="{'active':this.$route.name =='announce-manage'|| this.$route.name =='ad-slider'|| this.$route.name =='qa'|| this.$route.name =='page-manage'}"
           v-if="hasMenu(Menu.ANNOUNCE_MG, Menu.AD_SLIDER, Menu.QA, Menu.PAGE_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-globe"></i>
              <span>网站管理</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ANNOUNCE_MG)" v-bind:class="{'active':this.$route.name =='announce-manage'}">
                <router-link :to="{name: 'announce-manage'}">公告管理</router-link>
              </li>
              <li v-if="hasMenu(Menu.AD_SLIDER)" v-bind:class="{'active':this.$route.name =='ad-slider'}">
                <router-link :to="{name: 'ad-slider'}">广告轮播</router-link>
              </li>
              <li v-if="hasMenu(Menu.QA)" v-bind:class="{'active':this.$route.name =='qa'}">
                <router-link :to="{name: 'qa'}">常见问题</router-link>
              </li>
              <li v-if="hasMenu(Menu.PAGE_MG)" v-bind:class="{'active':this.$route.name =='page-manage'}">
                <router-link :to="{name: 'page-manage'}">页面管理</router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub" v-if="hasMenu(Menu.MEMBER_MG)" v-bind:class="{'active':this.$route.name =='member-manage'}">
            <router-link :to="{name: 'member-manage'}">
              <i class="fa fa-user"></i><span>会员管理</span>
            </router-link>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='drama-source-setting'|| this.$route.name =='drama-area-setting'|| this.$route.name =='drama-type-setting'||this.$route.name =='drama-year-setting'|| this.$route.name =='drama-language-setting'|| this.$route.name =='drama-manage'||this.$route.name =='drama-topic-type-setting'}"
              v-if="hasMenu(Menu.DRAMA_SOURCE_SET, Menu.DRAMA_AREA_SET, Menu.DRAMA_TYPE_SET, Menu.DRAMA_YEAR_SET, Menu.DRAMA_LANG_SET, Menu.DRAMA_TOPIC_TYPE, Menu.DRAMA_MG)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-television"></i>
              <span>影音戏剧</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='drama-source-setting'|| this.$route.name =='drama-area-setting'|| this.$route.name =='drama-type-setting'||this.$route.name =='drama-year-setting'|| this.$route.name =='drama-language-setting'}"
                  v-if="hasMenu(Menu.DRAMA_SOURCE_SET, Menu.DRAMA_AREA_SET, Menu.DRAMA_TYPE_SET, Menu.DRAMA_YEAR_SET, Menu.DRAMA_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.DRAMA_SOURCE_SET)" v-bind:class="{'active':this.$route.name =='drama-source-setting'}">
                    <router-link :to="{name: 'drama-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_AREA_SET)" v-bind:class="{'active':this.$route.name =='drama-area-setting'}">
                    <router-link :to="{name: 'drama-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_TYPE_SET)" v-bind:class="{'active':this.$route.name =='drama-type-setting'}">
                    <router-link :to="{name: 'drama-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_YEAR_SET)" v-bind:class="{'active':this.$route.name =='drama-year-setting'}">
                    <router-link :to="{name: 'drama-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.DRAMA_LANG_SET)" v-bind:class="{'active':this.$route.name =='drama-language-setting'}">
                    <router-link :to="{name: 'drama-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
               <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='drama-topic-type-setting'}"
                  v-if="hasMenu(Menu.DRAMA_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.DRAMA_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='drama-topic-type-setting'}">
                    <router-link :to="{name: 'drama-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.DRAMA_MG)" v-bind:class="{'active':this.$route.name =='drama-manage'}">
                <router-link :to="{name: 'drama-manage'}"><span>戏剧管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub"
              v-bind:class="{'active':this.$route.name =='movie-source-setting'|| this.$route.name =='movie-area-setting'|| this.$route.name =='movie-type-setting'||this.$route.name =='movie-year-setting'|| this.$route.name =='movie-language-setting'|| this.$route.name =='movie-manage'||this.$route.name =='movie-topic-type-setting'}"
              v-if="hasMenu(Menu.MOVIE_SOURCE_SET, Menu.MOVIE_AREA_SET, Menu.MOVIE_TYPE_SET, Menu.MOVIE_YEAR_SET, Menu.MOVIE_LANG_SET, Menu.MOVIE_MG, Menu.MOVIE_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-film"></i>
              <span>影音电影</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='movie-source-setting'|| this.$route.name =='movie-area-setting'|| this.$route.name =='movie-type-setting'||this.$route.name =='movie-year-setting'|| this.$route.name =='movie-language-setting'}"
                  v-if="hasMenu(Menu.MOVIE_SOURCE_SET, Menu.MOVIE_AREA_SET, Menu.MOVIE_TYPE_SET, Menu.MOVIE_YEAR_SET, Menu.MOVIE_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.MOVIE_SOURCE_SET)" v-bind:class="{'active':this.$route.name =='movie-source-setting'}">
                    <router-link :to="{name: 'movie-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_AREA_SET)" v-bind:class="{'active':this.$route.name =='movie-area-setting'}">
                    <router-link :to="{name: 'movie-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_TYPE_SET)" v-bind:class="{'active':this.$route.name =='movie-type-setting'}">
                    <router-link :to="{name: 'movie-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_YEAR_SET)" v-bind:class="{'active':this.$route.name =='movie-year-setting'}">
                    <router-link :to="{name: 'movie-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.MOVIE_LANG_SET)" v-bind:class="{'active':this.$route.name =='movie-language-setting'}">
                    <router-link :to="{name: 'movie-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='movie-topic-type-setting'}"
                  v-if="hasMenu(Menu.MOVIE_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.MOVIE_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='movie-topic-type-setting'}">
                    <router-link :to="{name: 'movie-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.MOVIE_MG)" v-bind:class="{'active':this.$route.name =='movie-manage'}">
                <router-link :to="{name: 'movie-manage'}"><span>电影管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='anime-source-setting'|| this.$route.name =='anime-area-setting'|| this.$route.name =='anime-type-setting'||this.$route.name =='anime-year-setting'|| this.$route.name =='anime-language-setting'|| this.$route.name =='anime-manage'||this.$route.name =='anime-topic-type-setting'}"
              v-if="hasMenu(Menu.ANIME_SOURCE_SET, Menu.ANIME_AREA_SET, Menu.ANIME_TYPE_SET, Menu.ANIME_YEAR_SET, Menu.ANIME_LANG_SET, Menu.ANIME_MG, Menu.ANIME_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-play-circle"></i>
              <span>影音动漫</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='anime-source-setting'|| this.$route.name =='anime-area-setting'|| this.$route.name =='anime-type-setting'||this.$route.name =='anime-year-setting'|| this.$route.name =='anime-language-setting'}"
                  v-if="hasMenu(Menu.ANIME_SOURCE_SET, Menu.ANIME_AREA_SET, Menu.ANIME_TYPE_SET, Menu.ANIME_YEAR_SET, Menu.ANIME_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ANIME_SOURCE_SET)" v-bind:class="{'active':this.$route.name =='anime-source-setting'}">
                    <router-link :to="{name: 'anime-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_AREA_SET)" v-bind:class="{'active':this.$route.name =='anime-area-setting'}">
                    <router-link :to="{name: 'anime-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_TYPE_SET)" v-bind:class="{'active':this.$route.name =='anime-type-setting'}">
                    <router-link :to="{name: 'anime-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_YEAR_SET)" v-bind:class="{'active':this.$route.name =='anime-year-setting'}">
                    <router-link :to="{name: 'anime-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ANIME_LANG_SET)" v-bind:class="{'active':this.$route.name =='anime-language-setting'}">
                    <router-link :to="{name: 'anime-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='anime-topic-type-setting'}"
                  v-if="hasMenu(Menu.ANIME_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ANIME_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='anime-topic-type-setting'}">
                    <router-link :to="{name: 'anime-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.ANIME_MG)" v-bind:class="{'active':this.$route.name =='anime-manage'}">
                <router-link :to="{name: 'anime-manage'}"><span>动漫管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='variety-source-setting'|| this.$route.name =='variety-area-setting'|| this.$route.name =='variety-type-setting'||this.$route.name =='variety-year-setting'|| this.$route.name =='variety-language-setting'|| this.$route.name =='variety-manage'||this.$route.name =='variety-topic-type-setting'}"
              v-if="hasMenu(Menu.VARIETY_SOURCE_SET, Menu.VARIETY_AREA_SET, Menu.VARIETY_TYPE_SET, Menu.VARIETY_YEAR_SET, Menu.VARIETY_LANG_SET, Menu.VARIETY_MG, Menu.VARIETY_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-smile-o"></i>
              <span>影音综艺</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
              v-bind:class="{'active':this.$route.name =='variety-source-setting'|| this.$route.name =='variety-area-setting'|| this.$route.name =='variety-type-setting'||this.$route.name =='variety-year-setting'|| this.$route.name =='variety-language-setting'}"
                  v-if="hasMenu(Menu.VARIETY_SOURCE_SET, Menu.VARIETY_AREA_SET, Menu.VARIETY_TYPE_SET, Menu.VARIETY_YEAR_SET, Menu.VARIETY_LANG_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.VARIETY_SOURCE_SET)" v-bind:class="{'active':this.$route.name =='variety-source-setting'}">
                    <router-link :to="{name: 'variety-source-setting'}">来源设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_AREA_SET)" v-bind:class="{'active':this.$route.name =='variety-area-setting'}">
                    <router-link :to="{name: 'variety-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_TYPE_SET)" v-bind:class="{'active':this.$route.name =='variety-type-setting'}">
                    <router-link :to="{name: 'variety-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_YEAR_SET)" v-bind:class="{'active':this.$route.name =='variety-year-setting'}">
                    <router-link :to="{name: 'variety-year-setting'}">年份设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.VARIETY_LANG_SET)" v-bind:class="{'active':this.$route.name =='variety-language-setting'}">
                    <router-link :to="{name: 'variety-language-setting'}">语言设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='variety-topic-type-setting'}"
                  v-if="hasMenu(Menu.VARIETY_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.VARIETY_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='variety-topic-type-setting'}">
                    <router-link :to="{name: 'variety-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
              <li v-if="hasMenu(Menu.VARIETY_MG)" v-bind:class="{'active':this.$route.name =='variety-manage'}">
                <router-link :to="{name: 'variety-manage'}"><span>综艺管理</span></router-link>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='av-long-area-setting'||this.$route.name =='av-long-actress-setting'||this.$route.name =='av-long-cup-setting'||this.$route.name =='av-long-type-setting'||this.$route.name =='av-long-year-setting'||this.$route.name =='av-long-topic-type-setting'}"
              v-if="hasMenu(Menu.AV_LONG_AREA_SET, Menu.AV_LONG_ACTRESS_SET, Menu.AV_LONG_CUP_SET, Menu.AV_LONG_TYPE_SET, Menu.AV_LONG_YEAR_SET, Menu.AV_LONG_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-youtube-play"></i>
              <span>成人长片</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-long-area-setting'||this.$route.name =='av-long-actress-setting'||this.$route.name =='av-long-cup-setting'||this.$route.name =='av-long-type-setting'||this.$route.name =='av-long-year-setting'}"
                  v-if="hasMenu(Menu.AV_LONG_AREA_SET, Menu.AV_LONG_ACTRESS_SET, Menu.AV_LONG_CUP_SET, Menu.AV_LONG_TYPE_SET, Menu.AV_LONG_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_LONG_AREA_SET)" v-bind:class="{'active':this.$route.name =='av-long-area-setting'}">
                    <router-link :to="{name: 'av-long-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_ACTRESS_SET)" v-bind:class="{'active':this.$route.name =='av-long-actress-setting'}">
                    <router-link :to="{name: 'av-long-actress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_CUP_SET)" v-bind:class="{'active':this.$route.name =='av-long-cup-setting'}">
                    <router-link :to="{name: 'av-long-cup-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_TYPE_SET)" v-bind:class="{'active':this.$route.name =='av-long-type-setting'}">
                    <router-link :to="{name: 'av-long-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_LONG_YEAR_SET)" v-bind:class="{'active':this.$route.name =='av-long-year-setting'}">
                    <router-link :to="{name: 'av-long-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-long-topic-type-setting'}"
                  v-if="hasMenu(Menu.AV_LONG_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.AV_LONG_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='av-long-topic-type-setting'}">
                    <router-link :to="{name: 'av-long-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='av-short-area-setting'||this.$route.name =='av-short-actress-setting'||this.$route.name =='av-short-cup-setting'||this.$route.name =='av-short-type-setting'||this.$route.name =='av-short-year-setting'||this.$route.name =='av-short-topic-type-setting'}"
              v-if="hasMenu(Menu.AV_SHORT_AREA_SET, Menu.AV_SHORT_ACTRESS_SET, Menu.AV_SHORT_CUP_SET, Menu.AV_SHORT_TYPE_SET, Menu.AV_SHORT_YEAR_SET, Menu.AV_SHORT_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file-video-o"></i>
              <span>成人短片</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-short-area-setting'||this.$route.name =='av-short-actress-setting'||this.$route.name =='av-short-cup-setting'||this.$route.name =='av-short-type-setting'||this.$route.name =='av-short-year-setting'}"
                  v-if="hasMenu(Menu.AV_SHORT_AREA_SET, Menu.AV_SHORT_ACTRESS_SET, Menu.AV_SHORT_CUP_SET, Menu.AV_SHORT_TYPE_SET, Menu.AV_SHORT_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_SHORT_AREA_SET)" v-bind:class="{'active':this.$route.name =='av-short-area-setting'}">
                    <router-link :to="{name: 'av-short-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_ACTRESS_SET)" v-bind:class="{'active':this.$route.name =='av-short-actress-setting'}">
                    <router-link :to="{name: 'av-short-actress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_CUP_SET)" v-bind:class="{'active':this.$route.name =='av-short-cup-setting'}">
                    <router-link :to="{name: 'av-short-cup-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_TYPE_SET)" v-bind:class="{'active':this.$route.name =='av-short-type-setting'}">
                    <router-link :to="{name: 'av-short-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SHORT_YEAR_SET)" v-bind:class="{'active':this.$route.name =='av-short-year-setting'}">
                    <router-link :to="{name: 'av-short-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-short-topic-type-setting'}"
                  v-if="hasMenu(Menu.AV_SHORT_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.AV_SHORT_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='av-short-topic-type-setting'}">
                    <router-link :to="{name: 'av-short-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='av-selfie-area-setting'||this.$route.name =='av-selfie-actress-setting'||this.$route.name =='av-selfie-cup-setting'||this.$route.name =='av-selfie-type-setting'||this.$route.name =='av-selfie-year-setting'||this.$route.name =='av-selfie-topic-type-setting'}"
              v-if="hasMenu(Menu.AV_SELFIE_AREA_SET, Menu.AV_SELFIE_ACTRESS_SET, Menu.AV_SELFIE_CUP_SET, Menu.AV_SELFIE_TYPE_SET, Menu.AV_SELFIE_YEAR_SET, Menu.AV_SELFIE_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-camera"></i>
              <span>成人自拍</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-selfie-area-setting'||this.$route.name =='av-selfie-actress-setting'||this.$route.name =='av-selfie-cup-setting'||this.$route.name =='av-selfie-type-setting'||this.$route.name =='av-selfie-year-setting'}"
                  v-if="hasMenu(Menu.AV_SELFIE_AREA_SET, Menu.AV_SELFIE_ACTRESS_SET, Menu.AV_SELFIE_CUP_SET, Menu.AV_SELFIE_TYPE_SET, Menu.AV_SELFIE_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_SELFIE_AREA_SET)" v-bind:class="{'active':this.$route.name =='av-selfie-area-setting'}">
                    <router-link :to="{name: 'av-selfie-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_ACTRESS_SET)" v-bind:class="{'active':this.$route.name =='av-selfie-actress-setting'}">
                    <router-link :to="{name: 'av-selfie-actress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_CUP_SET)" v-bind:class="{'active':this.$route.name =='av-selfie-cup-setting'}">
                    <router-link :to="{name: 'av-selfie-cup-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_TYPE_SET)" v-bind:class="{'active':this.$route.name =='av-selfie-type-setting'}">
                    <router-link :to="{name: 'av-selfie-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_SELFIE_YEAR_SET)" v-bind:class="{'active':this.$route.name =='av-selfie-year-setting'}">
                    <router-link :to="{name: 'av-selfie-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-selfie-topic-type-setting'}"
                  v-if="hasMenu(Menu.AV_SELFIE_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.AV_SELFIE_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='av-selfie-topic-type-setting'}">
                    <router-link :to="{name: 'av-selfie-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='adult-photo-area-setting'||this.$route.name =='adult-photo-actress-setting'||this.$route.name =='adult-photo-cup-setting'||this.$route.name =='adult-photo-type-setting'||this.$route.name =='adult-photo-year-setting'||this.$route.name =='adult-photo-topic-type-setting'}"
              v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET, Menu.ADULT_PHOTO_ACTRESS_SET, Menu.ADULT_PHOTO_CUP_SET, Menu.ADULT_PHOTO_TYPE_SET, Menu.ADULT_PHOTO_YEAR_SET, Menu.ADULT_PHOTO_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file-image-o"></i>
              <span>成人写真</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-photo-area-setting'||this.$route.name =='adult-photo-actress-setting'||this.$route.name =='adult-photo-cup-setting'||this.$route.name =='adult-photo-type-setting'||this.$route.name =='adult-photo-year-setting'}"
                  v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET, Menu.ADULT_PHOTO_ACTRESS_SET, Menu.ADULT_PHOTO_CUP_SET, Menu.ADULT_PHOTO_TYPE_SET, Menu.ADULT_PHOTO_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_PHOTO_AREA_SET)" v-bind:class="{'active':this.$route.name =='adult-photo-area-setting'}">
                    <router-link :to="{name: 'adult-photo-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_ACTRESS_SET)" v-bind:class="{'active':this.$route.name =='adult-photo-actress-setting'}">
                    <router-link :to="{name: 'adult-photo-actress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_CUP_SET)" v-bind:class="{'active':this.$route.name =='adult-photo-cup-setting'}">
                    <router-link :to="{name: 'adult-photo-cup-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_TYPE_SET)" v-bind:class="{'active':this.$route.name =='adult-photo-type-setting'}">
                    <router-link :to="{name: 'adult-photo-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_YEAR_SET)" v-bind:class="{'active':this.$route.name =='adult-photo-year-setting'}">
                    <router-link :to="{name: 'adult-photo-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-photo-topic-type-setting'}"
                  v-if="hasMenu(Menu.ADULT_PHOTO_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ADULT_PHOTO_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='adult-photo-topic-type-setting'}">
                    <router-link :to="{name: 'adult-photo-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='av-area-setting'||this.$route.name =='av-actress-setting'||this.$route.name =='av-cup-setting'||this.$route.name =='av-type-setting'||this.$route.name =='av-year-setting'||this.$route.name =='av-topic-type-setting'}"
              v-if="hasMenu(Menu.AV_AREA_SET, Menu.AV_ACTRESS_SET, Menu.AV_CUP_SET, Menu.AV_TYPE_SET, Menu.AV_YEAR_SET, Menu.AV_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-video-camera"></i>
              <span>成人视频</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-area-setting'||this.$route.name =='av-actress-setting'||this.$route.name =='av-cup-setting'||this.$route.name =='av-type-setting'||this.$route.name =='av-year-setting'}"
                  v-if="hasMenu(Menu.AV_AREA_SET, Menu.AV_ACTRESS_SET, Menu.AV_CUP_SET, Menu.AV_TYPE_SET, Menu.AV_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.AV_AREA_SET)" v-bind:class="{'active':this.$route.name =='av-area-setting'}">
                    <router-link :to="{name: 'av-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_ACTRESS_SET)" v-bind:class="{'active':this.$route.name =='av-actress-setting'}">
                    <router-link :to="{name: 'av-actress-setting'}">女优设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_CUP_SET)" v-bind:class="{'active':this.$route.name =='av-cup-setting'}">
                    <router-link :to="{name: 'av-cup-setting'}">罩杯设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_TYPE_SET)" v-bind:class="{'active':this.$route.name =='av-type-setting'}">
                    <router-link :to="{name: 'av-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.AV_YEAR_SET)" v-bind:class="{'active':this.$route.name =='av-year-setting'}">
                    <router-link :to="{name: 'av-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='av-topic-type-setting'}"
                  v-if="hasMenu(Menu.AV_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.AV_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='av-topic-type-setting'}">
                    <router-link :to="{name: 'av-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='adult-comic-area-setting'||this.$route.name =='adult-comic-type-setting'||this.$route.name =='adult-comic-year-setting'||this.$route.name =='adult-comic-topic-type-setting'}"
              v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET, Menu.ADULT_COMIC_TYPE_SET, Menu.ADULT_COMIC_YEAR_SET, Menu.ADULT_COMIC_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-video-camera"></i>
              <span>成人漫画</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-comic-area-setting'||this.$route.name =='adult-comic-type-setting'||this.$route.name =='adult-comic-year-setting'}"
                  v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET, Menu.ADULT_COMIC_TYPE_SET, Menu.ADULT_COMIC_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_COMIC_AREA_SET)" v-bind:class="{'active':this.$route.name =='adult-comic-area-setting'}">
                    <router-link :to="{name: 'adult-comic-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_COMIC_TYPE_SET)" v-bind:class="{'active':this.$route.name =='adult-comic-type-setting'}">
                    <router-link :to="{name: 'adult-comic-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_COMIC_YEAR_SET)" v-bind:class="{'active':this.$route.name =='adult-comic-year-setting'}">
                    <router-link :to="{name: 'adult-comic-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-comic-topic-type-setting'}"
                  v-if="hasMenu(Menu.ADULT_COMIC_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ADULT_COMIC_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='adult-comic-topic-type-setting'}">
                    <router-link :to="{name: 'adult-comic-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='adult-literature-area-setting'||this.$route.name =='adult-literature-type-setting'||this.$route.name =='adult-literature-year-setting'||this.$route.name =='adult-literature-topic-type-setting'}"
              v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET, Menu.ADULT_LITERATURE_TYPE_SET, Menu.ADULT_LITERATURE_YEAR_SET, Menu.ADULT_LITERATURE_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-file"></i>
              <span>成人文学</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-literature-area-setting'||this.$route.name =='adult-literature-type-setting'||this.$route.name =='adult-literature-year-setting'}"
                  v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET, Menu.ADULT_LITERATURE_TYPE_SET, Menu.ADULT_LITERATURE_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_AREA_SET)" v-bind:class="{'active':this.$route.name =='adult-literature-area-setting'}">
                    <router-link :to="{name: 'adult-literature-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_TYPE_SET)" v-bind:class="{'active':this.$route.name =='adult-literature-type-setting'}">
                    <router-link :to="{name: 'adult-literature-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_YEAR_SET)" v-bind:class="{'active':this.$route.name =='adult-literature-year-setting'}">
                    <router-link :to="{name: 'adult-literature-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-literature-topic-type-setting'}"
                  v-if="hasMenu(Menu.ADULT_LITERATURE_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ADULT_LITERATURE_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='adult-literature-topic-type-setting'}">
                    <router-link :to="{name: 'adult-literature-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub "
              v-bind:class="{'active':this.$route.name =='adult-story-area-setting'||this.$route.name =='adult-story-type-setting'||this.$route.name =='adult-story-year-setting'||this.$route.name =='adult-story-topic-type-setting'}"
              v-if="hasMenu(Menu.ADULT_STORY_AREA_SET, Menu.ADULT_STORY_TYPE_SET, Menu.ADULT_STORY_YEAR_SET, Menu.ADULT_STORY_TOPIC_TYPE)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fa fa-book"></i>
              <span>成人说书</span>
            </a>
            <ul class="sub-menu">
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-story-area-setting'||this.$route.name =='adult-story-type-setting'||this.$route.name =='adult-story-year-setting'}"
                  v-if="hasMenu(Menu.ADULT_STORY_AREA_SET, Menu.ADULT_STORY_TYPE_SET, Menu.ADULT_STORY_YEAR_SET)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>分类管理</span>
                </a>
                <ul class="sub-menu">

                  <li v-if="hasMenu(Menu.ADULT_STORY_AREA_SET)" v-bind:class="{'active':this.$route.name =='adult-story-area-setting'}">
                    <router-link :to="{name: 'adult-story-area-setting'}">地区设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_STORY_TYPE_SET)" v-bind:class="{'active':this.$route.name =='adult-story-type-setting'}">
                    <router-link :to="{name: 'adult-story-type-setting'}">类型设定</router-link>
                  </li>
                  <li v-if="hasMenu(Menu.ADULT_STORY_YEAR_SET)" v-bind:class="{'active':this.$route.name =='adult-story-year-setting'}">
                    <router-link :to="{name: 'adult-story-year-setting'}">年份设定</router-link>
                  </li>
                </ul>
              </li>
              <li class="has-sub"
                  v-bind:class="{'active':this.$route.name =='adult-story-topic-type-setting'}"
                  v-if="hasMenu(Menu.ADULT_STORY_TOPIC_TYPE)">
                <a href="javascript:;">
                  <b class="caret"></b>
                  <span>专题管理</span>
                </a>
                <ul class="sub-menu">
                  <li v-if="hasMenu(Menu.ADULT_STORY_TOPIC_TYPE)" v-bind:class="{'active':this.$route.name =='adult-story-topic-type-setting'}">
                    <router-link :to="{name: 'adult-story-topic-type-setting'}">专题分类</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li class="has-sub"
           v-bind:class="{'active':this.$route.name =='account-login-history'||this.$route.name =='member-login-history'}"
           v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY, Menu.ACCOUNT_LOGIN_HISTORY)">
            <a href="javascript:;">
              <b class="caret"></b>
              <i class="fas fa-history"></i>
              <span>历程记录</span>
            </a>
            <ul class="sub-menu">
              <li v-if="hasMenu(Menu.ACCOUNT_LOGIN_HISTORY)" v-bind:class="{'active':this.$route.name =='account-login-history'}">
                <router-link :to="{name: 'account-login-history'}">帐号登入历程</router-link>
              </li>
              <li v-if="hasMenu(Menu.MEMBER_LOGIN_HISTORY)" v-bind:class="{'active':this.$route.name =='member-login-history'}">
                <router-link :to="{name: 'member-login-history'}">会员登入历程</router-link>
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
        return _.some(codes, code =>
        {
          const menu = _.find(this.menus, {code})
          return menu && _.some(menu.nodes, x => _.endsWith(x.code, '_READ'))
        })
      },
    },
    mounted()
    {
      this.dataInit()
    },
  }
</script>

<style lang="stylus">
  .upload-box .img-show
    display block
</style>
