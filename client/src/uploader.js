import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("Uploader just mounted!");
    }

    render() {
        return (
            <div>
                <h1>Uploader</h1>
            </div>
        );
    }
}
