import React, { useEffect, useState } from "react";
import axios from "axios";
import { WalletCardProps } from "./types";

export const WalletCard = ({
  address,
  id,
  balance,
  phrase,
  recreateWallet,
}: WalletCardProps) => {
  const [liveBalance, setLiveBalance] = useState(0);
  const refreshBalance = () =>{
    axios.post("wallet/refresh", {id}).then((response) => {
      setLiveBalance(response.data);
    });
  }
  const SEC20 = 30000;

  useEffect(() => {
    setLiveBalance(balance);
    refreshBalance();
    const interval = setInterval(() => {
      refreshBalance();
    }, SEC20);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="col-lg-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{liveBalance} ETH</h5>
          <p className="card-text">{address}</p>
          <p className="card-text">{phrase}</p>
          <a className="btn btn-primary me-2" onClick={refreshBalance}>
            Refresh
          </a>
          <a className="btn btn-danger" onClick={() => recreateWallet(id)}>
            RECREATE
          </a>
        </div>
      </div>
    </div>
  );
};
