import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionsAndRequests } from "../actions";

export default function Connections() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConnectionsAndRequests());
    }, []);

    return (
        <>
            <h1>Connections Component</h1>
        </>
    );
}
