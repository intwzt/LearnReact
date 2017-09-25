import React from 'react'
import TodoRow from './TodoRow'

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleDelete(index) {
        this.props.deleteTodo(index);
    }

    handleComplete(index) {
        this.props.completeTodo(index);
    }

    render() {
        const filterState = this.props.filterState;
        let rows = [];
        this.props.todos.forEach((todo) => {
            if (todo.status === filterState || filterState === 'ALL') {
                rows.push(todo);
            }
        });
        return (
            <ul>
                {rows.map((row, index) =>
                    <TodoRow key={index}
                             content={row.content}
                             id={row.index}
                             deleteRow={this.handleDelete}
                             completeRow={this.handleComplete}
                    />)}
            </ul>
        );
    }
}

export default TodoList;