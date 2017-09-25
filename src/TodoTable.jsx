import React from 'react';
import TodoList from './TodoList'
import FilterBar from './FilterBar'
import InputRow from './InputRow'


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
        todoList: this.props.todos,
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
        for (let i = 0; i < this.state.todoList.length; ++i) {
            if (this.state.todoList[i].index === index) {
                target = i;
            }
        }
        this.setState({
            todoList: this.state.todoList.filter((_, i) => i !== target)
        })
    }

    handleComplete(index) {
        let newTodoList = [];
        for (let i = 0; i < this.state.todoList.length; ++i) {
            if (this.state.todoList[i].index === index) {
                newTodoList.push({content: this.state.todoList[i].content, status: 'Complete', index: index})
            }else {
                newTodoList.push(this.state.todoList[i]);
            }
        }

        this.setState({
            todoList: newTodoList
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
                    filterHandler={this.handleFilterState}
                    NumOfItems={this.state.todoList.length}
                    filterState={this.state.filterState}
                />
            </div>
        )
    }
}

export default TodoTable;
