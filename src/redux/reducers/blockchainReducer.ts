import { Blockchain } from "../../enums/blockchain";
import { BlockchainActionTypes, SET_BLOCKCHAIN } from "../types/blockchainActionTypes";

// initial state
const initialState: Blockchain = Blockchain.ETHEREUM;

export function blockchainReducer(
    state = initialState,
    action: BlockchainActionTypes
): Blockchain {
    switch (action.type) {
        case SET_BLOCKCHAIN:
            return action.payload;
        default:
            return state;
    }
}
