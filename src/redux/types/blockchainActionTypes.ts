import { Blockchain } from "../../enums/blockchain";

export const SET_BLOCKCHAIN = 'SET_BLOCKCHAIN';

interface SetBlockchainAction {
    type: typeof SET_BLOCKCHAIN,
    payload: Blockchain
}

export type BlockchainActionTypes = SetBlockchainAction;