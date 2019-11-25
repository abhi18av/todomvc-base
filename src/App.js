import React from "react";

//=============================
// constants
//=============================

//=============================
// utils
//=============================

//=============================
// components
//=============================


export class AddTodo extends React.Component {

    constructor() {
        super();
        // NOTE `AddTodo` component local state
        this.state = {
            todo: '',
        }
    }

    updateInput = (e) => {
        this.setState({todo: e.target.value});
    };

    submitTodo = (e) => {
        e.preventDefault();
        console.log(this.state);
        // TODO add this item into the `App` components `state` - `component drilling`
        this.props.addTodoFn(this.state.todo);
        // NOTE accessing the raw DOM method to reset the state of the input
        document.getElementById('addTodoInput').value = '';
    };

    render() {
        return (
            <div className='addTodoContainer'>
                <form onSubmit={(e) => this.submitTodo(e)}>
                    <input id='addTodoInput'
                           onChange={(e) => this.updateInput(e)}
                           type='text'>
                    </input>
                    <button type='submit'>Add Todo</button>
                </form>
            </div>
        );
    }
}


export class TodoItem extends React.Component {

    render() {
        const todoItem = this.props.todo;

        return (
            <>
                <div>{todoItem}</div>
            </>
        );
    }
}



//=============================
// containers
//=============================


export class TodoList extends React.Component {

    render() {

        const {todos} = this.props;

        return (
            <div className='todoListContainer'>
                {
                    todos.map((_todo, _index) => <TodoItem key={_index} todo={_todo}/>)

                }
            </div>
        );
    }
}


//=============================
// App
//=============================


export class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };

    }


    //NOTE set the `todos` key as a collection of previous/current this.state.todos along with the new todo
    //NOTE we'll pass this method to the `AddTodo` component as a property.
    addTodo = async (todo) => {
        // NOTE we need to wait for this async function to wait before adding the todo
        await this.setState({todos: [...this.state.todos, todo]});

        localStorage.setItem('todos', JSON.stringify(this.state.todos));

    };


    componentDidMount() {

        const todos = localStorage.getItem('todos');

        if (todos) {

            const savedTodos = JSON.parse(todos);

            this.setState({todos: savedTodos});

            console.log('Has Todos in LocalStorage ', todos)

        } else {
            console.log('NO Todos in LocalStorage ', todos)
        }
    }

    render() {
        return (
            <>
                <h1>TodoMVC</h1>
                <TodoList todos={this.state.todos}/>
                <AddTodo addTodoFn={this.addTodo}/>
            </>
        );
    }
}

