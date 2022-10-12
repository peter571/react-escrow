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
            <h1 className='mb-4 text-white'>Create new Contract</h1>
            <input className="form_input" type="text" name="arbiter" value={arbiter} id="arbiter" onChange={handleChange} placeholder="Arbiter address" required />
            <input className="form_input" type="text" name="beneficiary" value={beneficiary} id="beneficiary" onChange={handleChange} placeholder="Beneficiary address" required />
            <input className="form_input" type="number || text" name="amount" value={amount} id="amount" min={0} onChange={handleChange} placeholder="Amount(DAI)" required />
            <button className="btn"
                type='submit'
                disabled={isSubmitting}>
                    {isSubmitting ? <Loader text={'processing...'} /> :'Approve and deploy'}
            </button>
            
        </form>
    )
}

export default NewContract;
