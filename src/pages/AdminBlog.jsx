import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const AdminBlog = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login(loginData.username, loginData.password);
      navigate('/');
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <main className="pt-32 pb-24 relative min-h-screen bg-transparent text-white flex flex-col justify-center">
      <Helmet>
        <title>Admin Portal | Defensive Cyber</title>
      </Helmet>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8 w-full max-w-md mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center justify-center text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-purple-300 transition-all backdrop-blur-md bg-[#0E0C1F] border border-purple-500/25 hover:border-purple-400 hover:bg-purple-600/20 px-5 py-2.5 rounded-none w-max cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <div className="p-8 rounded-none border border-purple-500/20 bg-[#0E0C1F]/95 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="p-3.5 bg-purple-500/10 rounded-none mb-4 border border-purple-500/25 text-purple-300">
                <Lock className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold font-space uppercase text-center mb-1">
                ADMIN <span className="text-purple-400">PORTAL</span>
              </h1>
              <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-wider">
                Authorized Security Personnel Only
              </p>
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-none text-xs font-mono text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Email Identifier</label>
                <input 
                  type="text" 
                  name="username" 
                  required
                  value={loginData.username} 
                  onChange={handleLoginChange}
                  placeholder="admin@defensivecyber.com"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors text-sm font-sans"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">Password Token</label>
                <input 
                  type="password" 
                  name="password" 
                  required
                  value={loginData.password} 
                  onChange={handleLoginChange}
                  placeholder="••••••••••••"
                  className="w-full bg-[#070611] border border-purple-500/20 rounded-none px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors text-sm font-sans"
                />
              </div>
              <button 
                type="submit"
                className="w-full cyber-button-solid !rounded-none mt-2 cursor-pointer font-bold text-xs uppercase tracking-wider"
              >
                Authenticate Access
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};
