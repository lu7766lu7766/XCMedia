export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login'),
  },
  {
    path: '/',
    component: () => import('pages/index'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Index/Welcome'),
      },
      {
        path: 'edit-profile',
        name: 'edit-profile',
        component: () => import('pages/Index/Profile'),
      },
      {
        path: 'member-manage',
        name: 'member-manage',
        component: () => import('pages/MemberManage'),
      },
      {
        path: 'sys-setting',
        component: () => import('pages/SysSetting'),
        children: [
          {
            path: 'role-manage',
            name: 'role-manage',
            component: () => import('pages/SysSetting/RoleSetting'),
          },
          {
            path: 'account-manage',
            name: 'account-manage',
            component: () => import('pages/SysSetting/AccountManage'),
          },
          {
            path: 'site-manage',
            name: 'site-manage',
            component: () => import('pages/SysSetting/SiteManage'),
          },
        ],
      },
      {
        path: 'website-manage',
        component: () => import('pages/WebManage'),
        children: [
          {
            path: 'announce-manage',
            name: 'announce-manage',
            component: () => import('pages/WebManage/AnnounceManage'),
          },
          {
            path: 'ad-slider',
            name: 'ad-slider',
            component: () => import('pages/WebManage/ADSlider'),
          }, {
            path: 'qa',
            name: 'qa',
            component: () => import('pages/WebManage/QA'),
          },
          {
            path: 'page-manage',
            name: 'page-manage',
            component: () => import('pages/WebManage/PageManage'),
          },
        ],
      },
      {
        path: 'drama',
        component: () => import('pages/Drama'),
        children: [
          {
            path: 'source',
            name: 'drama-source-setting',
            component: () => import('pages/Drama/Source'),
          },
          {
            path: 'type',
            name: 'drama-type-setting',
            component: () => import('pages/Drama/Type'),
          },
          {
            path: 'language',
            name: 'drama-language-setting',
            component: () => import('pages/Drama/Lang'),
          },
          {
            path: 'year',
            name: 'drama-year-setting',
            component: () => import('pages/Drama/Year'),
          },
          {
            path: 'area',
            name: 'drama-area-setting',
            component: () => import('pages/Drama/Area'),
          },
        ],
      },
      {
        path: 'movie',
        component: () => import('pages/Movie'),
        children: [
          {
            path: 'source',
            name: 'movie-source-setting',
            component: () => import('pages/Movie/Source'),
          },
          {
            path: 'type',
            name: 'movie-type-setting',
            component: () => import('pages/Movie/Type'),
          },
          {
            path: 'language',
            name: 'movie-language-setting',
            component: () => import('pages/Movie/Lang'),
          },
          {
            path: 'year',
            name: 'movie-year-setting',
            component: () => import('pages/Movie/Year'),
          },
          {
            path: 'area',
            name: 'movie-area-setting',
            component: () => import('pages/Movie/Area'),
          },
        ],
      },
      {
        path: 'anime',
        component: () => import('pages/Anime'),
        children: [
          {
            path: 'source',
            name: 'anime-source-setting',
            component: () => import('pages/Anime/Source'),
          },
          {
            path: 'type',
            name: 'anime-type-setting',
            component: () => import('pages/Anime/Type'),
          },
          {
            path: 'language',
            name: 'anime-language-setting',
            component: () => import('pages/Anime/Lang'),
          },
          {
            path: 'year',
            name: 'anime-year-setting',
            component: () => import('pages/Anime/Year'),
          },
          {
            path: 'area',
            name: 'anime-area-setting',
            component: () => import('pages/Anime/Area'),
          },
        ],
      },
      {
        path: 'variety',
        component: () => import('pages/Variety'),
        children: [
          {
            path: 'source',
            name: 'variety-source-setting',
            component: () => import('pages/Variety/Source'),
          },
          {
            path: 'type',
            name: 'variety-type-setting',
            component: () => import('pages/Variety/Type'),
          },
          {
            path: 'language',
            name: 'variety-language-setting',
            component: () => import('pages/Variety/Lang'),
          },
          {
            path: 'year',
            name: 'variety-year-setting',
            component: () => import('pages/Variety/Year'),
          },
          {
            path: 'area',
            name: 'variety-area-setting',
            component: () => import('pages/Variety/Area'),
          },
        ],
      },
      {
        path: 'av-long',
        component: () => import('pages/AVLong'),
        children: [
          {
            path: 'type',
            name: 'av-long-type-setting',
            component: () => import('pages/AVLong/Type'),
          },
          {
            path: 'year',
            name: 'av-long-year-setting',
            component: () => import('pages/AVLong/Year'),
          },
          {
            path: 'area',
            name: 'av-long-area-setting',
            component: () => import('pages/AVLong/Area'),
          },
          {
            path: 'actress',
            name: 'av-long-actress-setting',
            component: () => import('pages/AVLong/Actress'),
          },
        ],
      },
      {
        path: 'av-short',
        component: () => import('pages/AVShort'),
        children: [
          {
            path: 'type',
            name: 'av-short-type-setting',
            component: () => import('pages/AVShort/Type'),
          },
          {
            path: 'year',
            name: 'av-short-year-setting',
            component: () => import('pages/AVShort/Year'),
          },
          {
            path: 'area',
            name: 'av-short-area-setting',
            component: () => import('pages/AVShort/Area'),
          },
          {
            path: 'actress',
            name: 'av-short-actress-setting',
            component: () => import('pages/AVShort/Actress'),
          },
        ],
      },
      {
        path: 'av-selfie',
        component: () => import('pages/AVSelfie'),
        children: [
          {
            path: 'type',
            name: 'av-selfie-type-setting',
            component: () => import('pages/AVSelfie/Type'),
          },
          {
            path: 'year',
            name: 'av-selfie-year-setting',
            component: () => import('pages/AVSelfie/Year'),
          },
          {
            path: 'area',
            name: 'av-selfie-area-setting',
            component: () => import('pages/AVSelfie/Area'),
          },
          {
            path: 'actress',
            name: 'av-selfie-actress-setting',
            component: () => import('pages/AVSelfie/Actress'),
          },
        ],
      },
      {
        path: 'adult-photo',
        component: () => import('pages/AdultPhoto'),
        children: [
          {
            path: 'type',
            name: 'adult-photo-type-setting',
            component: () => import('pages/AdultPhoto/Type'),
          },
          {
            path: 'year',
            name: 'adult-photo-year-setting',
            component: () => import('pages/AdultPhoto/Year'),
          },
          {
            path: 'area',
            name: 'adult-photo-area-setting',
            component: () => import('pages/AdultPhoto/Area'),
          },
          {
            path: 'actress',
            name: 'adult-photo-actress-setting',
            component: () => import('pages/AdultPhoto/Actress'),
          },
        ],
      },
      {
        path: 'av',
        component: () => import('pages/AV'),
        children: [
          {
            path: 'type',
            name: 'av-type-setting',
            component: () => import('pages/AV/Type'),
          },
          {
            path: 'year',
            name: 'av-year-setting',
            component: () => import('pages/AV/Year'),
          },
          {
            path: 'area',
            name: 'av-area-setting',
            component: () => import('pages/AV/Area'),
          },
          {
            path: 'actress',
            name: 'av-actress-setting',
            component: () => import('pages/AV/Actress'),
          },
        ],
      },
      {
        path: 'adult-comic',
        component: () => import('pages/AdultComic'),
        children: [
          {
            path: 'type',
            name: 'adult-comic-type-setting',
            component: () => import('pages/AdultComic/Type'),
          },
          {
            path: 'year',
            name: 'adult-comic-year-setting',
            component: () => import('pages/AdultComic/Year'),
          },
          {
            path: 'area',
            name: 'adult-comic-area-setting',
            component: () => import('pages/AdultComic/Area'),
          },
        ],
      },
      {
        path: 'adult-literature',
        component: () => import('pages/AdultLiterature'),
        children: [
          {
            path: 'type',
            name: 'adult-literature-type-setting',
            component: () => import('pages/AdultLiterature/Type'),
          },
          {
            path: 'year',
            name: 'adult-literature-year-setting',
            component: () => import('pages/AdultLiterature/Year'),
          },
          {
            path: 'area',
            name: 'adult-literature-area-setting',
            component: () => import('pages/AdultLiterature/Area'),
          },
        ],
      },
      {
        path: 'adult-story',
        component: () => import('pages/AdultStory'),
        children: [
          {
            path: 'type',
            name: 'adult-story-type-setting',
            component: () => import('pages/AdultStory/Type'),
          },
          {
            path: 'year',
            name: 'adult-story-year-setting',
            component: () => import('pages/AdultStory/Year'),
          },
          {
            path: 'area',
            name: 'adult-story-area-setting',
            component: () => import('pages/AdultStory/Area'),
          },
        ],
      },
      {
        path: 'account-login-history',
        name: 'account-login-history',
        component: () => import('pages/HistoryRecord/AccountLogin'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/login',
  },
]
