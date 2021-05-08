import ReactDOM from "react-dom";
import Welcome from "./welcome";

if (location.pathname === "/welcome") {
    ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
    ReactDOM.render(<HelloWorld />, document.querySelector("main"));
}

function HelloWorld() {
    return <div>Hello, World!</div>;
}
