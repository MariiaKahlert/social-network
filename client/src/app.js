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
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
    }

    componentDidMount() {
        axios
            .get("/user")
            .then((response) => {
                this.setState({
                    firstName: response.data["first_name"],
                    lastName: response.data["last_name"],
                    imgUrl: response.data["img_url"],
                });
            })
            .catch((err) => console.log(err));
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    updateProfileImage(imgUrl) {
        this.setState({
            imgUrl,
        });
        this.toggleUploader();
    }

    render() {
        return (
            <div className="flex h-screen w-screen">
                <div className="w-1/4 bg-purple-500 text-purple-200">
                    <div className="p-8">
                        <h1 className="text-center font-bold text-2xl">
                            IN TOUCH
                        </h1>
                        <div className="flex items-center">
                            <ProfilePicture
                                imgUrl={this.state.imgUrl || "user.png"}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                toggleUploader={this.toggleUploader}
                            />
                            <div className="ml-4">
                                <p
                                    onClick={() => {
                                        this.toggleUploader();
                                    }}
                                >
                                    {this.state.firstName}
                                </p>
                                <p>{this.state.lastName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-3/4 flex items-center justify-center">
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updateProfileImage={this.updateProfileImage}
                        />
                    )}
                </div>
            </div>
        );
    }
}
