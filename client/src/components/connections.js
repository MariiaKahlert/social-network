import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getConnectionsAndRequests,
    acceptConnection,
    disconnect,
} from "../actions";

export default function Connections() {
    const dispatch = useDispatch();
    const connections = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );
    const requests = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === false)
    );

    useEffect(() => {
        (!connections || !requests) && dispatch(getConnectionsAndRequests());
    }, []);

    if (!connections || !requests) {
        return null;
    }

    const userInfo = (user) => {
        return (
            <Link to={`/user/${user.id}`}>
                <div className="flex items-center">
                    <img
                        src={user["img_url"] || "/user.png"}
                        className={
                            "h-16 ml-8 rounded-lg bg-white " +
                            (user["img_url"] === null
                                ? "border-2 border-purple-200 p-2"
                                : "")
                        }
                    ></img>
                    <div className="ml-4">
                        <h3 className="text-gray-700 font-bold group-hover:text-black">
                            {user["first_name"]} {user["last_name"]}
                        </h3>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="lg:w-2/5 md:w-2/3 flex flex-col justify-center items-center">
            {(requests.length === 0 || requests.length) > 1 ? (
                <p className="text-gray-700">
                    {requests.length} connection requests
                </p>
            ) : (
                <p className="text-gray-700">
                    {requests.length} connection request
                </p>
            )}

            <div
                className="w-full flex-grow overflow-y-auto mt-8"
                style={{ height: "40vh" }}
            >
                {requests.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex items-center justify-between w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent"
                        >
                            {userInfo(user)}
                            <button
                                onClick={() =>
                                    dispatch(acceptConnection(user.id))
                                }
                                className="bg-purple-200 font-bold rounded-full md:w-1/3 lg:w-1/4 mr-8 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                            >
                                Accept
                            </button>
                        </div>
                    );
                })}
            </div>
            {(connections.length === 0 || connections.length) > 1 ? (
                <p className="text-gray-700">
                    {connections.length} connections
                </p>
            ) : (
                <p className="text-gray-700">{connections.length} connection</p>
            )}
            <div
                className="w-full flex-grow overflow-y-auto mt-8"
                style={{ height: "60vh" }}
            >
                {connections.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex items-center justify-between w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent"
                        >
                            {userInfo(user)}
                            <button
                                onClick={() => dispatch(disconnect(user.id))}
                                className="bg-purple-200 font-bold rounded-full md:w-1/3 lg:w-1/4 mr-8 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
                            >
                                Disconnect
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
