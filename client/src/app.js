import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./components/menu";
import ProfilePicture from "./components/profile-picture";
import Uploader from "./components/uploader";
import Profile from "./components/profile";
import OtherProfile from "./components/other-profile";
import FindPeople from "./components/find-people";
import Connections from "./components/connections";
import Forum from "./components/forum";
import axios from "./axios";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateProfileImage = this.updateProfileImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await axios.get("/user");
            this.setState({
                id: response.data.id,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                imgUrl: response.data.img_url,
                bio: response.data.bio,
            });
        } catch (err) {
            console.log(err);
        }
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

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="flex min-h-screen">
                    <Route
                        render={() => (
                            <div className="lg:w-1/5 md:w-1/3 bg-purple-500 text-purple-200">
                                <div className="fixed pr-8 pl-10 pt-10">
                                    <h1 className="font-bold text-2xl">
                                        CONNECT
                                    </h1>
                                    <div className="flex items-center mt-8">
                                        <ProfilePicture
                                            imgUrl={
                                                this.state.imgUrl || "/user.png"
                                            }
                                            firstName={this.state.firstName}
                                            lastName={this.state.lastName}
                                            toggleUploader={this.toggleUploader}
                                            defaultImg={
                                                this.state.imgUrl === null
                                            }
                                        />
                                    </div>
                                    <Menu />
                                </div>
                            </div>
                        )}
                    ></Route>

                    <div className="relative lg:w-4/5 md:w-2/3 py-16 flex justify-center">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    imgUrl={this.state.imgUrl || "/user.png"}
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    bio={this.state.bio}
                                    setBio={this.setBio}
                                    defaultImg={this.state.imgUrl === null}
                                />
                            )}
                        ></Route>
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route
                            path="/users"
                            render={() => (
                                <FindPeople loggedInUserId={this.state.id} />
                            )}
                        ></Route>
                        <Route
                            path="/forum"
                            render={() => (
                                <Forum loggedInUserId={this.state.id} />
                            )}
                        ></Route>
                        <Route path="/connections" component={Connections} />
                    </div>

                    {/* Overlay and modal */}
                    <div
                        className="absolute bg-purple-100 bg-opacity-50 backdrop-filter backdrop-blur-sm h-screen w-screen duration-200"
                        style={{
                            opacity: this.state.uploaderIsVisible ? 1 : 0,
                            zIndex: this.state.uploaderIsVisible ? 10 : -1,
                        }}
                        onClick={this.toggleUploader}
                    ></div>
                    <div
                        className="absolute h-screen w-screen flex"
                        style={{
                            zIndex: this.state.uploaderIsVisible ? "auto" : -1,
                        }}
                    >
                        <div className="lg:w-1/5 md:w-1/3"></div>
                        <div className="lg:w-4/5 md:w-2/3 flex items-center justify-center">
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    updateProfileImage={this.updateProfileImage}
                                    toggleUploader={this.toggleUploader}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
