import { useState, useEffect } from "react";
import axios from "../axios";

export default function ConnectButton({ userId }) {
    const [buttonText, setButtonText] = useState("");
    useEffect(() => {
        console.log(userId);
        (async () => {
            try {
                const { data } = await axios.get(
                    `/connection-status?q=${userId}`
                );
                setButtonText(data.btnText);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault;
        try {
            const { data } = await axios.post("/connection-status", {
                btnText: buttonText,
                recipientId: userId,
            });
            setButtonText(data.btnText);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <button
            type="submit"
            onClick={handleSubmit}
            className="bg-purple-200 font-bold rounded-full md:w-1/2 lg:w-1/4 mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
        >
            {buttonText}
        </button>
    );
}
