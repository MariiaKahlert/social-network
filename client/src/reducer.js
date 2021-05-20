export default function reducer(state = {}, action) {
    if (action.type === "GET_CONNECTIONS_AND_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type === "ACCEPT_CONNECTION") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.userId) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type === "DISCONNECT") {
        state = {
            ...state,
            users: state.users.filter((user) => user.id !== action.userId),
        };
    }
    return state;
}
