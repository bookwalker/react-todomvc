import React from 'react';
import ReactDOM from 'react-dom';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {TodoService} from "./TodoService";


const todoService = new TodoService();
ReactDOM.render(<App todos={todoService} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
