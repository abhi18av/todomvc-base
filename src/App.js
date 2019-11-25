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
        this.state = {todos: []};
    }


    onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e);
    };


    render() {

        const {todos} = this.state;


        return (
            <>
                <div className="App">
                    <header className="App-header">Master React</header>
                </div>


                <form onSubmit={(e) => this.onSubmitHandler(e)}>
                    <input
                        type='text'>
                    </input>
                    <button type='button'>Add Task</button>
                </form>

            </>
        );
    }
}
