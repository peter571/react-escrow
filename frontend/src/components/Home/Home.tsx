import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EscrowContext } from "../../context/EscrowContext";
import { BsArrowRight } from 'react-icons/bs';

const Home: FC = (): JSX.Element => {

    const { state: { isConnected }, connectWallet } = useContext(EscrowContext);
    
    return (
        <div className="h-screen flex justify-center items-center flex-col bg-[#1F2131] gap-4">
            <h1 className="text-[#FF7132] transition duration-150 ease-in-out font-[2000] font-mono text-5xl">DAI Escrow safe Transactions</h1>
            <p className="text-[#f3f1f3] transition duration-150 ease-in-out font-mono text-2xl">Send Your DAI Safely</p>
            {isConnected ? (
                <Link
                    className="text-[#FF7132] text-lg delay-150 hover:-translate-y-1 hover:scale-110 transition duration-150 ease-in-out flex justify-center items-center" to='/Contracts'>
                    Go to Contracts
                    <BsArrowRight className="items-center ml-2" />
                </Link>
            ) : (
                <button
                    onClick={() => connectWallet()}
                    className="delay-150 hover:-translate-y-1 hover:scale-110 bg-[#FF7132] px-3 py-2 whitespace-nowrap align-middle shadow hover:shadow-orange-400 rounded-full text-white text-xs md:text-sm font-mono transition duration-150 ease-in-out">
                    Connect Wallet
                </button>
            )}
        </div>
    )
}

export default Home;
