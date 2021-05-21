import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../axios";

export default function FindPeople(props) {
    const [searchInput, setSearchInput] = useState("");
    const [people, setPeople] = useState([]);

    const connections = useSelector(
        (state) => state.users && state.users.filter((user) => user.accepted)
    );

    // console.log(connections);

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                if (!searchInput) {
                    const response = await axios.get("/find-users");
                    if (!ignore) {
                        setPeople(response.data);
                    }
                } else {
                    const response = await axios.get(
                        `/find-users?q=${searchInput}`
                    );
                    if (!ignore) {
                        setPeople(response.data);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [searchInput]);

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const displayConnected = (personId) => {
        return connections.map((connection) => {
            if (connection.id === personId) {
                return <p className="text-gray-700">Connected</p>;
            }
        });
    };

    return (
        <div className="lg:w-2/5 md:w-2/3 flex flex-col justify-center items-center">
            <div className="flex items-center bg-white rounded">
                <img src="/search.png" className="h-4 ml-6"></img>
                <input
                    type="text"
                    onChange={handleChange}
                    className="rounded py-2 px-4 outline-none"
                    placeholder="Search..."
                ></input>
            </div>
            {!searchInput && (
                <p className="text-gray-700 mt-10">
                    People who recently joined
                </p>
            )}
            <div
                className="w-full flex-grow overflow-y-auto mt-8"
                style={{ height: "60vh" }}
            >
                {people.map((person, index) => {
                    return (
                        <Link key={index} to={`/user/${person.id}`}>
                            <div className="group flex items-center w-full h-28 mt-10 bg-purple-100 rounded-lg border-2 border-purple-200 duration-200 hover:bg-white hover:shadow-lg hover:border-transparent">
                                <img
                                    src={person["img_url"] || "/user.png"}
                                    className={
                                        "h-16 ml-8 rounded-lg bg-white " +
                                        (person["img_url"] === null
                                            ? "border-2 border-purple-200 p-2"
                                            : "")
                                    }
                                ></img>
                                <div className="ml-4">
                                    <h3 className="text-gray-700 font-bold group-hover:text-black">
                                        {person["first_name"]}{" "}
                                        {person["last_name"]}
                                    </h3>
                                    {props.loggedInUserId === person.id && (
                                        <p className="text-gray-700">You</p>
                                    )}
                                    {displayConnected(person.id)}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
