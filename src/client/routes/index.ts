import { IRouteProp } from '../../interfaces/route-props';
import asyncComponent from 'inferno-async-component';

const routes: IRouteProp[] = [
    {
        route: '/',
        component: asyncComponent(
            () => import('../pages/Home' /* webpackChunkName: "pages-home" */)
        ),
        metaData: {
            pageTitle: 'Home',
            metaDescription: 'cool website for you',
            metaKeywords: '',
        },
    },
    {
        route: '/about',
        component: asyncComponent(
            () => import('../pages/About' /* webpackChunkName: "pages-about" */)
        ),
        metaData: {
            pageTitle: 'About',
            metaDescription: 'This is an about page',
            metaKeywords: 'srr, inferno, fastify',
        },
    },
];

export default routes;
