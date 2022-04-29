export interface ContractProp {
    contractAddress: string;
    arbiter: string;
    beneficiary: string;
    depositor: string;
    amount: number;
    approved: boolean;
    _id: string;
    date: string;
}

export interface EscrowProp {
    children: React.ReactNode;
}

export interface InitialStateProp {
    currentAccount: string;
    isConnected: boolean;
    contracts: ContractProp[];
    interest: string;
}

export enum Type {
    CONNECT = 'CONNECT',
    FETCH = 'FETCH',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    INTEREST = 'INTEREST'
}

export interface Action {
    type: Type;
    payload: any;
}

export interface GlobalData {
    connectWallet: () => Promise<void>;
    newContract: (arbiter: string, beneficiary: string, amount: number) => Promise<void>;
    approve: (address: string, id: string, arbiter: string) => Promise<void>;
    state: InitialStateProp;
    dispatch: React.Dispatch<{ type: Type, payload: any }>;
    removeContract: (id: string) => Promise<void>;
}
