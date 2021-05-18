import { Link } from "react-router-dom";
export default function Menu() {
    return (
        <div className="mt-14">
            <div className="mb-4 flex items-center">
                {location.pathname === "/" && (
                    <img src="/active-myprofile.png" className="h-4"></img>
                )}
                {location.pathname !== "/" && (
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
                {location.pathname === "/connections" && (
                    <img src="/active-connections.png" className="h-4"></img>
                )}
                {location.pathname !== "/connections" && (
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
            </div>

            <div className="mb-8 flex items-center">
                {location.pathname === "/users" && (
                    <img src="/active-community.png" className="h-5"></img>
                )}
                {location.pathname !== "/users" && (
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
