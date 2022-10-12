import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { deploy, getCurrentInterest } from './deploy';
import { ContractsService } from '../api';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json';
import { GlobalData, Action, EscrowProp, InitialStateProp, Type } from '../types'
import { contractsReducer } from './reducer'

declare var window: any;

const { ethereum } = window;

export const EscrowContext = React.createContext<GlobalData>({} as GlobalData)

export const EscrowProvider = ({ children }: EscrowProp) => {

    const [state, dispatch] = React.useReducer(contractsReducer, {} as InitialStateProp);
    const { fetchContracts, updateContract, createContract, deleteContract } = ContractsService;

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            dispatch({
                type: Type.CONNECTING,
                payload: true
            })
            const accounts = await ethereum.request({ method: "eth_requestAccounts", });
            dispatch({
                type: Type.CONNECT,
                payload: { address: accounts[0], bool: true }
            })
            dispatch({
                type: Type.CONNECTING,
                payload: false
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: Type.CONNECTING,
                payload: false
            })
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                dispatch({
                    type: Type.CONNECT,
                    payload: { address: accounts[0], bool: true }
                })
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const newContract = async (arbiter: string, beneficiary: string, amount: number) => {

        const value = ethers.utils.parseEther(amount.toString());
        const contract = await deploy(arbiter, beneficiary, value);
        const d = new Date()

        const rate = await getCurrentInterest();    
        dispatch({
            type: Type.INTEREST,
            payload: rate
        })

        await createContract({
            arbiter: arbiter,
            beneficiary: beneficiary,
            depositor: state.currentAccount,
            contractAddress: contract?.address,
            amount: amount,
            approved: false,
            date: d.toTimeString()
        })

        const { data } = await fetchContracts()

        dispatch({
            type: Type.FETCH,
            payload: data
        })
    }

    const approve = async (contractAddress: string, id: string, arbiter: string) => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const ct = new ethers.Contract(contractAddress, Escrow.abi, signer);

            const tx = await ct.connect(signer).approve();
            await tx.wait();
            //update approved in db
            const { data } = await updateContract(id, { approved: true });

            dispatch({
                type: Type.UPDATE,
                payload: data
            })
        } catch (error) {
            alert('Error! Confirm you are the Arbiter and have some balance on your account!')
        }
    };

    const removeContract = async (id: string) => {
        const { data } = await deleteContract(id);

        dispatch({
            type: Type.DELETE,
            payload: data
        })
    }

    ethereum.on('chainChanged', async () => {
        await connectWallet()
        window.location.reload();
    });

    ethereum.on('accountsChanged', async (accounts: string[]) => {
        await connectWallet()
    });

    useEffect(() => {
        checkIfWalletIsConnect()
        fetchContracts().then((result) => {
            const { data } = result;
            dispatch({
                type: Type.FETCH,
                payload: data
            })
        })
    }, [])

    return (
        <EscrowContext.Provider value={{ state, dispatch, connectWallet, approve, newContract, removeContract }}>
            {children}
        </EscrowContext.Provider>
    )
}
