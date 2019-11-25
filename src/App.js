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
            todos: [],
            todo: ''
        };
    };

    updateInput = (e) => {
        this.setState({todo: e.target.value});
    };

    // NOTE it's good to have this as a separate method but now it's almost indistinguishable from the event handlers
    // TODO merge this function with the submitTodo
    addTodo = async (todo) => {
        await this.setState({todos: [...this.state.todos, todo]});

        localStorage.setItem('todos', JSON.stringify(this.state.todos));

        document.getElementById('inputBox').value = '';
        console.log(this.state.todo);
    };

    submitTodo = (e) => {
        e.preventDefault();
        this.addTodo(this.state.todo);
    };


    toggleTodo = () => {

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


                { // render the current tasks of `todos` variable
                    todos.map((_aTask, _index) => <div key={_index}>{_aTask}</div>)
                }

            </>
        );
    }
}
