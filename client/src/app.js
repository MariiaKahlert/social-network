import { Component } from "react";
import ProfilePicture from "./profile-picture";
import Uploader from "./uploader";
import axios from "./axios";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("App just mounted!");
        axios
            .get("/user")
            .then((response) => {
                this.setState({
                    first: response.data["first_name"],
                    last: response.data["last_name"],
                });
                console.log(this.state);
            })
            .catch((err) => console.log(err));
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <div className="flex h-screen w-screen">
                <div className="w-1/4 bg-purple-500 text-purple-200">
                    <div className="p-8">
                        <h1 className="text-center font-bold text-2xl">
                            IN TOUCH
                        </h1>
                        <ProfilePicture
                            first={this.state.first}
                            last={this.state.last}
                        />
                        <h2
                            onClick={() => this.toggleUploader()}
                            className="text-center"
                        >
                            Click to show or close uploader
                        </h2>
                    </div>
                </div>
                <div className="w-3/4">
                    {this.state.uploaderIsVisible && <Uploader />}
                </div>
            </div>
        );
    }
}
