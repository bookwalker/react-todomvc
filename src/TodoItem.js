import React from "react";
import {Keys} from "./Keys";

export class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editing: false};
    }

    startEdit() {
        this.setState({editing: true});
    }

    stopEdit() {
        this.setState({editing: false});
    }

    handleKeyUp(event) {
        if (event.keyCode === Keys.ESC_KEY) {
            this.stopEdit();
        } else if(event.keyCode === Keys.ENTER_KEY) {
            this.stopEdit();
            const changedTitle = event.target.value;
            this.props.onSave(changedTitle)
        }
    }

    render() {
        const item = this.props.item;
        const editing = this.state.editing;

        const classes = [];
        if (item.completed) {
            classes.push('completed');
        }
        if (editing) {
            classes.push('editing');
        }

        return (
            <li className={classes.join(' ')}>
                <div className="view">
                    <input className="toggle" type="checkbox" defaultChecked={item.completed}
                           onChange={() => this.props.onToggle()}/>
                    {editing ? null : (<label onDoubleClick={() => this.startEdit()}>{item.title}</label>)}
                    <button className="destroy"
                            onClick={() => this.props.onDelete()}/>
                </div>
                {editing ? (<input className="edit" defaultValue={item.title}
                                   onKeyUp={(event) => this.handleKeyUp(event)}
                                   onBlur={() => this.stopEdit()} autoFocus/>) : ('')}
            </li>
        );
    }
}
