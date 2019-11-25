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
            todo: null
        };
    }

    updateInput = e => {
        this.setState({todo: e.target.value});
    };

    // NOTE it's good to have this as a separate method but now it's almost indistinguishable from the event handlers
    // TODO merge this function with the submitTodo
    addTodo = async todo => {
        await this.setState({
            todos: [...this.state.todos, {text: todo, completed: false}]
        });

        localStorage.setItem("todos", JSON.stringify(this.state.todos));

        document.getElementById("inputBox").value = "";
        console.log(this.state.todo);
    };

    submitTodo = e => {
        e.preventDefault();
        this.addTodo(this.state.todo);
    };

    updateTodo = todo => {
        const newTodos = this.state.todos.map(_todo => {
            if (_todo === todo) {
                const aTodo = {
                    text: _todo.text,
                    completed: !_todo.completed
                };
                console.log(aTodo);
                return aTodo;
            } else {
                return _todo;
            }
        });

        console.log("newTodos: ", newTodos);
    };

    toggleTodo = () => {
        this.updateTodo(this.state.todo);
    };

    // DONE detect which todo is being clicked
    // clickDetecter = e => {
    //     console.log(e.target.innerText);
    //     const clickedTodo = e.target.innerText;
    //     console.log(this.state.todos.filter(_todo => {
    //         return _todo.text === clickedTodo
    //     }));
    // };

    componentDidMount() {
        const todos = localStorage.getItem("todos");

        if (todos) {
            const savedTodos = JSON.parse(todos);
            console.log("HAS todos", savedTodos);
            this.setState({todos: savedTodos});
        } else {
            console.log("NO todos");
        }
    }

    render() {
        const {todos} = this.state;

        return (
            <>
                <div className="App">
                    <header className="App-header">Master React</header>
                </div>

                <form onSubmit={e => this.submitTodo(e)}>
                    <input
                        id="inputBox"
                        type="text"
                        onChange={e => this.updateInput(e)}
                    ></input>

                    <button type="submit">Add Task</button>
                </form>

                {// render the current tasks of `todos` variable
                    todos.map((_aTask, _index) => (
                        <div key={_index}
                            // onClick={e => this.clickDetecter(e)}
                             onClick={e => this.clickDetecter(e)}
                        >
                            {_aTask.text}
                        </div>
                    ))}
            </>
        );
    }
}
