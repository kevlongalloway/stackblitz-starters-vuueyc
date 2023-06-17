import * as React from 'react';
import { Outlet, Link } from "react-router-dom";


export default function HomePage() {
  return (
    <div class="flex justify-center items-center h-screen">
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-8">Pocket Therapy Demo</h1>
            <div class="mb-4">
                <Link to="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </ Link>
            </div>
            <div class="mb-4">
                <Link to="/register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Register
                </ Link>
            </div>
        </div>
    </div>
  );
}
