import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function Forum() {
    const allMessages = useSelector((state) => state && state.allMessages);

    const sendMessage = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newMessage", {
                message: e.target.value,
            });
            e.target.value = "";
        }
    };
    return (
        <div className="w-2/3 flex flex-col justify-end items-center bg-white shadow-lg rounded-lg">
            <div className="flex flex-col justify-center">
                {(allMessages ? allMessages : []).map((message, index) => {
                    return <p key={index}>{message.message}</p>;
                })}
            </div>
            <textarea
                onKeyDown={sendMessage}
                placeholder="Your message"
                className="mb-8 h-12 w-2/3 border border-gray-300 text-gray-700 rounded-full p-4 focus:outline-none focus:border-gray-700 resize-none"
            ></textarea>
        </div>
    );
}
