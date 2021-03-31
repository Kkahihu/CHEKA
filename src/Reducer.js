//initial state(user not being logged in)
export const initialState = {
    user:null,
};

//push user to sign in
export const actionTypes = {
    SET_USER : "SET_USER",
};

//change state and user
const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;
