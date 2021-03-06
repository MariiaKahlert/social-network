export default function reducer(state = {}, action) {
    if (action.type === "GET_CONNECTIONS_AND_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type === "OTHER_CONNECTIONS") {
        state = {
            ...state,
            otherUsers: action.otherUsers,
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

    if (action.type === "MORE_MESSAGES") {
        state = {
            ...state,
            allMessages: [...action.msgs, ...state.allMessages],
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            allMessages: [
                ...(!state.allMessages ? [] : state.allMessages),
                action.msg,
            ],
            newMessages: [
                ...(!state.newMessages ? [] : state.newMessages),
                action.msg,
            ],
        };
    }

    if (action.type === "RESET_NEW_MESSAGES") {
        state = {
            ...state,
            newMessages: [],
        };
    }

    if (action.type === "HANDLE_CONNECTION_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }

    if (action.type === "NEW_PROFILE_IMAGE") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.user.userId) {
                    return { ...user, img_url: action.user.imgUrl };
                }
                return user;
            }),
            allMessages: state.allMessages.map((message) => {
                if (message.sender_id === action.user.userId) {
                    return { ...message, img_url: action.user.imgUrl };
                }
                return message;
            }),
        };
    }
    return state;
}
