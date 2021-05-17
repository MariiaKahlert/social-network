import { useState, useEffect } from "react";
import axios from "../axios";

export default function FindPeople() {
    const [searchInput, setSearchInput] = useState("");
    const [people, setPeople] = useState([]);

    useEffect(() => {
        console.log("useEffect just ran!");
        let ignore = false;
        (async () => {
            try {
                console.log(searchInput);
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
        <>
            <input onChange={handleChange}></input>
            {people.map((person, index) => {
                return (
                    <div key={index}>
                        <img src={person["img_url"] || "/user.png"}></img>
                        <h3>
                            {person["first_name"]} {person["last_name"]}
                        </h3>
                    </div>
                );
            })}
        </>
    );
}
