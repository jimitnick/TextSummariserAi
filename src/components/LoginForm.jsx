import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router';
import App from '../App';
import GoogleLogin from './GoogleLogin';
const LoginForm = () => {
    const [mode, setMode] = useState('email') // or 'username'
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (mode === 'email') {
      console.log('Logging in with email:', formData.email, formData.password);
    } else {
      console.log('Logging in with username:', formData.username, formData.password);
    }
    [formData].forEach(element => {
        if((element.email === "admin@gmail.com" || element.username === "admin") && element.password === "123"){
            <Navigate to={<App />}/>
            return true;
        }
    });
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <div className="md:w-full max-w-sm bg-zinc-800 p-6 rounded-lg shadow-md  md:h-[500px] flex flex-col justify-center gap-16">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">Login</h1>
        <div className="flex mb-4 justify-center gap-4">
          <button
            className={`px-4 py-2 rounded ${
              mode === 'email' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-300'
            }`}
            onClick={() => setMode('email')}
          >
            Email
          </button>
          <button
            className={`px-4 py-2 rounded ${
              mode === 'username' ? 'bg-blue-600 text-white' : 'bg-zinc-700 text-zinc-300'
            }`}
            onClick={() => setMode('username')}
          >
            Username
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {mode === 'email' ? (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ) : (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 rounded bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded bg-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2 transition-colors"
          >
            Login
          </button>
          <GoogleLogin />
        </form>
      </div>
    </div>
  )
}

export default LoginForm
