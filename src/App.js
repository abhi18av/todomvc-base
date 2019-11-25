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
    };

    render() {
        return (
            <div className='addTodoContainer'>
                <form onSubmit={(e) => this.submitTodo(e)}>
                    <input
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
        return (
            <>
                <AddTodo/>
            </>
        );
    }
}



//=============================
// containers
//=============================


export class TodoList extends React.Component {

    render() {
        return (
            <>
                <TodoItem/>
            </>
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

    componentDidMount() {

        const todos = localStorage.getItem('todos');

        if (todos) {

            const savedTodos = JSON.parse(todos);

            this.setState({todos: savedTodos});

            console.log('Has Todos ', todos)

        } else {
            console.log('No Todos ', todos)
        }
    }

    render() {
        return (
            <>
                <p>TodoMVC</p>
                <TodoList/>
                {JSON.stringify(this.state)}
            </>
        );
    }
}

