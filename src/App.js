import React from "react";

//=============================
// constants
//=============================

//=============================
// utils
//=============================

//=============================
// App
//=============================


export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: ["task1", "task2"],
            todo: ''
        };
    };

    updateInput = (e) => {
        this.setState({todo: e.target.value});
    };

    submitTodo = (e) => {
        e.preventDefault();
        this.addTodo(this.state.todo);
    };

    addTodo = (todo) => {
        this.setState({todos: [...this.state.todos, todo]});
        document.getElementById('inputBox').value = '';
        console.log(this.state);
    };


    componentDidMount() {

        const todos = localStorage.getItem('todos');

        if (todos) {
            const savedTodos = JSON.parse(todos);
            console.log("HAS todos", savedTodos);
            this.setState({todos: savedTodos});

        } else {
            console.log("NO todos");
        }
    };


    render() {

        const {todos} = this.state;


        return (
            <>
                <div className="App">
                    <header className="App-header">Master React</header>
                </div>

                { // render the current tasks of `todos` variable
                    todos.map((_aTask, _index) => <div key={_index}>{_aTask}</div>)
                }

                <form onSubmit={(e) => this.submitTodo(e)}>
                    <input
                        id='inputBox'
                        type='text'
                        onChange={(e) => this.updateInput(e)}>
                    </input>

                    <button
                        type='submit'>
                        Add Task
                    </button>
                </form>

            </>
        );
    }
}
