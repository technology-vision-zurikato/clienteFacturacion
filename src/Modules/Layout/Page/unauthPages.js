import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Fact from "../../Fact/Page";
import Loguin from "../../Login/Page";
import Register from "../../Register/Page";

const SubRoutes = () => {
    return <div>
        <Switch>
            <Route  path="/">
                <Fact/>
            </Route>
            <Route  path="/uifac/loguin">
                <Loguin/>
            </Route>
            <Route  path="/uifac/register">
                <Register/>
            </Route>
        </Switch>
    </div>
};

export default SubRoutes;