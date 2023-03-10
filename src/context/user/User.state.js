import React, {useReducer} from 'react';
import UserReducer from './User.reducer';
import UserContext from "./User.context";
import {BASE_URL} from "../../const/const";
import {GET_USER_LOGIN, GET_USER_QR, PUT_USER_ID} from "./User.types";

const UserState = (props) => {
    const initialState = {
        loginUser: [],
        selectedUser: [],
        loadingLoginUser: true,
        loadingSelectedUser: true,
        selectedUserId: '',
    };

    const [state, dispatch] = useReducer(UserReducer, initialState)

    const getUserByLogin = async (id) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        try {
            const endpoint = `${BASE_URL}/user/${id}`
            const response = await fetch(endpoint, requestOptions);
            const result = await response.json();
            dispatch({
                type: GET_USER_LOGIN,
                payload: result
            });
        } catch (e) {
            console.log(e)
        }
    };

    const getUserByQR = async (id) => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };
        try {
            const endpoint = `${BASE_URL}/user/${id}`
            const response = await fetch(endpoint, requestOptions);
            const result = await response.json();
            dispatch({
                type: GET_USER_QR,
                payload: result
            });
        } catch (e) {
            console.log(e)
        }
    };

    const updateUserId = (id) => {
        dispatch({
            type: PUT_USER_ID,
            payload: id
        });
    };

    return <UserContext.Provider
        value={{
            loginUser: state.loginUser,
            selectedUser: state.selectedUser,
            loadingLoginUser: state.loadingLoginUser,
            loadingSelectedUser: state.loadingSelectedUser,
            getUserByQR,
            getUserByLogin,
            updateUserId,
            selectedUserId: state.selectedUserId,
        }}
    >
        {props.children}
    </UserContext.Provider>
}

export default UserState;