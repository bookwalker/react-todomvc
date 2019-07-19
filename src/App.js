import React from 'react';
import {InputField} from "./InputField";
import {TodoItem} from "./TodoItem";
import {HashRouter as Router, Link, Route, Switch} from "react-router-dom";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos.findAll()
        };
    }

    fetchTodos() {
        this.setState({todos: this.props.todos.findAll()});
    }

    create(title) {
        this.props.todos.create(title);
        this.fetchTodos();
    }

    save(item, changedTitle) {
        item.title = changedTitle;
        this.props.todos.update(item);
        this.fetchTodos();
    }

    delete(item) {
        this.props.todos.delete(item);
        this.fetchTodos();
    }

    toggle(item) {
        item.completed = !item.completed;
        this.props.todos.update(item);
        this.fetchTodos();
    }

    clearCompleted() {
        this.props.todos.clearCompleted();
        this.fetchTodos();
    }

    renderItems(items, filterFn) {
        if (items.length === 0) {
            return null;
        }

        return (<ul className="todo-list">
            {items
                .filter(filterFn)
                .map((item, index) => (
                <TodoItem key={item.id}
                          item={item}
                          onDelete={() => this.delete(item)}
                          onToggle={() => this.toggle(item)}
                          onSave={this.save.bind(this, item)}/>
            ))}
        </ul>);
    }

    render() {
        const items = this.state.todos;

        let completed = 0;
        let remaining = 0;
        items.forEach(it => {
            it.completed ? completed++ : remaining++
        });

        return (
            <div>
                <section className="todoapp">
                    <InputField onSubmit={(title) => this.create(title)}/>

                    <Router>
                        <Switch>
                            <Route exact path="/">
                                {this.renderItems(items, (item) => true)}
                            </Route>
                            <Route exact path="/active">
                                {this.renderItems(items, (item) => !item.completed)}
                            </Route>
                            <Route exact path="/completed">
                                {this.renderItems(items, (item) => item.completed)}
                            </Route>
                        </Switch>
                    </Router>

                    {items.length > 0 && (
                        <footer className="footer">
                            <span className="todo-count"><strong>{remaining}</strong> item{remaining > 1 && ('s')} left</span>
                            <ul className="filters">
                                <Router>
                                    <li><Link to="/">All</Link></li>
                                    <li><Link to="active">Active</Link></li>
                                    <li><Link to="completed">Completed</Link></li>
                                </Router>
                            </ul>
                            {completed > 0 && (<button className="clear-completed" onClick={() => this.clearCompleted()}>Clear completed</button>)}
                        </footer>
                    )}
                </section>
                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="https://github.com/bookwalker">Bookwalker</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        );
    }
}

export default App;
