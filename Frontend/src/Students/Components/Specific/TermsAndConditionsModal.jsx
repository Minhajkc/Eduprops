import React from 'react';
import Modal from 'react-modal';
import { motion } from 'framer-motion';

const TermsAndConditionsModal = ({ isOpen, onRequestClose, onAgree }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Terms and Conditions"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center p-4 font-roboto"
            overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
        >
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            >
                {/* Close button */}
                <button
                    onClick={onRequestClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4">Terms & Conditions</h2>
                <p className="mb-4">
                    Please read and accept our Terms & Conditions before continuing. By accepting, you agree to comply with all terms and conditions laid out by our platform.
                </p>
                <p className="mb-4">
                    <strong>Terms of Service:</strong> Your use of the site is subject to the following terms and conditions. Please read them carefully.
                </p>
                <p className="mb-4">
                    <strong>Privacy Policy:</strong> We respect your privacy and are committed to protecting it. Please review our Privacy Policy to understand how we use your information.
                </p>

                <div className="flex justify-center mt-6">
                    <button
                        onClick={onAgree}
                        className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 flex items-center justify-center"
                    >
                        I Agree
                    </button>
                   
                </div>
            </motion.div>
        </Modal>
    );
};

export default TermsAndConditionsModal;
