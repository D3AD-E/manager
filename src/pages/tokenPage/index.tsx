import axios from "axios";
import { useState, useEffect } from "react";
import { Wallet } from "../../commontypes/wallet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const TokenPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const { id } = useParams();
  const refetch = () => {
    axios.get("wallet/").then((response) => {
      setWallets(response.data);
    });
  };

  const startProcedure = () => {};

  const dump = () => {
    for(const wallet of wallets)
    {
      axios.post("wallet/sell/all", {walletId: wallet.id, tokenId: id}).then((response) => {
        toast(`Dumped for ${wallet.address}`)
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="p-4">
        <button className="btn btn-primary me-4" onClick={startProcedure}>
          Start procedure
        </button>
        <button className="btn btn-danger me-4" onClick={dump}>
          DUMP ALL
        </button>
      </div>
      <div className="container">
        <div className="row"></div>
      </div>
    </div>
  );
};
