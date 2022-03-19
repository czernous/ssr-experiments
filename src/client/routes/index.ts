import Home from '../pages/Home'
import About from '../pages/About'
import {IRoute} from '../../interfaces/route-props'
//@ts-ignore
import asyncComponent from 'inferno-async-component';


const routes: IRoute[] = [
    {
        route: "/",
        component: asyncComponent(() => import('../pages/Home'  /* webpackChunkName: "pages-home" */))
    },
    {
        route: "/about",
        component: asyncComponent(() => import('../pages/About' /* webpackChunkName: "pages-about" */))
    },
];

export default routes;