import { FC, useContext, useState } from "react";
import { EscrowContext } from '../../context/EscrowContext';
import { ContractProp } from "../../types";
import Loader from '../Loader/Loader'

const ExistingContract: FC<ContractProp> = ({ arbiter, contractAddress, beneficiary, amount, approved, _id }): JSX.Element => {

    const [isSubmitting, setSubmitting] = useState(false);
    const { approve, removeContract } = useContext(EscrowContext);

    const approveContract = async (contractAddress: string, _id: string, arbiter: string) => {
        try {
            setSubmitting(true)
            await approve(contractAddress, _id, arbiter);
            setSubmitting(false)
        } catch (error) {
            setSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col flex-1 gap-2 bg-gray-200 p-4 font-serif">
            <p className="text-black font-bold">Arbiter: <span className="font-[100] text-sm">{arbiter}</span></p>
            <p className="font-bold text-black">Beneficiary: <span className="font-[100] text-sm">{beneficiary}</span></p>
            <p className="font-bold text-black">View on Etherscan: <a className="text-sky-700" href={`https://kovan.etherscan.io/address/${contractAddress}`} target="_blank">Etherscan</a></p>
            <p className="text-md font-serif">${amount} DAI</p>
            {isSubmitting ? (
                <Loader text={"approving..."} />
            ) : (
                <button
                    onClick={() => approveContract(contractAddress, _id, arbiter)}
                    className={`${approved ? 'bg-[#5aa75a]' : 'btn'}`} disabled={approved}>
                    {approved ? '✓ Its been approved!' : 'Approve Escrow'}
                </button>
            )}
            {approved && (
                <h1 
                onClick={() => removeContract(_id)}
                className="hover:text-gray-600 text-center cursor-pointer">
                    Delete
                </h1>
            )}
        </div>
    )
}

export default ExistingContract;
