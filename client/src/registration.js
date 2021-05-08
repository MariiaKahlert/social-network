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
        console.log(this.state);
    }

    handleSubmit() {
        axios
            .post("/registration", {
                first_name: this.state["register-first"],
                last_name: this.state["register-last"],
                email: this.state["register-email"],
                password: this.state["register-password"],
            })
            .then()
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>Registration Form</h1>
                <form>
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
                        onClick={() => {
                            this.handleSubmit();
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
