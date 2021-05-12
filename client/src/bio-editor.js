import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
            showAddOrEditBtn: true,
        };
        this.toggleTextArea = this.toggleTextArea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/update-bio", {
                bio: this.state.draftBio,
            })
            .then((response) => {
                const { bio } = response.data;
                this.props.setBio(bio);
                this.toggleTextArea();
            })
            .catch((err) => console.log(err));
    }

    toggleTextArea() {
        this.setState({
            showTextArea: !this.state.showTextArea,
            showAddOrEditBtn: !this.state.showAddOrEditBtn,
        });
    }

    render() {
        return (
            <div className="flex flex-col mb-40 md:w-3/5 lg:w-2/5">
                {!this.props.bio && this.state.showAddOrEditBtn && (
                    <button
                        type="button"
                        onClick={this.toggleTextArea}
                        className="bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                    >
                        Add bio
                    </button>
                )}
                {this.props.bio && this.state.showAddOrEditBtn && (
                    <>
                        <p className="text-center">{this.props.bio}</p>
                        <button
                            type="button"
                            onClick={this.toggleTextArea}
                            className="bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                        >
                            Edit bio
                        </button>
                    </>
                )}
                {this.state.showTextArea && (
                    <>
                        <textarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={this.handleChange}
                            className="border border-purple-300 text-purple-300 rounded-lg p-4 focus:outline-none"
                        ></textarea>
                        <button
                            type="submit"
                            onClick={this.handleSubmit}
                            className="bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={this.toggleTextArea}
                            className="mt-4 text-purple-500 hover:text-purple-200 hover:underline"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        );
    }
}
