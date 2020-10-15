import { createSlice } from "@reduxjs/toolkit";
import { apiRequest } from './api';
import jwtDecode from "jwt-decode";

const url = "/auth";
const tokenKey = "token";

const userslice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        getCurrentUser: (user, action) => {
            const { jwt } = action.payload
            if (jwt) return jwtDecode(jwt);
            else return null;
        },
        logIn: (user, action) => {
            const jwt = action.payload;
            localStorage.setItem(tokenKey, jwt);

            return { jwt };
        }
    }
});

//console.log(userslice);

const { getCurrentUser, logIn } = userslice.actions;
export default userslice.reducer;



export const getUser = () => (dispatch, getState) => {
    const jwt = localStorage.getItem(tokenKey);

    dispatch({
        type: getCurrentUser.type,
        payload: { jwt }
    });
};

export const login = (email, password) => apiRequest({
    url: url,
    method: "post",
    data: { email, password },
    onSuccess: logIn.type
})



