import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.setBio);
        this.state = {
            showTextArea: false,
            showAddBtn: true,
        };
        this.toggleTextArea = this.toggleTextArea.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        // keep track of the bio that the user is typing and store that value in state as draft bio
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value,
        });
        console.log(this.state);
    }

    handleSubmit(e) {
        // make axios POST request with the draft that the user typed
        e.preventDefault();
        console.log("Save button clicked!");
        axios
            .post("/update-bio", {
                bio: this.state.draftBio,
            })
            .then((response) => {
                console.log(response.data);
                const { bio } = response.data;
                this.props.setBio(bio);
                this.toggleTextArea();
            })
            .catch((err) => console.log(err));
    }

    toggleTextArea() {
        this.setState({
            showTextArea: !this.state.showTextArea,
            showAddBtn: !this.state.showAddBtn,
        });
        if (this.state.showTextArea === true) {
            console.log(this.props.bio);
            document.getElementsByTagName("textarea").value = this.props.bio;
        }
    }

    render() {
        return (
            <div>
                {!this.props.bio && this.state.showAddBtn && (
                    <button type="button" onClick={this.toggleTextArea}>
                        Add bio
                    </button>
                )}
                {this.props.bio && (
                    <>
                        <p>{this.props.bio}</p>
                        <button type="button" onClick={this.toggleTextArea}>
                            Edit bio
                        </button>
                    </>
                )}
                {this.state.showTextArea && (
                    <div>
                        <textarea
                            name="draftBio"
                            onChange={this.handleChange}
                        ></textarea>
                        <button type="submit" onClick={this.handleSubmit}>
                            Save
                        </button>
                        <button type="button" onClick={this.toggleTextArea}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
