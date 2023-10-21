import { createContext, useReducer } from 'react';

export const AuthUserContext = createContext(null);
export const AuthUserDispatchContext = createContext(null);

const AuthUserProvider = ({ children }) => {
    const [username, dispatch] = useReducer(usernameReducer, initialState);

    return (
        <AuthUserContext.Provider value={username}>
            <AuthUserDispatchContext.Provider value={dispatch}>
                {children}
            </AuthUserDispatchContext.Provider>
        </AuthUserContext.Provider>
    )
}

export default AuthUserProvider;

const usernameReducer = (username, action) => {
    switch(action.type) {
        case 'login': 
            return action.payload;
        case 'logout':
            return '';
        default:
            break;
    }
}

const initialState = '';