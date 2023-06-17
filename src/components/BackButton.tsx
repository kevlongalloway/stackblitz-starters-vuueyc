import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(to);
  };

  return (
    <button className="back-button text-gray-500 hover:text-gray-700 p-2" onClick={handleGoBack}>
      <FaArrowLeft className="back-button-icon" />
    </button>
  );
}
