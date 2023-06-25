import React, { useEffect, useState } from "react";
import { WalletCard } from "../../components/walletCard";
import axios from "axios";
import { PhraseModal } from "../../components/modals/phraseInputModal";
import { TokenModal } from "../../components/modals/tokenModal";
import { Wallet } from "../../commontypes/wallet";
import { toast } from "react-toastify";

export const MainPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showPhraseInput, setShowPhraseInput] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const createNew = () =>{
    axios.post("wallet/create/").then((response) => {
      toast("Added a new wallet")
      refetch();
    });
  }

  const showPopup = () =>{
    setShowPhraseInput(true);
  }

  const addTokenPopup = () =>{
    setShowTokenInput(true);
  }

  const handlePhrase = () =>{
    refetch();
    setShowPhraseInput(false);
  }

  const recreateWallet = (id: number) =>{
    axios.post("wallet/recreate/", {id}).then((response) => {
      refetch();
    });
  }

  const refetch = () =>{
    axios.get("wallet/").then((response) => {
      setWallets(response.data);
    });
  }

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="p-4">
        <button className="btn btn-primary me-4" onClick={createNew}>Create empty</button>
        <button className="btn btn-primary me-4" onClick={showPopup}>Import</button>
        <button className="btn btn-primary me-4" onClick={addTokenPopup}>Add token</button>
        <button className="btn btn-primary">Recreate all</button>
      </div>
      <div className="container">
        <div className="row">
          {wallets?.map((wallet) => {
            return (
              <WalletCard
                address={wallet.address}
                id={wallet.id}
                phrase={wallet.phrase}
                balance={wallet.balance}
                key={wallet.address}
                recreateWallet={recreateWallet}
              />
            );
          })}
        </div>
      </div>
      <PhraseModal show={showPhraseInput} setShow={setShowPhraseInput} handleSuccess={handlePhrase}/>
      <TokenModal show={showTokenInput} setShow={setShowTokenInput} handleSuccess={handlePhrase}/>
    </div>
  );
};
