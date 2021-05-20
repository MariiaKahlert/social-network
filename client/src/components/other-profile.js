import { Component } from "react";
import ProfilePicture from "../components/profile-picture";
import ConnectButton from "../components/connect-button";
import axios from "../axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const response = await axios.get(`/other-user/${id}`);
            this.setState({
                firstName: response.data["first_name"],
                lastName: response.data["last_name"],
                imgUrl: response.data["img_url"],
                bio: response.data["bio"],
            });
        } catch (err) {
            console.log(err);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="mt-16 w-2/3 flex flex-col items-center bg-white shadow-lg rounded-lg">
                <div className="flex flex-col justify-center -mt-12">
                    <ProfilePicture
                        imgUrl={this.state.imgUrl || "/user.png"}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        inProfile={true}
                        defaultImg={this.state.imgUrl === null}
                    />
                </div>

                <ConnectButton userId={this.props.match.params.id} />

                <div className="flex flex-col items-center flex-grow py-12 md:w-3/5 lg:w-2/5">
                    <h3 className="font-bold text-lg">About</h3>
                    {this.state.bio ? (
                        <p className="flex-grow text-center mt-4">
                            {this.state.bio}
                        </p>
                    ) : (
                        <p className="flex-grow text-center text-gray-500 mt-4">
                            {this.state.firstName} hasn&apos;t added anything to
                            bio yet
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
