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

export class TodoItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <p>TodoItem Component</p>
            </>
        );
    }
}


//=============================
// containers
//=============================


export class TodoList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <p>TodoList Component</p>
            </>
        );
    }
}


//=============================
// App
//=============================


export class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <p>TodoMVC</p>
            </>
        );
    }
}

