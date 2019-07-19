import {Todo} from "./Todo";

export class TodoService {

    static STORAGE_KEY = 'todos-react';
    lastInsertId = 0;
    todos = [];

    constructor() {
        this.fetch();
        if (this.todos.length > 0) {
            this.lastInsertId = this.todos[this.todos.length - 1].id;
        }
    }

    create(title) {
        title =  title.trim();
        if (title.length === 0) {
            return;
        }
        const newTodo = new Todo(++this.lastInsertId, title);
        this.todos.push(newTodo);
        this.save();
        return newTodo;
    }

    findAll() {
        return this.todos;
    }

    update(todo) {
        todo.title = todo.title.trim();
        if (todo.title.length === 0) {
            this.delete(todo);
        }
        this.save();
    }

    delete(todo) {
        this.todos = this.todos.filter((t) => t !== todo);
        this.save();
    }

    toggle(todo) {
        todo.completed = !todo.completed;
        this.save();
    }

    toggleAll(completed) {
        this.todos.forEach((t) => t.completed = completed);
        this.save();
    }

    clearCompleted() {
        this.todos = this.todos.filter((t) => !t.completed);
        this.save();
    }

    fetch() {
        const persistedValue = localStorage.getItem(TodoService.STORAGE_KEY);
        try {
            this.todos = JSON.parse(persistedValue || '[]');
        } catch (ignore) {
            this.todos = [];
        }
    }

    save() {
        localStorage.setItem(TodoService.STORAGE_KEY, JSON.stringify(this.todos));
    }
}
