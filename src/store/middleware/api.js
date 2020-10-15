import axios from "axios";
import * as actions from "../api";


const api = ({ dispatch }) => next => async action => {

    if (action.type !== actions.apiRequest.type) return next(action);

    const { url, method, data, onSuccess, onError, onStart } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
        const response = await axios.request({
            baseURL: "https://fast-reaches-62964.herokuapp.com/api/",
            url,
            method,
            data
        });

        //General
        dispatch(actions.apiRequestSuccess(response.data));

        //Specific
        if (onSuccess) dispatch({ type: onSuccess, payload: response.data });

    } catch (error) {
        //General
        dispatch(actions.apiRequestFailed(error.message));

        //Specific
        if (onError) dispatch({ type: onError, payload: error.message })
    }
}

export default api;