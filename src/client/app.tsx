import { Link, Route, Switch } from "inferno-router"
import asyncComponent from 'inferno-async-component';
import routes from './routes'
import { IRoute } from "../interfaces/route-props";

const AsyncHome = asyncComponent(() => import('./pages/Home'  /* webpackChunkName: "pages-home" */));
const AsyncAbout = asyncComponent(() => import('./pages/About' /* webpackChunkName: "pages-about" */));

const App = () => {
  return (
    <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <hr />
    <Switch>
      <Route exact path="/" component={AsyncHome} />
        <Route exact path="/about" component={AsyncAbout} />
        {
          routes.map((route: IRoute): JSX.Element => 
            <Route path={route.route} component={route.component} />)
        }
    </Switch>
  </div>
  
)}

export default App