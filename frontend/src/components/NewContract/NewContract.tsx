import React, { useContext, useState } from 'react'
import { EscrowContext } from '../../context/EscrowContext'
import Loader from '../Loader/Loader'

function NewContract() {

    const [contractValues, setContractValues] = useState({ arbiter: '', beneficiary: '', amount: '' });
    const [isSubmitting, setSubmitting] = useState(false);
    const [rate, setRate] = useState('')
    const { newContract, state: { interest } } = useContext(EscrowContext);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setContractValues({ ...contractValues, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            setSubmitting(true);
            await newContract(arbiter, beneficiary, Number(amount));
            setSubmitting(false);
            setRate(interest);
            setContractValues({ arbiter: '', beneficiary: '', amount: '' });
            alert(`Successfully Deployed Contract! Current Liquidity Rate is : ${rate}%`);
        } catch (error) {
            setSubmitting(false);
        }
    }

    const { arbiter, beneficiary, amount } = contractValues;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-start flex-1 gap-3">
            <h1 className='mb-4'>New Contract</h1>
            <input className="p-1 bg-slate-200 outline-1 rounded-sm outline" type="text" name="arbiter" value={arbiter} id="arbiter" onChange={handleChange} placeholder="Arbiter address" required />
            <input className="p-1 bg-slate-200 outline-1 rounded-sm outline" type="text" name="beneficiary" value={beneficiary} id="beneficiary" onChange={handleChange} placeholder="Beneficiary address" required />
            <input className="p-1 bg-slate-200 outline-1 rounded-sm outline" type="number || text" name="amount" value={amount} id="amount" min={0} onChange={handleChange} placeholder="Amount(DAI)" required />
            {isSubmitting ? (
                <Loader />
            ) : (
                <button className={`bg-[#1F2131] py-1 px-2 text-white delay-150 hover:-translate-y-1 hover:scale-102 transition ease-in`} type='submit'>
                    Approve and deploy
                </button>
            )}
        </form>
    )
}

export default NewContract;
