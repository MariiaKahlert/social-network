import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

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
            <form className="flex flex-col bg-purple-500 md:w-4/5 lg:w-3/5 px-12 pt-14 pb-12 shadow-lg rounded-lg">
                <h2 className="text-center text-white font-bold mb-6 text-xl">
                    First time here?
                </h2>
                {this.state.error && (
                    <p className="text-red-200 text-center mb-4">
                        {this.state.error}
                    </p>
                )}
                <label htmlFor="register-first" className="text-white">
                    First name
                </label>
                <input
                    type="text"
                    name="register-first"
                    id="register-first"
                    required
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    className="rounded py-1 px-2 outline-none"
                ></input>
                <label htmlFor="register-last" className="text-white mt-2">
                    Last name
                </label>
                <input
                    type="text"
                    name="register-last"
                    id="register-last"
                    required
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    className="rounded py-1 px-2 outline-none"
                ></input>
                <label htmlFor="register-email" className="text-white mt-2">
                    Email
                </label>
                <input
                    type="email"
                    name="register-email"
                    id="register-email"
                    required
                    onChange={(e) => {
                        this.handleChange(e);
                    }}
                    className="rounded py-1 px-2 outline-none"
                ></input>
                <label htmlFor="register-password" className="text-white mt-2">
                    Password
                </label>
                <input
                    type="password"
                    name="register-password"
                    id="register-password"
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
                    Sign up
                </button>
                <div className="self-center mt-4">
                    <span className="text-purple-200">Already in touch?</span>
                    <Link
                        to="/login"
                        className="text-purple-200 ml-1 hover:underline hover:text-white duration-200"
                    >
                        Log in
                    </Link>
                </div>
            </form>
        );
    }
}
