import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { EscrowContext } from "../../context/EscrowContext";
import { BsArrowRight } from "react-icons/bs";
import Loader from "../Loader/Loader";

const Home: FC = (): JSX.Element => {
  const {
    state: { isConnected, isConnecting },
    connectWallet,
  } = useContext(EscrowContext);

  return (
    <div className="h-screen justify-center items-center flex flex-row bg-[#1F2131] gap-2 p-5">
      <div className="basis-1/2 justify-center items-center">
        <h1 className="text-[#f3f1f3] font-extrabold text-5xl">
          Make safe Transactions
        </h1>
        <p className="gradient_text">Send Your DAI Safely</p>
        {isConnected ? (
          <Link className="link" to="/Contracts">
            Go to Contracts
            <BsArrowRight className="items-center ml-2" />
          </Link>
        ) : (
          <button
            onClick={() => connectWallet()}
            className="btn"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <Loader text={"connecting..."} />
            ) : (
              "Connect Wallet"
            )}
          </button>
        )}
      </div>
      <div className="basis-1/2 flex justify-center items-center align-middle relative">
        {/* {[48, 56, 72, 80, 96].map((l, index) => (
                    <div key={index} className={`rounded-full absolute h-${l} w-${l} shadow-[#FF7132] shadow-2xl`} />
                ))} */}
        <div
          className={`rounded-full absolute h-56 w-56 shadow-[#FF7132] shadow-2xl`}
        />
      </div>
    </div>
  );
};

export default Home;
