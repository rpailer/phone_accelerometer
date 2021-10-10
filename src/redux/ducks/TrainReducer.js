export const TRIGGER_TRAIN = "trigger_train";
export const SET_TRAIN_URL = "set_train_url";
export const SET_TRAIN_DELAY = "set_train_delay";

export const triggerTrain = () => ({
    type: TRIGGER_TRAIN,
});

export const setTrainUrl = (url) => ({
    type: SET_TRAIN_URL,
    url
})

export const setTRainDelay = (delay) => ({
    type: SET_TRAIN_DELAY,
    delay
})

const initialState = {
    trainUrl: "https://node-red-fhbgld-2021-05-14.eu-de.mybluemix.net/train_motion",
    dataObj: {
        dataArray:[],
    },
    delay: 100
};


const TrainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRAIN_DELAY:
            console.log("TrainReducer.SET_TRAIN_DELAY");
            console.log(action.delay);
            return {
                ...state,
                delay: action.delay,
            }
        case SET_TRAIN_URL:
            console.log("TrainReducer.SET_TRAIN_URL");
            console.log(action.url);
            return {
                ...state,
            trainUrl: action.url,
            }

    default:
        return state;
    }
};
      
export default TrainReducer;
        
