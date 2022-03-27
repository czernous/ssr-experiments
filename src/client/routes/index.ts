import loadable from '@loadable/component'

const Home  = loadable(() => import(/* webpackChunkName: "pages-Home" */ '../pages/Home'))
const About = loadable(() => import(/* webpackChunkName: "pages-About" */'../pages/About'))

export default [
    {
        path: "/",
        element: Home,
        exact: true
    },
    {
        path: "/about",
        element: About,
        exact: true
    },
]