export const generateDexUrl = (pair: string) => {
  return `https://www.dextools.io/app/en/arbitrum/pair-explorer/${pair}`;
};

export const generateArbiscanUrl = (pair: string) => {
  return `https://arbiscan.io/token/${pair}`;
};
