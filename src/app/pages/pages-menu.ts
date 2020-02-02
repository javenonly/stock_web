import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'E-commerce',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'K线形态检索',
    icon: 'grid-outline',
    children: [
      {
        title: '自定义检索',
        link: '/pages/stockSearch',
      },
      {
        title: '套餐检索',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'T-lib模式识别',
    icon: 'grid-outline',
    children: [
      {
        title: 'CDL2CROWS',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'CDL3BLACKCROWS',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
];
