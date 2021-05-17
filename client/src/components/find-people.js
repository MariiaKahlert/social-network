import { useState, useEffect } from "react";
import axios from "../axios";

export default function FindPeople() {
    const [searchInput, setSearchInput] = useState("");
    const [people, setPeople] = useState([]);

    useEffect(() => {
        console.log("useEffect just ran!");
        (async () => {
            try {
                const response = await axios.get("/users");
                console.log(response);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleChange = (e) => {
        console.log("User is typing in input field");
        setSearchInput(e.target.value);
    };
    return (
        <>
            <h1>FindPeople component</h1>
            <input onChange={handleChange}></input>
            <p>{searchInput}</p>
        </>
    );
}
