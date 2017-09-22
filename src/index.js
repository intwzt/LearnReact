import React from 'react';
import ReactDOM from 'react-dom';


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
        console.log("999999999999");
        let rows = [];
        this.props.todos.forEach((todo) => {
            console.log(todo);
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

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleAllStatusChange = this.handleAllStatusChange.bind(this);
        this.handleActiveStatusChange = this.handleActiveStatusChange.bind(this);
        this.handleCompleteStatusChange = this.handleCompleteStatusChange.bind(this);
    }

    handleAllStatusChange() {
        this.props.filterState('ALL');
    }

    handleActiveStatusChange() {
        this.props.filterState('Active');
    }

    handleCompleteStatusChange() {
        this.props.filterState('Complete');
    }


    render() {
        const {ALLStatus, Active, Complete, NumOfItems} = this.props;
        return (
            <p>
                {NumOfItems} items left
                ALL
                <input type='checkbox' checked={ALLStatus} onChange={this.handleAllStatusChange}/>
                Active
                <input type='checkbox' checked={Active} onChange={this.handleActiveStatusChange}/>
                Complete
                <input type='checkbox' checked={Complete} onChange={this.handleCompleteStatusChange}/>
            </p>
        )
    }

}

class InputRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        let newTodo = {content: this.state.value, status: 'Active', index: this.props.numOfTodo + 1};
        this.props.addNum();
        this.props.addTodo(newTodo);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>add</button>
            </div>
        );
    }
}


class TodoTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleFilterState = this.handleFilterState.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleNum = this.handleNum.bind(this);
    }

    state = {
        NumOfTodo: 0,
        filterState: 'ALL',
        todoList: this.props.todos
    };

    handleAddTodo(todo) {
        this.setState({
            todoList: [...this.state.todoList, todo]
        })
    }

    handleFilterState(filterState) {
        this.setState({filterState})
    }

    handleDelete(index) {

        let target = -1;
        for (let i = 0; i < this.state.todoList.length; i++) {
            if (this.state.todoList[i].index === index) {
                target = i;
            }
        }
        this.setState({
            todoList: this.state.todoList.filter((_, i) => i !== target)
        })
    }

    handleComplete(index) {
        const todoList = this.state.todoList.map((list, i) => {
            if (i === index) {
                list.status = 'Complete';
            }
            return list;
        });

        this.setState({
            todoList
        });
    }

    handleNum() {
        let num = this.state.NumOfTodo;
        this.setState({NumOfTodo: num + 1});
    }


    render() {
        return (
            <div>
                <InputRow
                    addTodo={this.handleAddTodo}
                    addNum={this.handleNum}
                    numOfTodo={this.state.NumOfTodo}
                />
                <TodoList
                    todos={this.state.todoList}
                    filterState={this.state.filterState}
                    deleteTodo={this.handleDelete}
                    completeTodo={this.handleComplete}
                />
                <FilterBar
                    filterState={this.handleFilterState}
                    NumOfItems={this.state.todoList.length}
                />
            </div>
        )
    }
}


ReactDOM.render(
    <TodoTable todos={[]}/>,
    document.getElementById('root')
);

