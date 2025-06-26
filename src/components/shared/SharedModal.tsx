'use client';

import React from 'react';
import ReactModal from 'react-modal';

// Set app element for accessibility; in Next.js app router, '#__next' may not exist, fallback to 'body'
if (typeof window !== 'undefined') {
    ReactModal.setAppElement('body');
}

type SharedModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    contentLabel?: string;
};

export default function SharedModal({
    isOpen,
    onClose,
    children,
    contentLabel = 'Modal'
}: SharedModalProps) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={contentLabel}
            shouldCloseOnOverlayClick
            shouldCloseOnEsc
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                content: {
                    position: 'relative',
                    inset: 'unset',
                    padding: 0,
                    border: 'none',
                    background: 'transparent',
                    overflow: 'visible',
                    maxWidth: '90%',
                    maxHeight: '90%'
                }
            }}
        >
            {children}
        </ReactModal>
    );
}
