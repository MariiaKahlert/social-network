import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

export default class Login extends Component {
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
            .post("/login", {
                email: this.state["login-email"],
                password: this.state["login-password"],
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
            <form className="flex flex-col bg-purple-500 md:w-4/5 lg:w-3/5 px-12 pt-14 pb-12 shadow-lg rounded-lg">
                {this.state.error && (
                    <p className="text-red-200 text-center mb-4">
                        {this.state.error}
                    </p>
                )}
                <label htmlFor="login-email" className="text-white mt-2">
                    Email
                </label>
                <input
                    type="email"
                    name="login-email"
                    id="login-email"
                    required
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    className="rounded py-1 px-2 outline-none"
                ></input>
                <label htmlFor="login-password" className="text-white mt-2">
                    Password
                </label>
                <input
                    type="password"
                    name="login-password"
                    id="login-password"
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
                    Log in
                </button>
                <div className="self-center mt-4">
                    <Link
                        to="/password/reset"
                        className="text-purple-200 ml-1 hover:underline hover:text-white duration-200"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Link
                    to="/"
                    className="text-purple-200 self-center mt-4 hover:underline hover:text-white duration-200"
                >
                    Sign up
                </Link>
            </form>
        );
    }
}
