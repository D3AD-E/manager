import { Blockchain } from "../../enums/blockchain";
import { BlockchainActionTypes, SET_BLOCKCHAIN } from "../types/blockchainActionTypes";

export const setBlockchain = (blockchain: Blockchain): BlockchainActionTypes => ({
    type: SET_BLOCKCHAIN,
    payload: blockchain
});