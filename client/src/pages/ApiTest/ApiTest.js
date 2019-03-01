import React, { Component } from "react";

class ApiTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: "API Testing . . ."
        };
    }

    render() {
        return (
            <>
                <h1>{this.state.headline}</h1>
                <hr />
                <div>
                    <p>getUserById: ("5c71dc046375864d278e57bf")</p>
                </div>
            </>
        )
    }
}

export default ApiTest;