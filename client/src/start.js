import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import reducer from "./reducer";
import { getConnectionsAndRequests } from "./actions";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

if (location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    store.dispatch(getConnectionsAndRequests());
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.querySelector("main")
    );
}
