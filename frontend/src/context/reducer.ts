import { Action, InitialStateProp, Type } from "../types";

const InitialState = {
    currentAccount: '',
    isConnected: false,
    contracts: [],
    interest: '',
    isConnecting: false
}

export const contractsReducer = (state: InitialStateProp = InitialState, action: Action) => {
    switch (action.type) {
        case Type.CONNECT:
            return {
                ...state,
                currentAccount: action.payload.address,
                isConnected: action.payload.bool
            }

            case Type.CONNECTING:
                return {
                    ...state,
                    isConnecting: action.payload,
                }    

        case Type.FETCH:
            return {
                ...state,
                contracts: action.payload
            }

        case Type.INTEREST:
                return {
                    ...state,
                    interest: action.payload
                }    

        case Type.UPDATE:
            const updatedContracts = state.contracts.map((contract: any) => (contract._id === action.payload._id ? action.payload : contract));
            return { ...state, contracts: updatedContracts };

        case Type.DELETE:
            const latestContracts = state.contracts.filter((contract: any) => contract._id !== action.payload._id);
            return { ...state, contracts: latestContracts };

        default:
            return state;
    }
}