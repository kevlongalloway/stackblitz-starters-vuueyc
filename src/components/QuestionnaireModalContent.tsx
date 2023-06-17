import React, { useState, useEffect } from 'react';

export default function Questionnaire() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    answers: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('https://kevlongalloway.shop/api/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const questionType = e.target.getAttribute('data-question-type');
    let answerContentType = null;
  
    if (questionType === "1") {
      answerContentType = "option_id";
    } else if (questionType === "2") {
      answerContentType = "content";
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: [
        ...prevFormData.answers.filter((answer) => answer.question_id !== parseInt(name)),
        {
          question_id: parseInt(name),
          question_type: parseInt(questionType),
          [answerContentType]: value,
        },
      ],
    }));
  };
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);



    fetch('https://kevlongalloway.shop/api/v1/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        // Add any necessary authorization headers
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response from the server
        // Redirect or perform any other actions as needed
      })
      .catch((error) => {
        console.error(error); // Handle any errors that occurred during the request
        // Display an error message or perform error handling
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="mx-auto p-4 sm:max-w-lg md:max-w-md">
      <h1 className="text-2xl text-center">Questionnaire</h1>
      <p className="text-gray-700 p-4 mb-4 text-center">
        Please take a moment to answer a few questions in order for us to provide you with the best possible experience.
      </p>
      <div className="max-w-md mx-auto lg:p-2 md:p-2">
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label className="font-bold mb-2">{`Question ${index + 1}: ${question.question}`}</label>
              {question.question_type == 1 ? (
                <select
                  name={question.id}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  data-question-type={question.question_type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select an option</option>
                  {question.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={question.id}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  data-question-type={question.question_type}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        
      </div>
    </div>
  );
}
