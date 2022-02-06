import { Component } from "inferno";
import { hydrate } from 'inferno-hydrate';
import App from './components/app'

const wrapper = (<App />)

hydrate(wrapper, document.getElementById('root'))