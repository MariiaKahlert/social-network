import { Component } from "react";
import ProfilePicture from "../components/profile-picture";
import axios from "../axios";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log(id);
        axios
            .get(`/other-user/${id}`)
            .then((response) => {
                this.setState({
                    firstName: response.data["first_name"],
                    lastName: response.data["last_name"],
                    imgUrl: response.data["img_url"],
                    bio: response.data["bio"],
                });
            })
            .catch((err) => console.log(err));
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
            </div>
        );
    }
}
