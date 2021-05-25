import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

let lastRequestedMessageId = null;
let scrollCheckStarted = false;
let scrollHeightBeforeEmit = null;

export default function Forum({ loggedInUserId }) {
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

    const checkScrollPos = () => {
        if (
            lastRequestedMessageId !== allMessages[0].id &&
            elemRef.current.scrollTop <= 100
        ) {
            scrollHeightBeforeEmit = elemRef.current.scrollHeight;
            socket.emit("moreMessages", {
                oldestMessageId: allMessages[0].id,
            });
            lastRequestedMessageId = allMessages[0].id;
        }
        setTimeout(checkScrollPos, 500);
    };

    useEffect(() => {
        if (allMessages && allMessages.length > 0 && allMessages.length <= 10) {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - elemRef.current.clientHeight;
        }
        if (scrollHeightBeforeEmit) {
            elemRef.current.scrollTop =
                elemRef.current.scrollHeight - scrollHeightBeforeEmit;
        }
        if (
            allMessages &&
            !scrollCheckStarted &&
            elemRef.current.scrollTop > 100
        ) {
            checkScrollPos();
            scrollCheckStarted = true;
        }
    }, [allMessages]);

    return (
        <div className="w-2/3 flex flex-col justify-between items-center bg-white shadow-lg rounded-lg">
            <div
                ref={elemRef}
                className="w-2/3 flex flex-col my-8 overflow-y-auto"
                style={{ maxHeight: "30rem" }}
            >
                {(allMessages ? allMessages : []).map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`${
                                loggedInUserId === message.sender_id
                                    ? "self-end bg-purple-400"
                                    : "bg-purple-50"
                            } flex w-2/3 rounded-lg mt-8 p-4`}
                        >
                            <div className="flex flex-col flex-shrink-0 items-center">
                                <Link to={`/user/${message.sender_id}`}>
                                    <img
                                        src={message.img_url || "/user.png"}
                                        className={
                                            `h-14 rounded-full ${
                                                loggedInUserId ===
                                                message.sender_id
                                                    ? "bg-purple-400"
                                                    : "bg-white"
                                            } ` +
                                            (message.img_url === null
                                                ? "border-2 border-purple-200 p-2"
                                                : "")
                                        }
                                    ></img>
                                </Link>

                                <p
                                    className={`text-${
                                        loggedInUserId === message.sender_id
                                            ? "white"
                                            : "black"
                                    }`}
                                >
                                    {message.first_name}
                                </p>
                            </div>

                            <div className="ml-4">
                                <p
                                    className={`text-${
                                        loggedInUserId === message.sender_id
                                            ? "purple-300"
                                            : "gray-400"
                                    }`}
                                >
                                    {new Date(message.created_at)
                                        .toUTCString()
                                        .replace("GMT", "")}
                                </p>
                                <p
                                    className={`mt-2 text-${
                                        loggedInUserId === message.sender_id
                                            ? "white"
                                            : "black"
                                    }`}
                                >
                                    {message.message}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <textarea
                onKeyDown={sendMessage}
                placeholder="Your message"
                className="mb-8 h-12 w-2/3 border border-gray-300 text-black rounded-full px-4 py-3 focus:outline-none focus:border-gray-700 resize-none"
            ></textarea>
        </div>
    );
}
