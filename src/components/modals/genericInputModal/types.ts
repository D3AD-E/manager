export type GenericInputModalProps = {
    title: string;
    label: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onSubmit: (data: string) => void;
}