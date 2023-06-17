import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


    // Check if the user is already authenticated
    useEffect(() => {
      const checkAuthStatus = async () => {
        try {
          const response = await fetch('https://kevlongalloway.shop/api/user', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
          }).then(response => response.json())
            .then(function (data) {
              console.log(data);
              
            });
          
         
        } catch (error) {
          console.error(error);
        }
      };
  
      if (localStorage.getItem('access_token')) {
        checkAuthStatus(); // Check authentication status on component mount
      }
    }, [navigate]);


  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a register request object
    const registerData = {
      name,
      email,
      password,
    };


  

    // Send the register request to the server using fetch or your preferred HTTP client library
    const response = await fetch('https://kevlongalloway.shop/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then(function (data) {
        console.log('hit');
        // Handle the response data
        const accessToken = data.access_token;
        // Set the access token in localstorage
        localStorage.setItem('access_token', accessToken);
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch(function (error) {
        setIsLoading(false);
        alert('Login failed. Please try again.');
        console.error(error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mx-6 md:w-1/2 max-w-md lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form id="registerForm" onSubmit={handleRegister}>
          <div class="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="name"
            >
              Name:
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-center mb-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div>
            <Link to="/login" className="text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
