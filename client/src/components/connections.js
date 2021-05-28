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
        <div className="w-full">
            <div className="lg:w-1/2 pl-12 p-4 flex flex-col items-center">
                {connections.length === 0 || connections.length > 1 ? (
                    <p className="text-lg font-bold">
                        {connections.length} connections
                    </p>
                ) : (
                    <p className="text-lg font-bold">
                        {connections.length} connection
                    </p>
                )}
                <div className="w-full">
                    {connections.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            You don&apos;t have any connections
                        </p>
                    )}
                    {connections
                        .sort((a, b) => b.id - a.id)
                        .map((user, index) => {
                            return (
                                <div
                                    key={index}
                                    className="group flex items-center justify-between w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent"
                                >
                                    {userInfo(user)}
                                    <button
                                        onClick={() =>
                                            dispatch(disconnect(user.id))
                                        }
                                        className="bg-purple-200 font-bold rounded-full md:w-1/3 lg:w-1/4 mr-8 p-2 duration-200 hover:bg-purple-300 hover:text-gray-700"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="lg:w-1/3 fixed top-16 right-12">
                <div
                    className="p-4 bg-white rounded-lg shadow-lg overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 8rem)" }}
                >
                    {requests.length === 0 || requests.length > 1 ? (
                        <p className="text-center text-lg font-bold">
                            {requests.length} connection requests
                        </p>
                    ) : (
                        <p className="text-center text-lg font-bold">
                            {requests.length} connection request
                        </p>
                    )}
                    <div className="w-full overflow-y-auto">
                        {requests.length === 0 && (
                            <p className="text-center text-gray-500 mt-4">
                                No new connection requests
                            </p>
                        )}
                        {requests
                            .sort((a, b) => b.id - a.id)
                            .map((user, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="group flex items-center justify-between w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-purple-50 hover:border-purple-100"
                                    >
                                        {userInfo(user)}
                                        <div className="mr-8 py-1 flex flex-col justify-evenly h-full md:w-1/3 lg:w-1/4">
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        acceptConnection(
                                                            user.id
                                                        )
                                                    )
                                                }
                                                className="bg-purple-200 font-bold rounded-full w-full p-2 duration-200 hover:bg-purple-300 hover:text-gray-700"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() =>
                                                    dispatch(
                                                        disconnect(user.id)
                                                    )
                                                }
                                                className="p-2 text-gray-500 font-bold w-full rounded-full duration-200 hover:bg-purple-100 hover:text-gray-700"
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}
