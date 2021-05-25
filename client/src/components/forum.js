import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { useSelector } from "react-redux";

export default function Forum() {
    const forumMessages = useSelector((state) => state && state.forumMessages);
    return (
        <div className="w-2/3 flex flex-col justify-end items-center bg-white shadow-lg rounded-lg">
            {/* <div className="flex flex-col justify-center">
                <h1>Forum</h1>
            </div> */}
            <textarea
                placeholder="Your message"
                className="mb-8 h-12 w-2/3 border border-gray-300 text-gray-700 rounded-full p-4 focus:outline-none focus:border-gray-700 resize-none"
            ></textarea>
        </div>
    );
}
