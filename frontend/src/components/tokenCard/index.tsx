import React, { useEffect, useState } from "react";
import axios from "axios";
import { TokenCardProps } from "./types";
import { Link } from "react-router-dom";
import { generateDexUrl } from "../../generators/urlGenerator";

export const TokenCard = ({ contract, name, id, pair }: TokenCardProps) => {
  return (
    <div className="col-lg-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{contract}</p>
          <a className="btn btn-primary me-2" href={generateDexUrl(pair)} target="_blank" rel="noreferrer">
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
