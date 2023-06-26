export type SellModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onSubmit: (data: string) => void;
    currentBalance: string;
    tokenName: string;
}