import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "../axios";

export default function ConnectButton({ userId }) {
    const [buttonText, setButtonText] = useState("");
    useEffect(() => {
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

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("/connection-status", {
                btnText: buttonText,
                otherUser: userId,
            });
            if (buttonText === "Connect" || buttonText === "Cancel") {
                socket.emit("handleConnectionRequests", {
                    otherUserId: userId,
                });
            }
            setButtonText(data.btnText);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDecline = async () => {
        try {
            await axios.post("/connection-status", {
                btnText: "Decline",
                otherUser: userId,
            });
            setButtonText("Connect");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <button
                onClick={handleSubmit}
                className="bg-purple-200 font-bold rounded-full md:w-1/2 lg:w-1/4 mt-6 p-3 duration-200 hover:bg-purple-300 hover:text-gray-700"
            >
                {buttonText}
            </button>
            {buttonText === "Accept" && (
                <button
                    onClick={handleDecline}
                    className="mt-3 p-3 text-gray-500 font-bold md:w-1/2 lg:w-1/4 rounded-full duration-200 hover:bg-purple-50 hover:text-gray-700"
                >
                    Decline
                </button>
            )}
        </>
    );
}
