import { useState, useEffect } from "react";
import axios from "../axios";

export default function FindPeople() {
    const [searchInput, setSearchInput] = useState("");
    const [people, setPeople] = useState([]);

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
                    const response = await axios.post("/find-users", {
                        searchInput: searchInput,
                    });
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

            <div className="w-full flex-grow">
                {people.map((person, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center w-full h-28 mt-12 bg-white shadow-lg rounded-lg"
                        >
                            <img
                                src={person["img_url"] || "/user.png"}
                                className={"h-16 ml-8 rounded-lg bg-white "}
                            ></img>
                            <h3 className="ml-4 font-bold">
                                {person["first_name"]} {person["last_name"]}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
