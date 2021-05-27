import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otherUserConnections } from "../actions";
import { Link } from "react-router-dom";
import ProfilePicture from "../components/profile-picture";
import ConnectButton from "../components/connect-button";
import axios from "../axios";

export default function OtherProfile(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [bio, setBio] = useState("");

    const dispatch = useDispatch();
    const connections = useSelector(
        (state) => state.otherUsers && state.otherUsers.map((user) => user)
    );

    useEffect(() => {
        const { id } = props.match.params;
        dispatch(otherUserConnections(id));
        (async () => {
            try {
                const response = await axios.get(`/other-user/${id}`);
                setFirstName(response.data["first_name"]);
                setLastName(response.data["last_name"]);
                setImgUrl(response.data["img_url"]);
                setBio(response.data["bio"]);
            } catch (err) {
                console.log(err);
                props.history.replace("/");
            }
        })();
    }, []);

    return (
        <div className="mt-16 w-2/3 flex flex-col items-center bg-white shadow-lg rounded-lg">
            <div className="flex flex-col justify-center -mt-12">
                <ProfilePicture
                    imgUrl={imgUrl || "/user.png"}
                    firstName={firstName}
                    lastName={lastName}
                    inProfile={true}
                    defaultImg={imgUrl === null}
                />
            </div>
            <ConnectButton userId={props.match.params.id} />
            <div className="flex flex-col items-center flex-grow py-12 md:w-3/5 lg:w-2/5">
                <h3 className="font-bold text-lg">About</h3>
                {bio ? (
                    <p className="flex-grow text-center mt-4">{bio}</p>
                ) : (
                    <p className="flex-grow text-center text-gray-500 mt-4">
                        {firstName} hasn&apos;t added anything to bio yet
                    </p>
                )}
            </div>
            {connections && connections.length > 0 && (
                <div className="mb-4 w-2/3">
                    <h3 className="font-bold text-lg text-center">
                        Also connected with
                    </h3>
                    <div className="flex justify-evenly mt-2">
                        {connections.map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center"
                                >
                                    <Link to={`/user/${user.id}`}>
                                        <img
                                            src={user.img_url || "/user.png"}
                                            className={
                                                "h-14 rounded-full " +
                                                (!user.img_url
                                                    ? "border-2 border-purple-200 p-2"
                                                    : "")
                                            }
                                        ></img>
                                    </Link>

                                    <p>{user.first_name}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
