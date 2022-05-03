import React from "react";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UnAuthFact from "./Modules/UnAuthFact/Page";
import Fact from "./Modules/Fact/Page";
import PurchaseDone from "./Modules/UnAuthFact/Page/purchaseDone";
import AuthPurchaseDone from "./Modules/Fact/Page/purchaseDone";
import UnAuthAccess from "./Modules/UnAuthAccess/Page";
import ResetPassword from "./Modules/ResetPassword/Page";
import ConfirmUser from "./Modules/ConfirmUser/Page";
import ActiveUser from "./Modules/ActiveUser/Page";
import ChangePassword from "./Modules/ChangePassword/Page";
import Acount from "./Modules/Acount/Page";
import MyFac from "./Modules/MyFac/Page";
import AllFac from "./Modules/AllFac/Page";
import axios from "axios";
import AllUser from "./Modules/AllUser/Page";
import baseUrl from "./Components/Utils/baseUrl";

axios.interceptors.response.use(function (response) {
    // Do something with response data like console.log, change header, or as we did here just added a conditional behaviour, to change the route or pop up an alert box, based on the reponse status
    if(response.data.result=="2")
    {
        console.log(response.data.result);
        localStorage.clear();
        return window.location.href = baseUrl()+'/uifac/recurrente';
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const Routes = () => {
    return <BrowserRouter>
        <Switch>
            <Route exact path={['/uifac/expres']} component={UnAuthFact}/>
            <Route exact path={['/uifac/expres/purchase-done']} component={PurchaseDone}/>
            <Route exact path={['/uifac/recurrente/purchase-done']} component={AuthPurchaseDone}/>
            <Route exact path={['/uifac/recurrente']} component={UnAuthAccess}/>
            <Route exact path={['/uifac/recurrente/resetpassword']} component={ResetPassword}/>
            <Route exact path={['/uifac/recurrente/confirmuser']} component={ConfirmUser}/>
            <Route exact path={['/uifac/recurrente/activeuser']} component={ActiveUser}/>
            <Route exact path={['/uifac/recurrente/changepassword']} component={ChangePassword}/>
            <Route exact path={['/uifac/recurrente/fact']} component={Fact}/>
            <Route exact path={['/uifac/recurrente/acount']} component={Acount}/>
            <Route exact path={['/uifac/recurrente/myfac']} component={MyFac}/>
            <Route exact path={['/uifac/recurrente/allfac']} component={AllFac}/>
            <Route exact path={['/uifac/recurrente/alluser']} component={AllUser}/>
            {/*<Route exact path={['/uifac/register']} component={Register}/>*/}
            {/*<Route exact path={['/uifac/loguin']} component={Loguin}/>*/}
            {/*{<Route exact path={['/uifac/register']} component={Register}/>*/}
            {/*<Route exact path={['/uifac/confirmuser']} component={ConfirmUser}/>*/}
            {/*<Route exact path={['/uifac/resetpassword']} component={ResetPassword}/>*/}
            {/*<Route exact path={['/uifac/acount']} component={Acount}/>*/}
            {/*<Route exact path={['/uifac/myfac']} component={MyFac}/>*/}
            {/*<Route exact path={['/uifac/changepassword']} component={ChangePassword}/>*/}
            <Route exact path="*">
                <Redirect to="/uifac/expres"/>
            </Route>
        </Switch>
    </BrowserRouter>;
};

Routes.propTypes = {};

Routes.defaultProps = {};

export default Routes;