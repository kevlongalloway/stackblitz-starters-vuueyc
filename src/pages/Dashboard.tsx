import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import withAuth from '../components/withAuth';
import Modal from '../components/Modal';
import QuestionnaireModalContent from '../components/QuestionnaireModalContent';

function Dashboard() {
    const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

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
        try {
            const response = await fetch('https://kevlongalloway.shop/api/questionaire-completed', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.completed);
                setQuestionnaireCompleted(data.completed);
                if (data.completed == 0) {
                    setTimeout(() => {
                        handleOpenModal();
                        // Perform any actions or state updates here
                    }, 3000);
                }
            } else {
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">Pocket Therapy Demo</h1>
                <div className="mb-4">
                    <Link
                        to="/chat"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Mental Health Chatbot
                    </Link>
                </div>
                <div className="mb-4">
                    <a
                        href="./guided-meditation.html"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Guided Meditation
                    </a>
                </div>
                <div className="mb-4">
                    <a
                        href="./Register.html"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Breathing Exercise
                    </a>
                </div>
                <div className="mb-4">
                    <a
                        href="./Register.html"
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
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
