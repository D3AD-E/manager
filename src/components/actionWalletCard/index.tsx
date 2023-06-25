import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActionWalletCardProps } from "./types";
import { GenericInputModal } from "../modals/genericInputModal";
import { toast } from "react-toastify";
import { REFRESH_AMOUNT as REFRESH_DELAY_MS } from "../../constants/constants";

export const ActionWalletCard = ({
  walletId,
  address,
  tokenId,
  tokenName
}: ActionWalletCardProps) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isBuyInputOpen, setIsBuyInputOpen] = useState(false);
  const [isSellInputOpen, setIsSellInputOpen] = useState(false);

  const refreshBalance = () => {
    axios.post("wallet/refresh", { walletId }).then((response) => {
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
      toast(`Bought for ${amount} ETH successfully`)
      refreshBalance();
    });
  };

  const sell = (amount: number) => {
    axios
      .post("wallet/sell", { walletId, tokenId, amount })
      .then((response) => {
        toast(`Sold ${amount} ${tokenName} successfully`)
        refreshBalance();
      });
  };

  const dump = () => {
    axios.post("wallet/sell/all", { walletId, tokenId }).then((response) => {
      toast(`Dumped ${tokenName} successfully`)
      refreshBalance();
    });
  };


  useEffect(() => {
    refreshBalance();
    const interval = setInterval(() => {
      refreshBalance();
    }, REFRESH_DELAY_MS);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="col-lg-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{tokenBalance}</h5>
            <p className="card-text">{address}</p>
            <p className="card-text">{ethBalance} ETH</p>
            <button className="btn btn-secondary me-2" onClick={refreshBalance}>
              Refresh
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={() => setIsBuyInputOpen(true)}
            >
              Buy
            </button>
            <button
              className="btn btn-danger"
              onClick={() => setIsSellInputOpen(true)}
            >
              Sell
            </button>
            <button className="btn btn-danger" onClick={() => dump()}>
              Dump
            </button>
          </div>
        </div>
      </div>
      <GenericInputModal
        title={"Buy"}
        label={"Amount in ETH"}
        isOpen={isBuyInputOpen}
        setIsOpen={setIsBuyInputOpen}
        onSubmit={(amnt) => buy(Number(amnt))}
      />
      <GenericInputModal
        title={"Sell"}
        label={`Amount in ${tokenName}`}
        isOpen={isSellInputOpen}
        setIsOpen={setIsSellInputOpen}
        onSubmit={(amnt) => sell(Number(amnt))}
      />
    </>
  );
};
