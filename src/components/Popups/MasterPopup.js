import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ConfigViewPopup from "./ConfigViewPopup";
import GetStartedPopup from "./GetStartedPopup";
import {
    getAllStates,
    getAllCategories,
    getAllServices,
    getAllPaymentTypes,
    getAllWorkIndustries,
    getAllNotifications,
    getUnreadMessageCount,
    getAllConversations,
} from "../../redux/strapi_actions/view.action";
import {
    getAllSuggestionsByStatus,
    getAllMySuggestion,
    suggestThemForMe,
} from "../../redux/strapi_actions/alice.actions";
import NotificationPopup from "./NotificationPopup";
import AppUpdatePopup from "./AppUpdatePopup";
import { setUserOnline } from "../../redux/strapi_actions/auth.actions";
import { useInterval } from "react-use";

const MasterPopup = (props) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllStates());
        dispatch(getAllCategories());
        dispatch(getAllServices());
        dispatch(getAllPaymentTypes());
        dispatch(getAllWorkIndustries());
        if (user) {
            dispatch(setUserOnline())
        }
    }, []);
    
    useEffect(() => {
        if(user){
            dispatch(getAllNotifications());
            dispatch(getAllMySuggestion())
            dispatch(suggestThemForMe())
            dispatch(getUnreadMessageCount())
            dispatch(getAllConversations())
        }
    },[user])

    useInterval(() => {
        if (user) {
            dispatch(getAllSuggestionsByStatus("accepted"));
            dispatch(getAllMySuggestion());
            dispatch(suggestThemForMe());
            dispatch(getAllNotifications());
            dispatch(setUserOnline());
            dispatch(getUnreadMessageCount());
        }
    }, 40000);

    if (user) {
        return (
            <>
                <ConfigViewPopup />
                <GetStartedPopup />
                {/* <NotificationPopup /> */}
                <AppUpdatePopup />
            </>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MasterPopup);
