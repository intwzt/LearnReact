import React from 'react'


class TodoRow extends React.Component {
    constructor(props) {
        super(props)
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleDelete() {
        this.props.deleteRow(this.props.id);
    }

    handleComplete() {
        this.props.completeRow(this.props.id);
    }

    render() {
        return (
            <li>
                {this.props.content}
                <button onClick={this.handleComplete}>complete</button>
                <button onClick={this.handleDelete}>delete</button>
            </li>
        )
    }
}

export default TodoRow;