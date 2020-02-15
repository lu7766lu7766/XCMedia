export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login'),
  },
  {
    path: '',
    component: () => import('pages/Index'),
    children: [
      {
        path: '',
        name: 'welcome',
        component: () => import('pages/Index/Welcome'),
      },
      {
        path: '/edit-profile',
        name: 'edit-profile',
        component: () => import('pages/Index/Profile'),
      },
      {
        path: '/member-manage',
        name: 'member-manage',
        component: () => import('pages/MemberManage'),
      },
      {
        path: '/sys-setting',
        component: () => import('pages/SysSetting'),
        children: [
          {
            path: '/role-manage',
            name: 'role-manage',
            component: () => import('pages/SysSetting/RoleSetting'),
          },
          {
            path: '/account-manage',
            name: 'account-manage',
            component: () => import('pages/SysSetting/AccountManage'),
          },
          {
            path: '/site-manage',
            name: 'site-manage',
            component: () => import('pages/SysSetting/SiteManage'),
          },
        ],
      },
      {
        path: '/website-manage',
        component: () => import('pages/WebManage'),
        children: [
          {
            path: '/announce-manage',
            name: 'announce-manage',
            component: () => import('pages/WebManage/AnnounceManage'),
          },
          {
            path: '/ad-slider',
            name: 'ad-slider',
            component: () => import('pages/WebManage/ADSlider'),
          }, {
            path: '/qa',
            name: 'qa',
            component: () => import('pages/WebManage/QA'),
          },
          {
            path: '/page-manage',
            name: 'page-manage',
            component: () => import('pages/WebManage/PageManage'),
          },
        ],
      },
      {
        path: '/drama',
        component: () => import('pages/Drama'),
        children: [
          {
            path: '/source',
            name: 'drama-source-setting',
            component: () => import('pages/Drama/Source'),
          },
        ],
      },
      {
        path: '/movie',
        component: () => import('pages/Movie'),
        children: [
          {
            path: '/source',
            name: 'movie-source-setting',
            component: () => import('pages/Movie/Source'),
          },
        ],
      },
      {
        path: '/anime',
        component: () => import('pages/Anime'),
        children: [
          {
            path: '/source',
            name: 'anime-source-setting',
            component: () => import('pages/Anime/Source'),
          },
        ],
      },
      {
        path: '/veriety',
        component: () => import('pages/Veriety'),
        children: [
          {
            path: '/source',
            name: 'veriety-source-setting',
            component: () => import('pages/Veriety/Source'),
          },
        ],
      },
      {
        path: '/account-login-history',
        name: 'account-login-history',
        component: () => import('pages/HistoryRecord/AccountLogin'),
      },
    ],
  },
  {path: '*', redirect: '/login'},
]
