export const TRIGGER_SCORING = "trigger_scoring";
export const ADD_DATA_OBJ = "add_data_obj";
export const SET_DATA_OBJ = "set_data_obj";
export const SET_SCORE_URL = "set_score_url";
export const SET_PRED = "set_pred";
export const SET_DELAY = "set_delay";

export const triggerScoring = () => ({
    type: TRIGGER_SCORING,
});

export const addDataObj = (obj) => ({
    type: ADD_DATA_OBJ,
    obj
});

export const setDataObj = (dataObj) => ({
    type:SET_DATA_OBJ,
    dataObj
});

export const setScoreUrl = (url) => ({
    type: SET_SCORE_URL,
    url
})

export const setPred = (pred) => ({
    type: SET_PRED,
    pred
})

export const setDelay = (delay) => ({
    type: SET_DELAY,
    delay
})

const initialState = {
    scoreUrl: "https://node-red-fhbgld-2021-05-14.eu-de.mybluemix.net/score_motion",
    dataObj: {
        dataArray:[],
    },
    pred: null,
    delay: 100
};


const ScoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DATA_OBJ:
            console.log("ScoreReducer.ADD_DATA_OBJ");
            console.log(action.obj);
            let newAddObState = {
                ...state,
                dataObj: {
                    ...state.dataObj,
                    dataArray: [...state.dataObj.dataArray, action.obj]
                }
            }
            console.log(newAddObState);
            return newAddObState;
        case SET_DATA_OBJ:
            console.log("ScoreReducer.SET_DATA_OBJ");
            console.log(action.dataObj);
            return {
                ...state,
                dataObj: action.dataObj,
            }
        case SET_PRED:
            console.log("ScoreReducer.SET_PRED");
            console.log(action.pred);
            return {
                ...state,
                pred: action.pred,
            }
        case SET_DELAY:
            console.log("ScoreReducer.SET_DELAY");
            console.log(action.delay);
            return {
                ...state,
                delay: action.delay,
            }
        case SET_SCORE_URL:
            console.log("ScoreReducer.SET_SCORE_URL");
            console.log(action.url);
            return {
                ...state,
                scoreUrl: action.url,
            }

    default:
        return state;
    }
};
      
export default ScoreReducer;
        
