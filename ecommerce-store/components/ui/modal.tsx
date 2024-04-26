"use client";

interface ModalProps{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};