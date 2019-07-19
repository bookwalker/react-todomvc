import React from "react";
import {Keys} from "./Keys";

export class InputField extends React.Component {

    handleKeyUp(event) {
        if (event.keyCode !== Keys.ENTER_KEY) {
            return;
        }
        this.props.onSubmit(event.target.value);
        event.target.value = '';
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       onKeyUp={(event) => this.handleKeyUp(event)}
                       autoFocus/>
            </header>
        );
    }
}
