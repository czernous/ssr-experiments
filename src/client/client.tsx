import { hydrate } from 'inferno-hydrate';
import { BrowserRouter } from "inferno-router";
import App from './app'


hydrate(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))