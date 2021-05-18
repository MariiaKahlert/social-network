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
                        "text-lg ml-4 " +
                        (location.pathname === "/"
                            ? "text-white font-bold"
                            : "text-purple-200")
                    }
                >
                    My profile
                </Link>
            </div>

            <div className="mb-4 flex items-center">
                {location.pathname === "/friends" && (
                    <img src="/active-friends.png" className="h-4"></img>
                )}
                {location.pathname !== "/friends" && (
                    <img src="/inactive-friends.png" className="h-4"></img>
                )}

                <Link
                    to="#"
                    className={
                        "text-lg ml-4 " +
                        (location.pathname === "/friends"
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
                        "text-lg ml-3 " +
                        (location.pathname === "/users"
                            ? "text-white font-bold"
                            : "text-purple-200")
                    }
                >
                    Community
                </Link>
            </div>

            <a
                href="/logout"
                className="text-purple-200 text-lg hover:text-white hover:underline duration-200"
            >
                Log out
            </a>
        </div>
    );
}
