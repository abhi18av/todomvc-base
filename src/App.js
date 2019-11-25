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

    onChangeUpdateHandler = (e) => {
        this.setState({todo: e.target.value});
    };

    // NOTE it's good to have this as a separate method but now it's almost indistinguishable from the event handlers
    // TODO merge this function with the submitTodo
    addTodo = async (todo) => {
        await this.setState({
            todos: [...this.state.todos, {text: todo, completed: false}]
        });

        localStorage.setItem("todos", JSON.stringify(this.state.todos));

        document.getElementById("inputBox").value = "";
    };

    onSubmitTodoHandler = (e) => {
        e.preventDefault();
        this.addTodo(this.state.todo);
    };

    onClickToggleHandler = (e) => {
        const clickedTodoText = e.target.innerText;

        const oldTodos = JSON.parse(localStorage.getItem("todos"));

        const newTodos = oldTodos.map(_todo => {
            if (_todo.text === clickedTodoText) {
                return {
                    text: _todo.text,
                    completed: !_todo.completed
                };
            } else {
                return _todo;
            }
        });
        localStorage.setItem("todos", JSON.stringify(newTodos));
        this.setState({todos: newTodos});
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
            this.setState({todos: savedTodos});
        }
    }

    render() {
        const {todos} = this.state;

        return (
            <>
                <div className="App">
                    <header className="App-header">Master React</header>
                </div>

                <form onSubmit={e => this.onSubmitTodoHandler(e)}>
                    <input
                        id="inputBox"
                        type="text"
                        onChange={e => this.onChangeUpdateHandler(e)}>
                    </input>

                    <button type="submit">Add Task</button>
                </form>

                {// render the current tasks of `todos` variable
                    todos.map((_aTask, _index) => (
                        <div key={_index}
                            // onClick={e => this.clickDetecter(e)}
                             onClick={e => this.onClickToggleHandler(e)}>
                            {_aTask.text}
                        </div>
                    ))}
            </>
        );
    }
}
