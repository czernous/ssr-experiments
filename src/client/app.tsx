import { Link, Route, Switch } from "inferno-router"
import About from "./pages/About"
import Home from "./pages/Home"


const App = () => {
  

  return (
    <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <hr />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
  </div>
  
)}

export default App