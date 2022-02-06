import { useState } from 'react';

export const useModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => { setIsOpen(false) };

    return {
        modalIsOpen,
        openModal,
        closeModal
    };
};