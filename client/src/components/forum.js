import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function Forum() {
    const allMessages = useSelector((state) => state && state.allMessages);
    const elemRef = useRef();
    const sendMessage = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("newMessage", {
                message: e.target.value,
            });
            e.target.value = "";
        }
    };

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [allMessages]);

    return (
        <div className="w-2/3 flex flex-col justify-between items-center bg-white shadow-lg rounded-lg">
            <div
                ref={elemRef}
                className="flex flex-col justify-center my-8 overflow-y-auto"
                style={{ maxHeight: "30rem" }}
            >
                {(allMessages ? allMessages : []).map((message, index) => {
                    return (
                        <div
                            key={index}
                            className="flex rounded-lg bg-purple-50"
                        >
                            <img
                                src={message.img_url || "/user.png"}
                                className={
                                    "h-16 ml-8 rounded-lg bg-white " +
                                    (message.img_url === null
                                        ? "border-2 border-purple-200 p-2"
                                        : "")
                                }
                            ></img>
                            <p>{message.message}</p>
                        </div>
                    );
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
