import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActionWalletCardProps } from "./types";
import { GenericInputModal } from "../modals/genericInputModal";
import { toast } from "react-toastify";
import { REFRESH_AMOUNT as REFRESH_DELAY_MS } from "../../constants/constants";
import { BigNumber } from "../../commontypes/bigNumber";
import { playMoney } from "../../audio/sounds";
import { SellModal } from "../modals/sellModal";
import { BuyModal } from "../modals/buyModal";

export const ActionWalletCard = ({
  walletId,
  address,
  tokenId,
  tokenName,
  tokenPriceInWeth,
  tokenPriceInUsdt
}: ActionWalletCardProps) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState<string>();
  const [isBuyInputOpen, setIsBuyInputOpen] = useState(false);
  const [isSellInputOpen, setIsSellInputOpen] = useState(false);
  const refreshBalance = () => {
    axios.post("wallet/refresh", { id: walletId }).then((response) => {
      setEthBalance(response.data);
    });
    axios
      .get("token/balance", { params: { walletId, tokenId } })
      .then((response) => {
        setTokenBalance(response.data);
      });
  };

  const buy = (amount: number) => {
    axios.post("wallet/buy", { walletId, tokenId, amount }).then((response) => {
      playMoney();
      toast.success(`Bought for ${amount} ETH successfully`);
      refreshBalance();
    });
  };

  const sell = (amount: string) => {
    axios
      .post("wallet/sell", { walletId, tokenId, amount })
      .then((response) => {
        playMoney();
        toast.success(`Sold ${amount} ${tokenName} successfully`);
        refreshBalance();
      });
  };

  const dump = () => {
    axios.post("wallet/sell/all", { walletId, tokenId }).then((response) => {
        playMoney();
        toast.success(`Dumped ${tokenName} successfully`);
        refreshBalance();
    });
  };

  useEffect(() => {
    refreshBalance();
    // const interval = setInterval(() => {
    //   refreshBalance();
    // }, REFRESH_DELAY_MS);

    // return () => clearInterval(interval);
  });

  const getEth = (tokenBalance: number, tokenPriceInWeth?: number) =>{
    console.log(tokenBalance, tokenPriceInWeth)
    if(tokenPriceInWeth)
      return tokenBalance * tokenPriceInWeth;
    return 0;
  }

  const getUsdt = (tokenBalance: number, tokenPriceInUsdt?: number) =>{
    if(tokenPriceInUsdt)
      return tokenBalance * tokenPriceInUsdt;
    return 0;
  }

  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{tokenBalance}</h5>
          <h6 className="card-title">In ETH: {getEth(Number(tokenBalance), tokenPriceInWeth)}</h6>
          <h6 className="card-title">In USDT: {getUsdt(Number(tokenBalance), tokenPriceInUsdt)}</h6>
          <p className="card-text">{address}</p>
          <p className="card-text">Left: {ethBalance} ETH</p>
          <button className="btn btn-secondary me-2" onClick={refreshBalance}>
            Refresh
          </button>
          <button
            className="btn btn-success me-2"
            onClick={() => setIsBuyInputOpen(true)}
          >
            Buy
          </button>
          <button
            className="btn btn-danger me-2"
            onClick={() => setIsSellInputOpen(true)}
          >
            Sell
          </button>
          <button className="btn btn-danger" onClick={() => dump()}>
            Dump
          </button>
        </div>
      </div>
      <BuyModal
        isOpen={isBuyInputOpen}
        setIsOpen={setIsBuyInputOpen}
        onSubmit={(amnt) => buy(amnt)}
        currentBalance={ethBalance}
      />
      <SellModal
        isOpen={isSellInputOpen}
        setIsOpen={setIsSellInputOpen}
        onSubmit={(amnt) => sell(amnt)}
        tokenName={tokenName}
        currentBalance={tokenBalance ?? ""}
      />
    </div>
  );
};
