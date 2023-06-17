import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import withAuth from '../components/withAuth';
import Modal from '../components/Modal';
import QuestionnaireModalContent from '../components/QuestionnaireModalContent';


function Dashboard() {
    const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false); // State to track questionnaire completion
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        checkQuestionnaireCompleted();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
      };
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const checkQuestionnaireCompleted = async () => {
        const response = await fetch('https://kevlongalloway.shop/api/questionaire-completed', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Get the access token from local storage
            },
        }).then((response) => response.json())
        .then(function (data) {
            console.log(data.completed);
            setQuestionnaireCompleted(data.completed);
            if (!data.completed) {
                setTimeout(() => {
                    handleOpenModal();
                    // Perform any actions or state updates here
                }, 3000);
            }
        })
        .catch(function (error) {
          console.error('Error :', error);
        });
    };
    return (
        <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-8">Pocket Therapy Demo</h1>
            <div class="mb-4">
                <Link to="/chat" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Mental Health Chatbot
                </ Link>
            </div>
            <div class="mb-4">
                <a href="./guided-meditation.html" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Guided Meditation
                </a>
            </div>
            <div class="mb-4">
                <a href="./Register.html" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Breathing Exercise
                </a>
            </div>
            <div class="mb-4">
                <a href="./Register.html" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Positive Affirmation
                </a>
                {showModal && (
              <Modal closeModal={handleCloseModal}>
                <QuestionnaireModalContent />
              </Modal>
            )}
            </div>
        </div>
        </div>
  );
}

export default withAuth(Dashboard);
