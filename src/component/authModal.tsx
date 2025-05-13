// src/components/AuthModal.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi, apiUtils } from '@/lib';
import type { SignupData, LoginData } from '@/lib/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'signup' | 'reset' | 'reset-success' | 'reset-confirm';

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setResetCode('');
    setError('');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (mode === 'login') {
        const loginData: LoginData = { email, password };
        const response = await authApi.login(loginData);
        
        // Store tokens
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        // Successful login
        onClose();
        router.push('/chat');
      } 
      else if (mode === 'signup') {
        // Validate passwords match
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        
        const signupData: SignupData = { 
          email, 
          name: name || '', 
          password 
        };
        
        await authApi.signup(signupData);
        
        // After signup, automatically log in the user
        const loginData: LoginData = { email, password };
        const response = await authApi.login(loginData);
        
        // Store tokens
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        
        onClose();
        router.push('/chat');
      } 
      else if (mode === 'reset') {
        // Step 1: Request reset code
        const response = await authApi.requestPasswordReset(email);
        if (response && response.code) {
          setResetCode(response.code);
        }
        setMode('reset-confirm');
      } else if (mode === 'reset-confirm') {
        // Step 2: Confirm code and set new password
        if (!resetCode || !password) {
          setError('Code and new password are required');
          setLoading(false);
          return;
        }
        await authApi.resetPassword({ code: resetCode, password });
        setMode('reset-success');
      }
    } catch (err: unknown) {
      const errorMessage = apiUtils.extractErrorMessage(err);
      setError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 
             mode === 'signup' ? 'Create Account' : 
             mode === 'reset' ? 'Reset Password' :
             mode === 'reset-success' ? 'Password Reset Successful' :
             'Reset Password'}
          </h2>
          <p className="text-gray-400 mt-1">
            {mode === 'login' ? 'Login to continue to SinagTala' : 
             mode === 'signup' ? 'Sign up to get started with SinagTala' : 
             mode === 'reset' ? 'Enter your email to reset your password' :
             mode === 'reset-success' ? 'Your password has been reset successfully. You may now log in with your new password.' :
             'Enter the reset code and new password'}
          </p>
        </div>

        {/* Reset Success Message */}
        {mode === 'reset-success' ? (
          <div className="text-center mb-6">
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-white-500 px-4 py-4 rounded mb-4">
              Password reset successful! You may now log in with your new password.
            </div>
            <button
              onClick={() => switchMode('login')}
              className="w-full bg-pink-700 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Back to Login
            </button>
          </div>
        ) : mode === 'reset-confirm' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white-500 px-4 py-2 rounded">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="resetCode" className="block text-sm font-medium text-gray-300 mb-1">Reset Code</label>
              <input
                id="resetCode"
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-700 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white-500 px-4 py-2 rounded">
                {error}
              </div>
            )}

            {/* Show name field only for signup */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Username (Optional)</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            )}

            {/* Email field for all modes */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            {/* Password fields for login and signup */}
            {(mode === 'login' || mode === 'signup') && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            )}

            {/* Confirm password field for signup */}
            {mode === 'signup' && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-700 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 
               mode === 'login' ? 'Login' : 
               mode === 'signup' ? 'Sign Up' : 
               'Send Reset Link'}
            </button>
          </form>
        )}

        {/* Mode switchers */}
        {mode !== 'reset-success' && (
          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <button 
                  onClick={() => switchMode('signup')}
                  className="text-pink-500 hover:text-pink-400 font-medium"
                >
                  Sign Up
                </button>
                {' | '}
                <button 
                  onClick={() => switchMode('reset')}
                  className="text-pink-500 hover:text-pink-400 font-medium"
                >
                  Forgot Password?
                </button>
              </p>
            ) : mode === 'signup' ? (
              <p className="text-gray-400">
                Already have an account?{' '}
                <button 
                  onClick={() => switchMode('login')}
                  className="text-pink-500 hover:text-pink-400 font-medium"
                >
                  Login
                </button>
              </p>
            ) : (
              <p className="text-gray-400">
                Remember your password?{' '}
                <button 
                  onClick={() => switchMode('login')}
                  className="text-pink-500 hover:text-pink-400 font-medium"
                >
                  Back to Login
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
