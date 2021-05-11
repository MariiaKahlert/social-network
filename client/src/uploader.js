import { Component } from "react";
import axios from "./axios";

export default class Uploader extends Component {
    constructor() {
        super();
        this.state = {};
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.files[0],
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/upload", formData)
            .then((response) => {
                const { img_url } = response.data;
                this.props.updateProfileImage(img_url);
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <form className="flex flex-col bg-purple-400 shadow-lg rounded-lg">
                <h2 className="text-center text-white mb-6 text-xl">
                    Upload a profile picture
                </h2>
                {this.state.error && (
                    <p className="text-red-200 text-center mb-4">
                        {this.state.error}
                    </p>
                )}
                <input
                    type="file"
                    name="file"
                    accept="image/*"
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
                    className="active:outline-none bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                >
                    Save
                </button>
            </form>
        );
    }
}
