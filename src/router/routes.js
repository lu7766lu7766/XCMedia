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
