export type WalletCardProps ={
    address: string;
    id: number;
    balance: number;
    phrase: string;
    recreateWallet: (id: number)=>void;
}