import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
        };
    }

    handleChange(e) {
        // keep track of the bio that the user is typing and store that value in state as draft bio
    }

    handleSubmit(e) {
        // make axios POST request with the draft that the user typed
    }

    render() {
        return (
            <div>
                <h1>Bio Editor</h1>
                {this.state.showTextArea && (
                    <div>
                        <textarea></textarea>
                    </div>
                )}
            </div>
        );
    }
}
