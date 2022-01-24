import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    user: null,
    firstName: null,
    lastName: null
};

if (localStorage.getItem('token')) {
    const decodedToken = jwtDecode(localStorage.getItem('token'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        localStorage.removeItem('currTimer');
        // call APi to refresh the token using the user's refresh token (stored in server)
        // update token in localStorage with new expiry time
    } else {
        initialState.user = decodedToken;
        initialState.firstName = localStorage.firstName;
        initialState.lastName = localStorage.lastName;
    }
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

function authReducer(state, action) {
    switch (action.type) {
    case 'LOGIN':
        return {
            ...state,
            user: action.payload.userData,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
        };
    case 'LOGOUT':
        return {
            ...state,
            user: null,
            firstName: null,
            lastName: null
        };
    case 'UPDATE':
        return {
            ...state,
            user: action.payload.userData,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
        }
    default:
        return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData, firstName, lastName) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        dispatch({
            type: 'LOGIN',
            payload: {userData: userData, firstName: firstName, lastName: lastName}
        });
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currTimer');
        dispatch({ type: 'LOGOUT' });
    }

    function updateDetails(userData, firstName, lastName) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        dispatch({
            type: 'UPDATE',
            payload: {userData: userData, firstName: firstName, lastName: lastName}
        });
    }

    return (
    <AuthContext.Provider
        value={{ user: state.user, firstName: state.firstName, lastName: state.lastName, login, logout, updateDetails }}
        {...props}
    />
    );
}

export { AuthContext, AuthProvider };