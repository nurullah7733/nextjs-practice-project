import { createContext, useContext, useReducer } from 'react';
import { authConstans } from './constans';

const Store = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case authConstans.LOGIN_REQUEST: {
            return {
                ...state,
                user: {
                    authenticating: true,
                    ...state.user,
                },
            };
        }
        case authConstans.LOGIN_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.payload,
                    authenticating: false,
                    authenticated: true,
                    ...state.user.user,
                },
            };
        }
        case authConstans.LOGIN_FAILD: {
            return {
                ...state,
                user: {
                    ...state.user,
                    error: action.payload,
                },
            };
        }

        default:
            return state;
    }
};

export const UseStore = () => useContext(Store);

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: {
            authenticated: false,
            authenticating: false,
            error: null,
        },
    });

    return (
        <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>
    );
};
