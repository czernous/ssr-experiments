import { Link, Route, Switch } from 'inferno-router';
import routes from './routes';
import { IRouteProp } from '../interfaces/route-props';

const App = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
            </ul>
            <hr />
            <Switch>
                {routes.map(
                    (route: IRouteProp, idx: number): JSX.Element => (
                        <Route
                            key={idx}
                            exact
                            path={route.route}
                            component={route.component}
                        />
                    )
                )}
            </Switch>
        </>
    );
};

export default App;
