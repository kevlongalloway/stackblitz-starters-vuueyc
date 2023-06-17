import React from 'react';
import { FaUndo } from 'react-icons/fa';

const ResetButton = ({ onClick }) => {
  const handleReset = () => {
    fetch('https://kevlongalloway.shop/api/reset-conversation', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((response) => {
        alert('Conversation has been reset.')
      })
      .catch((error) => {
        console.error('Error resetting conversation:', error);
      });

    if (onClick) {
      onClick(); // Call the provided onClick function if available
    }
  };

  return (
    <button
      className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none p-2"
      onClick={handleReset}
    >
      <FaUndo className="mr-1" />
      Reset Conversation
    </button>
  );
};

export default ResetButton;
