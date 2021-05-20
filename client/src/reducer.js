export default function reducer(state = {}, action) {
    if (action.type === "GET_CONNECTIONS_AND_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }
    return state;
}
