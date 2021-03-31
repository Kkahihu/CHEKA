import React, {createContext,useContext,useReducer} from 'react';

//Data Layer
export const StateContext = createContext();

//higher order component
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

//pull information from the data layer
export const useStateValue = () => useContext(StateContext);