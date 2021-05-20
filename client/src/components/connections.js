import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionsAndRequests } from "../actions";

export default function Connections() {
    const dispatch = useDispatch();
    const connections = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );
    const requests = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === false)
    );
    console.log("connections in Connections component: ", connections);
    console.log("requests in Connections component: ", requests);

    useEffect(() => {
        (!connections || !requests) && dispatch(getConnectionsAndRequests());
    }, []);

    if (!connections || !requests) {
        return null;
    }

    return (
        <div className="lg:w-2/5 md:w-2/3 flex flex-col justify-center items-center">
            <p className="text-gray-700">Connection requests</p>
            <div
                className="w-full flex-grow overflow-y-auto mt-8"
                style={{ height: "40vh" }}
            >
                {requests.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex items-center w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent"
                        >
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
                    );
                })}
            </div>
            <p className="text-gray-700 mt-8">Your connections</p>
            <div
                className="w-full flex-grow overflow-y-auto mt-8"
                style={{ height: "60vh" }}
            >
                {connections.map((user, index) => {
                    return (
                        <div
                            key={index}
                            className="group flex items-center w-full h-28 mt-4 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent"
                        >
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
                    );
                })}
            </div>
        </div>
    );
}
