import loadable from '@loadable/component'

const Home  = loadable(() => import('../pages/Home'))
const About = loadable(() => import('../pages/About'))

export default [
    {
        route: "/",
        component: Home
    },
    {
        route: "/about",
        component: About
    },
]