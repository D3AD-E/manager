import React, { useEffect, useState } from "react";
import axios from "axios";
import { TokenCardProps } from "./types";
import { Link } from "react-router-dom";

export const TokenCard = ({
  contract,
  createdAt,
  name,
  id,
}: TokenCardProps) => {
  const generateUrl = (contract: string) => {
    return `https://www.dextools.io/app/en/arbitrum/pair-explorer/${contract}`;
  };
  return (
    <div className="col-lg-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{contract}</p>
          <a className="btn btn-primary me-2" href={generateUrl(contract)}>
            DEX
          </a>
          <Link to={`/tokens/${id}`} className="btn btn-primary me-2">
            Trade
          </Link>
        </div>
      </div>
    </div>
  );
};
