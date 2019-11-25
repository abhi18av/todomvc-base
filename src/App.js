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
            todos: ["task1", "task2"]
        };
    };


    onChangeHandler = (e) => {
        console.log(e);
    };


    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e);
    };

    addTask = () => {

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

                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                    <input
                        type='text'
                        onChange={(e) => this.onChangeHandler(e)}>
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
