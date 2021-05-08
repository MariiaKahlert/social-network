import { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/registration", {
                firstName: this.state["register-first"],
                lastName: this.state["register-last"],
                email: this.state["register-email"],
                password: this.state["register-password"],
            })
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    error: "Something went wrong. Please, try again.",
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Registration Form</h1>
                <form>
                    {this.state.error && <p>{this.state.error}</p>}
                    <label htmlFor="register-first">First name</label>
                    <input
                        type="text"
                        name="register-first"
                        id="register-first"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                    ></input>
                    <label htmlFor="register-last">Last name</label>
                    <input
                        type="text"
                        name="register-last"
                        id="register-last"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                    ></input>
                    <label htmlFor="register-email">Email</label>
                    <input
                        type="email"
                        name="register-email"
                        id="register-email"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                    ></input>
                    <label htmlFor="register-password">Password</label>
                    <input
                        type="password"
                        name="register-password"
                        id="register-password"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                    ></input>
                    <button
                        type="submit"
                        onClick={(e) => {
                            this.handleSubmit(e);
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
