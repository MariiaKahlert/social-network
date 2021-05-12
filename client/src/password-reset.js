import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class PasswordReset extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
        };
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            error: null,
        });
        if (this.state.view === 1) {
            axios
                .post("/password/reset/start", {
                    email: this.state["email"],
                })
                .then(() => {
                    this.setState({
                        view: 2,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: "Something went wrong. Please, try again.",
                    });
                });
        } else if (this.state.view === 2) {
            axios
                .post("/password/reset/verify", {
                    email: this.state["email"],
                    password: this.state["password"],
                    code: this.state["verification-code"],
                })
                .then(() => {
                    this.setState({
                        view: 3,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.setState({
                        error: "Something went wrong. Please, try again.",
                    });
                });
        }
    }

    determineViewToRender() {
        if (this.state.view === 1) {
            return (
                <form className="flex flex-col bg-purple-500 md:w-4/5 lg:w-3/5 px-12 pt-14 pb-12 shadow-lg rounded-lg">
                    {this.state.error && (
                        <p className="text-red-200 text-center mb-4">
                            {this.state.error}
                        </p>
                    )}
                    <h2 className="text-center text-white mb-6 text-xl">
                        Please enter the email that you used to sign in
                    </h2>
                    <label htmlFor="email" className="text-white mt-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                        className="rounded py-1 px-2 outline-none"
                    ></input>
                    <button
                        type="submit"
                        onClick={(e) => {
                            this.handleSubmit(e);
                        }}
                        className="active:outline-none bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                    >
                        Next
                    </button>
                </form>
            );
        } else if (this.state.view === 2) {
            return (
                <form className="flex flex-col bg-purple-500 md:w-4/5 lg:w-3/5 px-12 pt-14 pb-12 shadow-lg rounded-lg">
                    {this.state.error && (
                        <p className="text-red-200 text-center mb-4">
                            {this.state.error}
                        </p>
                    )}
                    <label
                        htmlFor="verification-code"
                        className="text-white mt-2"
                    >
                        Verification code
                    </label>
                    <input
                        type="text"
                        name="verification-code"
                        id="verification-code"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                        className="rounded py-1 px-2 outline-none"
                    ></input>
                    <label htmlFor="password" className="text-white mt-2">
                        New password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        onChange={(e) => {
                            this.handleChange(e);
                        }}
                        className="rounded py-1 px-2 outline-none"
                    ></input>
                    <button
                        type="submit"
                        onClick={(e) => {
                            this.handleSubmit(e);
                        }}
                        className="active:outline-none bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                    >
                        Save
                    </button>
                </form>
            );
        } else if (this.state.view === 3) {
            return (
                <div className="flex flex-col bg-purple-500 md:w-4/5 lg:w-3/5 px-12 pt-14 pb-12 shadow-lg rounded-lg">
                    <p className="text-center text-purple-200 font-bold mb-6 text-xl">
                        Password successfully reset!
                    </p>
                    <Link
                        to="/login"
                        className="text-center text-white underline hover:text-purple-200 duration-200"
                    >
                        Log in
                    </Link>
                </div>
            );
        }
    }

    render() {
        return this.determineViewToRender();
    }
}
