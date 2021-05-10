import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import PasswordReset from "./password-reset";

export default function Welcome() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2">
                <h2 className="text-center text-2xl -mt-16 text-purple-400">
                    Let's stay
                </h2>
                <h1 className="text-center text-5xl mt-4 text-purple-500 font-bold">
                    IN TOUCH
                </h1>
            </div>
            <HashRouter>
                <div className="w-1/2 flex justify-center items-center">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/password/reset" component={PasswordReset} />
                </div>
            </HashRouter>
        </div>
    );
}
