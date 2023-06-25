import { useEffect, useState } from "react";
import { Token } from "../../commontypes/token";
import axios from "axios";
import { TokenCard } from "../../components/tokenCard";

export const TokensPage = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const refetch = () => {
    axios.get("token/").then((response) => {
      setTokens(response.data);
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <div className="p-4">
        <button className="btn btn-primary">Test</button>
      </div>
      <div className="container">
        <div className="row">
          {tokens?.map((token) => {
            return (
              <TokenCard
                contract={token.contract}
                name={token.name}
                id={token.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
