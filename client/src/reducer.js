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

    if (action.type === "ALL_MESSAGES") {
        state = {
            ...state,
            allMessages: action.msgs,
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            allMessages: [
                ...(!state.allMessages ? [] : state.allMessages),
                action.msg,
            ],
        };
    }

    return state;
}
