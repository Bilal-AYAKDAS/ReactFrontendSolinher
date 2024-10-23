import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function questionListReducer(state=initialState.questions,action){
    switch (action.type) {
        case actionTypes.GET_QUESTIONS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}
