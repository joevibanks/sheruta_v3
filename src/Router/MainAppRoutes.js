import React, { Suspense } from 'react';
import PageLoader from '../components/PageLoader';
import 'antd/dist/antd.css';
import "../theme.override.css";
// import "../social_css/css/main.min.css";
import '../social_css/css/style.css';
import { Provider } from "react-redux";
import store from "../redux/store/store";
// import '../assets/css/colors.css';
import '../assets/css/styles.css';
import '../v4_css/style.css';
import '../App.css';
import 'react-activity/src/Spinner/Spinner.css'
// import firebase from "../Firebase"

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Contact from '../pages/Contact/Contact';
// import About from '../pages/About/About';
// import PropertyDetails from '../pages/PropertyDetails/PropertyDetails';
// import Login from '../pages/Login/Login';
// import Signup from '../pages/Signup/Signup'
// import CreateRequest from '../pages/Request/CreateRequest';
// import GetStarted from "../pages/GetStarted/GetStarted";
// import Pricing from "../pages/Pricing/Pricing";
// import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';
// import RequestDetails from '../pages/Request/RequestDetails';
// import SearchResults from '../pages/SearchResults/SearchResults'
// import VerifyEmail from '../pages/VerifyEmail/VerifyEmail';
// import PasswordReset from '../pages/ResetPassword/PasswordReset';
// import PropertySort from '../pages/Property/PropertySort'
// import WhatNext from '../pages/GetStarted/Steps/WhatNext';
// import AllRequests from '../pages/Request/AllRequests'
// import Request from "../pages/Request/Request";

import PageNotFound from '../pages/PageNotFound';
import UserFeedback from '../pages/Feedback/UserFeedback'
import FeedbackPopup from '../pages/Feedback/FeedbackPopup';
import PaymentPopup from '../components/Popups/PaymentPopup';
import ResetPasswordRequest from '../pages/ResetPassword/ResetPasswordRequest'
import MasterPopup from '../components/Popups/MasterPopup';
import Home from '../pages/Home/Home';
import Notifications from '../pages/Notifications/Notifications';
import Match from '../pages/Match/Match';
import Profile2 from "../pages/Profile/Profile2";
import RobotMessageContainer from '../components/Ads/RobotMessage/RobotMessageContainer';

const PropertyDetails = React.lazy(() =>
    import("../pages/PropertyDetails/PropertyDetails"),
);
const CreateRequest = React.lazy(() =>
    import("../pages/Request/CreateRequest"),
);
const GetStarted = React.lazy(() => import("../pages/GetStarted/GetStarted"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Signup = React.lazy(() => import("../pages/Signup/Signup"));
const Pricing = React.lazy(() => import("../pages/Pricing/Pricing"));
const Contact = React.lazy(() => import("../pages/Contact/Contact"));
const About = React.lazy(() => import("../pages/About/About"));
const SignUpSuccess = React.lazy(() =>
    import("../pages/SignUpSuccess/SignUpSuccess"),
);
const RequestDetails = React.lazy(() =>
    import("../pages/Request/RequestDetails"),
);
const SearchResults = React.lazy(() =>
    import("../pages/SearchResults/SearchResults"),
);
const VerifyEmail = React.lazy(() =>
    import("../pages/VerifyEmail/VerifyEmail"),
);
const PasswordReset = React.lazy(() =>
    import("../pages/ResetPassword/PasswordReset"),
);
const PropertySort = React.lazy(() => import("../pages/Property/PropertySort"));
const WhatNext = React.lazy(() => import("../pages/GetStarted/Steps/WhatNext"));
const AllRequests = React.lazy(() => import("../pages/Request/AllRequests"));
const Request = React.lazy(() => import("../pages/Request/Request"));
const Blog = React.lazy(() => import("../pages/Blog/Blog"));
const BlogDetails = React.lazy(() => import("../pages/Blog/BlogDetails"));


function App() {
  // React.useEffect(() => {
  //     setTimeout(() => {
  //       const msg = firebase.messaging();
  //       msg.requestPermission()
  //           .then(() => {
  //               return msg.getToken();
  //           })
  //           .then((data) => {
  //               console.log("========= NOTIFY ======================", data);
  //           });
  //     }, 10000);
  // });

    return (
      <Suspense fallback={<PageLoader />}>
        <Provider store={store}>
          <div className="wrapper mm-page mm-slideout">
                <div className="clearfix"></div>
                <BrowserRouter>
                  <FeedbackPopup />
                  <PaymentPopup />
                  <MasterPopup />
                  <RobotMessageContainer />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/start" component={GetStarted} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/notifications" component={Notifications} />
                    <Route exact path="/match" component={Match} />
                    {/* <Route exact path="/submit" component={Submit} /> */}
                    <Route exact path="/what-next" component={WhatNext} />
                    <Route exact path="/blog/:uuid/:id" component={BlogDetails} />
                    <Route exact path="/start/:step" component={GetStarted} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/requests" component={Request} />
                    <Route exact path="/requests/all" component={AllRequests} />
                    <Route exact path="/user/:username" component={Profile2} />
                    <Route
                      exact
                      path="/property/:name/:property_id"
                      component={PropertyDetails}
                    />
                    <Route exact path="/signup" component={Signup} />
                    <Route
                      exact
                      path="/signup/success"
                      component={SignUpSuccess}
                    />
                    <Route
                      exact
                      path="/requests/create/:service_id/:category_id/:is_searching"
                      component={CreateRequest}
                    />
                    <Route
                      exact
                      path="/request/:uid/:user_id"
                      component={RequestDetails}
                    />
                    <Route exact path="/search" component={SearchResults} />
                    <Route
                      exact
                      path="/search/:category/:location/:bedroom"
                      component={SearchResults}
                    />
                    <Route exact path="/pricing" component={Pricing} />
                    <Route exact path="/feedback" component={UserFeedback} />
                    <Route
                      exact
                      path="/email/activate/:token/:confirmationToken"
                      component={VerifyEmail}
                    />
                    <Route
                      exact
                      path="/password/reset/request"
                      component={ResetPasswordRequest}
                    />
                    <Route
                      exact
                      path="/password/reset/u/:token/:resetPasswordToken"
                      component={PasswordReset}
                    />
                    <Route
                      exact
                      path="/requests/create"
                      component={CreateRequest}
                    />
                    <Route exact path="/properties" component={PropertySort} />
                    {/* 

                                    <Route exact path="/share" component={Share} />

                                    */}
                    <Route component={PageNotFound} />
                  </Switch>
                </BrowserRouter>
              </div>
        </Provider>
      </Suspense>
    );
}

export default App;
