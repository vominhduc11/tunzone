'use client';

import React from 'react';
import ReactModal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';

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
            closeTimeoutMS={200}
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </ReactModal>
    );
}
