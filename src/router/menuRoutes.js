export default [
 
      {
        path: 'sys-setting',
        label:'系统设置',
        icon:'fas fa-cog',
        component: () => import('pages/SysSetting'),
        children: [
          {
            path: 'role-manage',
            name: 'role-manage',
            label:'角色管理',
            hasMenu:'ROLE_MG',
            component: () => import('pages/SysSetting/RoleSetting'),
          },
          {
            path: 'account-manage',
            name: 'account-manage',
            label:'帐号管理',
            hasMenu:'ACCOUNT_MG',
            component: () => import('pages/SysSetting/AccountManage'),
          },
          {
            path: 'site-manage',
            name: 'site-manage',
            label:'站台管理',
            hasMenu:'SITE_MG',
            component: () => import('pages/SysSetting/SiteManage'),
          },
        ],
      },
      {
        path: 'website-manage',
        label:'网站管理',
        icon:'fas fa-globe',
        component: () => import('pages/WebManage'),
        children: [
          {
            path: 'announce-manage',
            name: 'announce-manage',
            label:'公告管理',
            hasMenu:'ANNOUNCE_MG',
            component: () => import('pages/WebManage/AnnounceManage'),
          },
          {
            path: 'ad-slider',
            name: 'ad-slider',
            label:'广告轮播',
            hasMenu:'AD_SLIDER',
            component: () => import('pages/WebManage/ADSlider'),
          }, {
            path: 'qa',
            name: 'qa',
            label:'常见问题',
            hasMenu:'QA',
            component: () => import('pages/WebManage/QA'),
          },
          {
            path: 'page-manage',
            name: 'page-manage',
            label:'会员管理',
            hasMenu:'MEMBER_MG',
            component: () => import('pages/WebManage/PageManage'),
          },
        ],
      },
      {
        path: 'member-manage',
        name: 'member-manage',
        label:'会员管理',
        icon:'fa fa-user',
        hasMenu:'MEMBER_MG',
        component: () => import('pages/MemberManage'),
      },
      {
        path: 'drama',
        label:'影音戏剧',
        icon:'fa fa-television',
        component: () => import('pages/Drama'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/Drama'),
            children: [
              {
                path: 'source',
                name: 'drama-source-setting',
                label:'来源设定',
                hasMenu:'DRAMA_SOURCE_SET',
                component: () => import('pages/Drama/Source'),
              },
              {
                path: 'type',
                name: 'drama-area-setting',
                label:'地区设定',
                hasMenu:'DRAMA_AREA_SET',
                component: () => import('pages/Drama/Area'),
              },
              {
                path: 'type',
                name: 'drama-type-setting',
                label:'类型设定',
                hasMenu:'DRAMA_TYPE_SET',
                component: () => import('pages/Drama/Type'),
              },
              {
                path: 'year',
                name: 'drama-year-setting',
                label:'年份设定',
                hasMenu:'DRAMA_YEAR_SET',
                component: () => import('pages/Drama/Year'),
              },
              {
                path: 'language',
                name: 'drama-language-setting',
                label:'语言设定',
                hasMenu:'DRAMA_LANG_SET',
                component: () => import('pages/Drama/Lang'),
              },
            ]
          },
          {
            path: 'drama',
            label:'专题管理',
            component: () => import('pages/Drama'),
            children: [
              {
                path: 'topic-type',
                name: 'drama-topic-type-setting',
                label:'专题分类',
                hasMenu:'DRAMA_TOPIC_TYPE',
                component: () => import('pages/Drama/TopicType'),
              },
            ]
          },
          {
            path: 'manage',
            name: 'drama-manage',
            label:'戏剧管理',
            hasMenu:'DRAMA_SOURCE_SET',
            component: () => import('pages/Drama/Manage'),
          },
          {
            path: 'episode/:id',
            name: 'drama-episode',
            component: () => import('pages/Drama/Episode'),
          },
        ],
      },
      
      {
        path: 'movie',
        label:'影音电影',
        icon:'fa fa-film',
        component: () => import('pages/Movie'),
        children: [
        {
          path: '',
          label:'分类管理',
          component: () => import('pages/Movie'),
          children: [
            {
              path: 'source',
              name: 'movie-source-setting',
              label:'来源设定',
              hasMenu:'MOVIE_SOURCE_SET',
              component: () => import('pages/Movie/Source'),
            },
            {
              path: 'area',
              name: 'movie-area-setting',
              label:'地区设定',
              hasMenu:'MOVIE_AREA_SET',
              component: () => import('pages/Movie/Area'),
            },
            {
              path: 'type',
              name: 'movie-type-setting',
              label:'类型设定',
              hasMenu:'MOVIE_TYPE_SET',
              component: () => import('pages/Movie/Type'),
            },
            {
              path: 'year',
              name: 'movie-year-setting',
              label:'年份设定',
              hasMenu:'MOVIE_YEAR_SET',
              component: () => import('pages/Movie/Year'),
            },
            {
              path: 'language',
              name: 'movie-language-setting',
              label:'语言设定',
              hasMenu:'MOVIE_LANG_SET',
              component: () => import('pages/Movie/Lang'),
            },
          ]},
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/Movie'),
            children: [
              {
                path: 'topic-type',
                name: 'movie-topic-type-setting',
                label:'专题分类',
                hasMenu:'MOVIE_TOPIC_TYPE',
                component: () => import('pages/Movie/TopicType'),
              },
            ]},
            {
              path: 'manage',
              name: 'movie-manage',
              label:'电影管理',
              hasMenu:'电影管理',
              component: () => import('pages/Movie/Manage'),
            },
            {
              path: 'episode/:id',
              name: 'movie-episode',
              component: () => import('pages/Movie/Episode'),
            },
          ]
      },
      {
        path: 'anime',
        label:'影音动漫',
        icon:'fa fa-play-circle',
        component: () => import('pages/Anime'),
        children: [
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/Anime'),
            children: [
              {
                path: 'source',
                name: 'anime-source-setting',
                label:'来源设定',
                hasMenu:'ANIME_SOURCE_SET',
                component: () => import('pages/Anime/Source'),
              },
              {
                path: 'area',
                name: 'anime-area-setting',
                label:'地区设定',
                hasMenu:'ANIME_AREA_SET',
                component: () => import('pages/Anime/Area'),
              },
              {
                path: 'type',
                name: 'anime-type-setting',
                label:'类型设定',
                hasMenu:'ANIME_TYPE_SET',
                component: () => import('pages/Anime/Type'),
              },
              {
                path: 'year',
                name: 'anime-year-setting',
                label:'年份设定',
                hasMenu:'ANIME_YEAR_SET',
                component: () => import('pages/Anime/Year'),
              },
              {
                path: 'language',
                name: 'anime-language-setting',
                label:'语言设定',
                hasMenu:'ANIME_LANG_SET',
                component: () => import('pages/Anime/Lang'),
              },
            ]},
            {
              path: '',
              label:'专题管理',
              component: () => import('pages/Anime'),
              children: [
                {
                  path: 'topic-type',
                  name: 'anime-topic-type-setting',
                  label:'专题分类',
                  hasMenu:'ANIME_TOPIC_TYPE',
                  component: () => import('pages/Anime/TopicType'),
                },
              ]},
              {
                path: 'manage',
                name: 'anime-manage',
                label:'动漫管理',
                hasMenu:'ANIME_MG',
                component: () => import('pages/Anime/Manage'),
              },
              {
                path: 'episode/:id',
                name: 'anime-episode',
                component: () => import('pages/Anime/Episode'),
              },
        ],
      },
      {
        path: 'variety',
        label:'影音综艺',
        icon:'fa fa-smile-o',
        component: () => import('pages/Variety'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/Variety'),
            children: [
              {
                path: 'source',
                name: 'variety-source-setting',
                label:'来源设定',
                hasMenu:'VARIETY_SOURCE_SET',
                component: () => import('pages/Variety/Source'),
              },
              {
                path: 'area',
                name: 'variety-area-setting',
                label:'地区设定',
                hasMenu:'VARIETY_AREA_SET',
                component: () => import('pages/Variety/Area'),
              },
              {
                path: 'type',
                name: 'variety-type-setting',
                label:'类型设定',
                hasMenu:'VARIETY_TYPE_SET',
                component: () => import('pages/Variety/Type'),
              },
              {
                path: 'year',
                name: 'variety-year-setting',
                label:'年份设定',
                hasMenu:'VARIETY_YEAR_SET',
                component: () => import('pages/Variety/Year'),
              },
              {
                path: 'language',
                name: 'variety-language-setting',
                label:'语言设定',
                hasMenu:'VARIETY_LANG_SET',
                component: () => import('pages/Variety/Lang'),
              },
            ]},
            {
              path: '',
              label:'专题管理',
              component: () => import('pages/Variety'),
              children: [
                {
                  path: 'topic-type',
                  name: 'variety-topic-type-setting',
                  label:'专题分类',
                  hasMenu:'VARIETY_TOPIC_TYPE',
                  component: () => import('pages/Variety/TopicType'),
                },
              ]},
              {
                path: 'manage',
                name: 'variety-manage',
                label:'综艺管理',
                hasMenu:'VARIETY_MG',
                component: () => import('pages/Variety/Manage'),
              },
              {
                path: 'episode/:id',
                name: 'variety-episode',
                component: () => import('pages/Variety/Episode'),
              },
        ],
      },
      {
        path: 'av-long',
        label:'成人长片',
        icon:'fa fa-youtube-play',
        component: () => import('pages/AVLong'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AVLong'),
            children: [
              {
                path: 'area',
                name: 'av-long-area-setting',
                label:'地区设定',
                hasMenu:'AV_LONG_AREA_SET',
                component: () => import('pages/AVLong/Area'),
              },
              {
                path: 'actress',
                name: 'av-long-actress-setting',
                label:'女优设定',
                hasMenu:'AV_LONG_ACTRESS_SET',
                component: () => import('pages/AVLong/Actress'),
              },

              {
                path: 'cup',
                name: 'av-long-cup-setting',
                label:'罩杯设定',
                hasMenu:'AV_LONG_CUP_SET',
                component: () => import('pages/AVLong/Cup'),
              },
              {
                path: 'type',
                name: 'av-long-type-setting',
                label:'类型设定',
                hasMenu:'AV_LONG_TYPE_SET',
                component: () => import('pages/AVLong/Type'),
              },
              {
                path: 'year',
                name: 'av-long-year-setting',
                label:'年份设定',
                hasMenu:'AV_LONG_YEAR_SET',
                component: () => import('pages/AVLong/Year'),
              },
              // {
              //   path: 'cup',
              //   name: 'av-long-cup-setting',
              //   label:'罩杯设定',
              //   hasMenu:'AV_LONG_CUP_SET',
              //   component: () => import('pages/AVLong/Cup'),
              // },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AVLong'),
            children: [
              {
                path: 'topic-type',
                name: 'av-long-topic-type-setting',
                label:'专题分类',
                hasMenu:'AV_LONG_TOPIC_TYPE',
                component: () => import('pages/AVLong/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'av-short',
        label:'成人短片',
        icon:'fa fa-file-video-o',
        component: () => import('pages/AVShort'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AVShort'),
            children: [
              {
                path: 'area',
                name: 'av-short-area-setting',
                label:'地区设定',
                hasMenu:'AV_SHORT_AREA_SET',
                component: () => import('pages/AVShort/Area'),
              },
              {
                path: 'actress',
                name: 'av-short-actress-setting',
                label:'女优设定',
                hasMenu:'AV_SHORT_ACTRESS_SET',
                component: () => import('pages/AVShort/Actress'),
              },
              {
                path: 'cup',
                name: 'av-short-cup-setting',
                label:'罩杯设定',
                hasMenu:'AV_SHORT_CUP_SET',
                component: () => import('pages/AVShort/Cup'),
              },
              {
                path: 'type',
                name: 'av-short-type-setting',
                label:'类型设定',
                hasMenu:'AV_SHORT_TYPE_SET',
                component: () => import('pages/AVShort/Type'),
              },
              {
                path: 'year',
                name: 'av-short-year-setting',
                label:'年份设定',
                hasMenu:'AV_SHORT_YEAR_SET',
                component: () => import('pages/AVShort/Year'),
              },
              // {
              //   path: 'cup',
              //   name: 'av-short-cup-setting',
              //   label:'罩杯设定',
              //   hasMenu:'AV_SHORT_CUP_SET',
              //   component: () => import('pages/AVShort/Cup'),
              // },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AVShort'),
            children: [
              {
                path: 'topic-type',
                name: 'av-short-topic-type-setting',
                label:'专题分类',
                hasMenu:'AV_SHORT_TOPIC_TYPE',
                component: () => import('pages/AVShort/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'av-selfie',
        label:'成人自拍',
        icon:'fa fa-camera',
        component: () => import('pages/AVSelfie'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AVSelfie'),
            children: [
              {
                path: 'area',
                name: 'av-selfie-area-setting',
                label:'地区设定',
                hasMenu:'AV_SELFIE_AREA_SET',
                component: () => import('pages/AVSelfie/Area'),
              },
              {
                path: 'actress',
                name: 'av-selfie-actress-setting',
                label:'女优设定',
                hasMenu:'AV_SELFIE_ACTRESS_SET',
                component: () => import('pages/AVSelfie/Actress'),
              },

              {
                path: 'cup',
                name: 'av-selfie-cup-setting',
                label:'罩杯设定',
                hasMenu:'AV_SELFIE_CUP_SET',
                component: () => import('pages/AVSelfie/Cup'),
              },
              {
                path: 'type',
                name: 'av-selfie-type-setting',
                label:'类型设定',
                hasMenu:'AV_SELFIE_TYPE_SET',
                component: () => import('pages/AVSelfie/Type'),
              },
              {
                path: 'year',
                name: 'av-selfie-year-setting',
                label:'年份设定',
                hasMenu:'AV_SELFIE_YEAR_SET',
                component: () => import('pages/AVSelfie/Year'),
              },
              // {
              //   path: 'cup',
              //   name: 'av-selfie-cup-setting',
              //   label:'罩杯设定',
              //   hasMenu:'AV_SELFIE_CUP_SET',
              //   component: () => import('pages/AVSelfie/Cup'),
              // },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AVSelfie'),
            children: [
              {
                path: 'topic-type',
                name: 'av-selfie-topic-type-setting',
                label:'专题分类',
                hasMenu:'AV_SELFIE_TOPIC_TYPE',
                component: () => import('pages/AVSelfie/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'adult-photo',
        label:'成人写真',
        icon:'fa fa-file-image-o',
        component: () => import('pages/AdultPhoto'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AdultPhoto'),
            children: [
              {
                path: 'area',
                name: 'adult-photo-area-setting',
                label:'地区设定',
                hasMenu:'ADULT_PHOTO_AREA_SET',
                component: () => import('pages/AdultPhoto/Area'),
              },
              {
                path: 'actress',
                name: 'adult-photo-actress-setting',
                label:'女优设定',
                hasMenu:'ADULT_PHOTO_ACTRESS_SET',
                component: () => import('pages/AdultPhoto/Actress'),
              },
              {
                path: 'cup',
                name: 'adult-photo-cup-setting',
                label:'罩杯设定',
                hasMenu:'ADULT_PHOTO_CUP_SET',
                component: () => import('pages/AdultPhoto/Cup'),
              },
              {
                path: 'type',
                name: 'adult-photo-type-setting',
                label:'类型设定',
                hasMenu:'ADULT_PHOTO_TYPE_SET',
                component: () => import('pages/AdultPhoto/Type'),
              },
              {
                path: 'year',
                name: 'adult-photo-year-setting',
                label:'年份设定',
                hasMenu:'ADULT_PHOTO_YEAR_SET',
                component: () => import('pages/AdultPhoto/Year'),
              },
              // {
              //   path: 'cup',
              //   name: 'adult-photo-cup-setting',
              //   label:'罩杯设定',
              //   hasMenu:'ADULT_PHOTO_CUP_SET',
              //   component: () => import('pages/AdultPhoto/Cup'),
              // },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AdultPhoto'),
            children: [
              {
                path: 'topic-type',
                name: 'adult-photo-topic-type-setting',
                label:'专题分类',
                hasMenu:'ADULT_PHOTO_TOPIC_TYPE',
                component: () => import('pages/AdultPhoto/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'av',
        label:'成人视频',
        icon:'fa fa-video-camera',
        component: () => import('pages/AV'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AV'),
            children: [
              {
                path: 'area',
                name: 'av-area-setting',
                label:'地区设定',
                hasMenu:'AV_AREA_SET',
                component: () => import('pages/AV/Area'),
              },
              {
                path: 'actress',
                name: 'av-actress-setting',
                label:'女优设定',
                hasMenu:'AV_ACTRESS_SET',
                component: () => import('pages/AV/Actress'),
              },
              {
                path: 'cup',
                name: 'av-cup-setting',
                label:'罩杯设定',
                hasMenu:'AV_CUP_SET',
                component: () => import('pages/AV/Cup'),
              },
              {
                path: 'type',
                name: 'av-type-setting',
                label:'类型设定',
                hasMenu:'AV_TYPE_SET',
                component: () => import('pages/AV/Type'),
              },
              {
                path: 'year',
                name: 'av-year-setting',
                label:'年份设定',
                hasMenu:'AV_YEAR_SET',
                component: () => import('pages/AV/Year'),
              },
              // {
              //   path: 'cup',
              //   name: 'av-cup-setting',
              //   label:'罩杯设定',
              //   hasMenu:'AV_CUP_SET',
              //   component: () => import('pages/AV/Cup'),
              // },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AV'),
            children: [
              {
                path: 'topic-type',
                name: 'av-topic-type-setting',
                label:'专题分类',
                hasMenu:'AV_TOPIC_TYPE',
                component: () => import('pages/AV/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'adult-comic',
        label:'成人漫画',
        icon:'fa fa-video-camera',
        component: () => import('pages/AdultComic'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AV'),
            children: [
              {
                path: 'area',
                name: 'adult-comic-area-setting',
                label:'地区设定',
                hasMenu:'ADULT_COMIC_AREA_SET',
                component: () => import('pages/AdultComic/Area'),
              },
              {
                path: 'type',
                name: 'adult-comic-type-setting',
                label:'类型设定',
                hasMenu:'ADULT_COMIC_TYPE_SET',
                component: () => import('pages/AdultComic/Type'),
              },
              {
                path: 'year',
                name: 'adult-comic-year-setting',
                label:'年份设定',
                hasMenu:'ADULT_COMIC_YEAR_SET',
                component: () => import('pages/AdultComic/Year'),
              },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AdultComic'),
            children: [
              {
                path: 'topic-type',
                name: 'adult-comic-topic-type-setting',
                label:'专题分类',
                hasMenu:'ADULT_COMIC_TOPIC_TYPE',
                component: () => import('pages/AdultComic/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'adult-literature',
        label:'成人文学',
        icon:'fa fa-file',
        component: () => import('pages/AdultLiterature'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AdultLiterature'),
            children: [
              {
                path: 'area',
                name: 'adult-literature-area-setting',
                label:'地区设定',
                hasMenu:'ADULT_LITERATURE_AREA_SET',
                component: () => import('pages/AdultLiterature/Area'),
              },
              {
                path: 'type',
                name: 'adult-literature-type-setting',
                label:'类型设定',
                hasMenu:'ADULT_LITERATURE_TYPE_SET',
                component: () => import('pages/AdultLiterature/Type'),
              },
              {
                path: 'year',
                name: 'adult-literature-year-setting',
                label:'年份设定',
                hasMenu:'ADULT_LITERATURE_YEAR_SET',
                component: () => import('pages/AdultLiterature/Year'),
              },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AdultLiterature'),
            children: [
              {
                path: 'topic-type',
                name: 'adult-literature-topic-type-setting',
                label:'专题分类',
                hasMenu:'ADULT_LITERATURE_TOPIC_TYPE',
                component: () => import('pages/AdultLiterature/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'adult-story',
        label:'成人说书',
        icon:'fa fa-book',
        component: () => import('pages/AdultStory'),
        children: [
          {
            path: '',
            label:'分类管理',
            component: () => import('pages/AdultStory'),
            children: [
              {
                path: 'area',
                name: 'adult-story-area-setting',
                label:'地区设定',
                hasMenu:'ADULT_STORY_AREA_SET',
                component: () => import('pages/AdultStory/Area'),
              },
              {
                path: 'type',
                name: 'adult-story-type-setting',
                label:'类型设定',
                hasMenu:'ADULT_STORY_TYPE_SET',
                component: () => import('pages/AdultStory/Type'),
              },
              {
                path: 'year',
                name: 'adult-story-year-setting',
                label:'年份设定',
                hasMenu:'ADULT_STORY_YEAR_SET',
                component: () => import('pages/AdultStory/Year'),
              },
            ]
          },
          {
            path: '',
            label:'专题管理',
            component: () => import('pages/AdultStory'),
            children: [
              {
                path: 'topic-type',
                name: 'adult-story-topic-type-setting',
                label:'专题分类',
                hasMenu:'ADULT_STORY_TOPIC_TYPE',
                component: () => import('pages/AdultStory/TopicType'),
              },
            ]
          },
        ],
      },
      {
        path: 'history',
        label:'历程记录',
        icon:'fa fa-history',
        component: () => import('pages/HistoryRecord'),
        children: [
          {
            path: 'account-login',
            name: 'account-login-history',
            label:'帐号登入历程',
            hasMenu:'ACCOUNT_LOGIN_HISTORY',
            component: () => import('pages/HistoryRecord/AccountLogin'),
          },
          {
            path: 'member-login',
            name: 'member-login-history',
            label:'会员登入历程',
            hasMenu:'MEMBER_LOGIN_HISTORY',
            component: () => import('pages/HistoryRecord/MemberLogin'),
          },
        ],
      },
]
