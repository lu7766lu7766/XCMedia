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
        path: '/account-login-history',
        name: 'account-login-history',
        component: () => import('pages/HistoryRecord/AccountLogin'),
      },
    ],
  },
  {path: '*', redirect: '/login'},
]