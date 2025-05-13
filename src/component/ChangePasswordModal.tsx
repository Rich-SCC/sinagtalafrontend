"use client";

import { useState } from 'react';
import { profileApi, apiUtils } from '@/lib';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!currentPassword || !newPassword) {
        setError('Both fields are required');
        setLoading(false);
        return;
      }
      await profileApi.changePassword({ currentPassword, newPassword });
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: unknown) {
      setError(apiUtils.extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Change Password</h2>
          <p className="text-gray-400 mt-1">Enter your current and new password.</p>
        </div>
        {success ? (
          <div className="text-center mb-6">
            <div className="bg-green-500 bg-opacity-10 border border-green-500 text-white-500 px-4 py-4 rounded mb-4">
              Password changed successfully!
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white-500 px-4 py-2 rounded">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-pink-700 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Change Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 