import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-[600px] relative ">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;