import { Component } from "react";
import axios from "../axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
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

    async handleSubmit(e) {
        e.preventDefault();
        if (this.state.draftBio === undefined) {
            this.toggleTextArea();
            return;
        }
        try {
            const response = await axios.post("/update-bio", {
                bio: this.state.draftBio,
            });
            const { bio } = response.data;
            this.props.setBio(bio);
            this.toggleTextArea();
        } catch (err) {
            console.log(err);
        }
    }

    toggleTextArea() {
        this.setState({
            showTextArea: !this.state.showTextArea,
        });
    }

    render() {
        return (
            <div className="flex flex-col flex-grow py-12 md:w-3/5 lg:w-2/5">
                {!this.state.showTextArea ? (
                    <>
                        {!this.props.bio ? (
                            <>
                                <p className="flex-grow"></p>
                                <button
                                    type="button"
                                    onClick={this.toggleTextArea}
                                    className="bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                                >
                                    Add bio
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex-grow overflow-auto">
                                    <p className="text-center">
                                        {this.props.bio}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={this.toggleTextArea}
                                    className="bg-purple-200 font-bold rounded-full mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                                >
                                    Edit bio
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <textarea
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={this.handleChange}
                            className="flex-grow border border-purple-300 text-purple-300 rounded-lg p-4 focus:outline-none resize-none"
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
                            className="mt-4 text-gray-700 hover:text-black hover:underline duration-200"
                        >
                            Cancel
                        </button>
                    </>
                )}
            </div>
        );
    }
}
