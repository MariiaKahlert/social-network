import { HashRouter, Route } from "react-router-dom";
import Registration from "./components/registration";
import Login from "./components/login";
import PasswordReset from "./components/password-reset";

export default function Welcome() {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-1/2 flex flex-col items-center">
                <h2 className="text-center text-2xl -mt-16 text-purple-400">
                    Let&apos;s
                </h2>
                <h1 className="text-center text-5xl mt-4 text-purple-500 font-bold">
                    CONNECT
                </h1>
                <p className="w-2/3 text-center text-xl mt-8 text-gray-500">
                    A platform for aspiring software developers and career
                    changers to share their stories and network with like-minded
                    people{" "}
                </p>
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
