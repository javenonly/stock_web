import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title: 'user',
    icon: 'lock-outline',
    children: [
      {
        title: '添加用户',
        link: '/pages/user/createUser',
      },
      {
        title: '用户一览',
        link: '/pages/user/userList',
      },
      {
        title: '角色管理',
        link: '/pages/roleList',
      },
    ],
  },
];
