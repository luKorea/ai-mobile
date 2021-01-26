import Loadable from "../utils/loadable";

export default [
    {
        path: '/login',
        exact: true,
        title: '登陆',
        component: Loadable(() => import('@/pages/Login/index'))
    },
    {
        path: '/home',
        exact: true,
        title: '师大教育',
        component: Loadable(() => import('@/pages/Home/index'))
    },
    {
        path: '/live',
        exact: true,
        title: '师大教育',
        component: Loadable(() => import('@/pages/Live/index'))
    }
];