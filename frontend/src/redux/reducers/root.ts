import { combineReducers } from "redux";
import { blockchainReducer } from "./blockchainReducer";

const rootReducer = combineReducers({
    blockchain: blockchainReducer,
    // Other reducers go here
  });
  
  export default rootReducer;