import React from "react";

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

    onClickToggleHandler = async (e) => {
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
        await this.setState({todos: newTodos});
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

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
                    <header className="App-header">TodoMVC</header>
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
                             style={_aTask.completed
                                 ? {
                                     "cursor": "pointer",
                                     "textDecoration": "line-through",
                                     "color": "green",
                                     "margin": "10px"
                                 }
                                 : {
                                     "cursor": "pointer",
                                     "color": "blue",
                                     "margin": "10px"
                                 }}
                             onClick={e => this.onClickToggleHandler(e)}>
                            {_aTask.text}
                        </div>
                    ))}
            </>
        );
    }
}
