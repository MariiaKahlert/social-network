import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Menu() {
    const requests = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.accepted === false)
    );

    if (!requests) {
        return null;
    }

    return (
        <div className="mt-14">
            <div className="mb-4 flex items-center">
                {location.pathname === "/" ? (
                    <img src="/active-myprofile.png" className="h-4"></img>
                ) : (
                    <img src="/inactive-myprofile.png" className="h-4"></img>
                )}
                <Link
                    to="/"
                    className={
                        "text-lg ml-4 hover:text-white duration-200 " +
                        (location.pathname === "/"
                            ? "text-white font-bold"
                            : "text-purple-200")
                    }
                >
                    My profile
                </Link>
            </div>

            <div className="mb-4 flex items-center">
                {location.pathname === "/connections" ? (
                    <img src="/active-connections.png" className="h-4"></img>
                ) : (
                    <img src="/inactive-connections.png" className="h-4"></img>
                )}

                <Link
                    to="/connections"
                    className={
                        "text-lg ml-4 hover:text-white duration-200 " +
                        (location.pathname === "/connections"
                            ? "text-white font-bold"
                            : "text-purple-200")
                    }
                >
                    Connections
                </Link>
                {requests.length > 0 && (
                    <Link to="/connections">
                        <div className="bg-white ml-4 py-1 px-2 rounded-lg">
                            <p className="text-purple-500 font-bold">
                                + {requests.length}
                            </p>
                        </div>
                    </Link>
                )}
            </div>

            <div className="mb-8 flex items-center">
                {location.pathname === "/users" ? (
                    <img src="/active-community.png" className="h-5"></img>
                ) : (
                    <img src="/inactive-community.png" className="h-5"></img>
                )}

                <Link
                    to="/users"
                    className={
                        "text-lg ml-3 hover:text-white duration-200 " +
                        (location.pathname === "/users"
                            ? "text-white font-bold"
                            : "text-purple-200")
                    }
                >
                    Community
                </Link>
            </div>

            <div className="mb-8 flex items-center">
                <img src="/inactive-logout.png" className="h-5"></img>
                <a
                    href="/logout"
                    className="ml-3 text-purple-200 text-lg hover:text-white hover:underline duration-200"
                >
                    Log out
                </a>
            </div>
        </div>
    );
}
