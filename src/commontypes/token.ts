import { BigNumber } from "./bigNumber";

export type Token = {
  address: string;
  id: number;
  name: string;
  contract: string;
  pair: string;
  decimals: number;
  weth: number;
  usdt: number;
};
