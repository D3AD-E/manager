export type BuyModalProps = {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onSubmit: (data: number) => void;
    currentBalance: number;
}