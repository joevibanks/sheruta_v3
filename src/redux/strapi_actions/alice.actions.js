import { notification } from "antd";
import Alice from "../../utils/Alice";

export const getAllMySuggestion = () => async (dispatch) => {
    // console.log("GETTING ALL");
    try {
        const all = await Alice.getAllMySuggestions();
        dispatch({
            type: "GET_ALL_MY_SUGGESTIONS",
            payload: all.data,
        });
    } catch (error) {
        // notification.error({ message: "Suggestion Error" });
        return Promise.reject(error);
    }
};

export const getAllSuggestionsByStatus = (status) => async (dispatch) => {
    try {
        const all = await Alice.getAllMySuggestionsByStatus(status);
        dispatch({
            type: "GET_SUGGESTIONS_BY_STATUS",
            payload: all.data,
        });
    } catch (error) {
        // notification.error({ message: "Error" });
        Promise.reject(error);
    }
};

export const suggestThemForMe = () => async (dispatch) => {
    try {
        const all = await Alice.suggestThemForMe();
        dispatch({
            type: "SET_USER_STATE",
            payload: {
                user_suggestions: all.data,
            },
        });
    } catch (error) {
        // notification.error({ message: "Error getting suggestions" });
    }
};