import * as actionTypes from "./actionTypes"

export function getQuestionsSuccess(questions){
    return{ type : actionTypes.GET_QUESTIONS_SUCCESS, payload :questions}
}

export function getQuestions(questionName){
    return function(dispatch){
        let url = "http://localhost:3000/questions"
        if(questionName){
            url = url +"?questionName="+questionName
        }
        return fetch(url).then(response=>response.json())
        .then(result=>dispatch(getQuestionsSuccess(result)))
    }
}