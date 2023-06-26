import axios from "axios";
import { useState, useEffect } from "react";
import { Wallet } from "../../commontypes/wallet";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ActionWalletCard } from "../../components/actionWalletCard";
import { Token } from "../../commontypes/token";
import {
  generateArbiscanUrl,
  generateDexUrl,
} from "../../generators/urlGenerator";
import { playMoney } from "../../audio/sounds";

export const TokenPage = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [token, setToken] = useState<Token>();
  const { id } = useParams();
  const refetch = () => {
    axios.get("wallet/").then((response) => {
      setWallets(response.data);
    });
  };

  const startProcedure = () => {};

  const dump = () => {
    for (const wallet of wallets) {
      axios
        .post("wallet/sell/all", { walletId: wallet.id, tokenId: id })
        .then((response) => {
          playMoney();
          toast.success(`Dumped for ${wallet.address}`);
        });
    }
  };

  useEffect(() => {
    refetch();
    axios.get(`token/${id}`).then((response) => {
      setToken(response.data);
    });
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
      <div className="container pb-3">
        {token && (
          <div className="row">
            <div className="col">
              <h2>{token?.name}</h2>
              <p>Contract: {token?.contract}</p>
              <p>Pair: {token?.pair}</p>
              <a
                className="btn btn-primary me-2"
                href={generateDexUrl(token?.pair ?? "")}
                target="_blank"
                rel="noreferrer"
              >
                DEX Tools
              </a>
              <a
                className="btn btn-primary me-2"
                href={generateArbiscanUrl(token?.contract ?? "")}
                target="_blank"
                rel="noreferrer"
              >
                Arbiscan
              </a>
            </div>
            <div className="col">
              <h2>Price</h2>
              <h3>WETH: {token.weth}</h3>
              <h3>USDT: {token.usdt}</h3>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="row">
          {wallets?.map((wallet) => {
            return (
              <ActionWalletCard
                address={wallet.address}
                walletId={wallet.id}
                tokenId={Number(id)}
                key={wallet.address}
                tokenName={token?.name ?? ""}
                tokenPriceInWeth={token?.weth}
                tokenPriceInUsdt={token?.usdt}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
