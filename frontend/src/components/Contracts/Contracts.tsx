import { Link } from 'react-router-dom';
import ExistingContract from '../ExistingContract/ExistingContract';
import NewContract from '../NewContract/NewContract'
import { shortenAddress } from '../../Utils/utils'
import { EscrowContext } from '../../context/EscrowContext'
import { useContext } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { ContractProp } from '../../types';

function Contracts() {
    const { state: { currentAccount, contracts } } = useContext(EscrowContext);
    const addr = shortenAddress(currentAccount);
    
    return (
        <div className='p-4 md:p-8'>
            <div className='flex justify-between items-center py-4'>
                <Link
                    className="text-[#FF7132] text-lg delay-150 hover:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out flex justify-center items-center" 
                    to='/'>
                    <BsArrowLeft className="items-center mr-2" />
                    Back
                </Link>
                <p>Connected to: <span className="border p-2 border-[#FF7132]">{addr}</span></p>
            </div>
            <div className='flex flex-row gap-6'>
                <div className='basis-1/2'>
                    <NewContract />
                </div>
                <div className='basis-1/2 flex justify-center flex-col items-center'>
                    <h1 className='mb-4'>
                        {contracts?.length === 0 ? 'No Contracts available' : 'Existing Contracts'}
                    </h1>
                    <div className='flex flex-col w-full gap-4'>
                        {contracts?.map((contract: ContractProp) => {
                            const { beneficiary, arbiter, depositor } = contract;
                            if (beneficiary.toLowerCase() === currentAccount.toLowerCase() || arbiter.toLowerCase() === currentAccount.toLowerCase() || depositor.toLowerCase() === currentAccount.toLowerCase()) {
                               return  <ExistingContract key={contract._id} {...contract} />
                            } 
                        })}
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Contracts;
