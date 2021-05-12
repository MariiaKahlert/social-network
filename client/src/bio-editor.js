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
            <div>
                {!this.props.bio && this.state.showAddOrEditBtn && (
                    <button type="button" onClick={this.toggleTextArea}>
                        Add bio
                    </button>
                )}
                {this.props.bio && this.state.showAddOrEditBtn && (
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
                            defaultValue={this.props.bio}
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
