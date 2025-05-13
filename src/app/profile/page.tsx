"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import profileApi from "@/lib/profileApi";
import authApi from "@/lib/authApi";
import ProtectedRouteWrapper from "@/component/ProtectedRouteWrapper";
import ChangePasswordModal from '@/component/ChangePasswordModal';

// Map API profile to display profile format
interface DisplayUserProfile {
  id: string;
  username: string;
  email: string;
  created_at: string;
  avatarUrl?: string; // Optional avatar URL
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<DisplayUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Fetch user profile data using the API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const userData = await profileApi.getProfile();
        
        // Map API response to our display format
        const displayProfile: DisplayUserProfile = {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          created_at: userData.created_at
        };
        
        setProfile(displayProfile);
        setEditedName(displayProfile.username);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form submission for name editing
  const handleSaveProfile = async () => {
    if (!profile) return;

    setIsSaving(true);
    setError(null);

    try {
      const updatedUser = await profileApi.updateProfile({ username: editedName });

      // Update the profile state with the edited name
      setProfile({
        ...profile,
        username: updatedUser.username,
      });

      setIsEditing(false);
      setSaveSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError("Failed to update name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        // We need to prompt for password according to the API interface
        const password = prompt("Please enter your password to confirm account deletion:");
        
        if (!password) {
          return; // User cancelled the password prompt
        }
        
        await profileApi.deleteAccount(password);
        // Redirect to home page after successful deletion
        router.push("/");
      } catch (error) {
        console.error("Error deleting account:", error);
        setError("Failed to delete account. Please try again.");
      }
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Rest of the component remains the same
  return (
    <ProtectedRouteWrapper>
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <Link
          href="/chat"
          className="text-gray-300 hover:text-white flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h1 className="text-xl font-semibold">My Profile</h1>
        <div className="w-6 h-6">
          {/* Empty div for spacing */}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
          {error}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : profile ? (
          <>
            {/* Success message */}
            {saveSuccess && (
              <div className="bg-green-800 text-green-100 px-4 py-2 rounded-md mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Profile updated successfully!
              </div>
            )}

            {/* Profile header with avatar */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
                    {/* Avatar placeholder - in a real app, use actual user avatar */}
                    <div className="w-full h-full flex items-center justify-center bg-pink-700 text-2xl font-bold">
                      {profile.username.split(" ").map((name) => name[0]).join("")}
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  {isEditing ? (
                    <div className="mb-4">
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-pink-500 focus:border-pink-500 outline-none"
                        placeholder="Your name"
                      />
                      <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="px-4 py-1.5 bg-pink-600 hover:bg-pink-500 rounded-md flex items-center gap-1 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-1"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                              Save
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setEditedName(profile.username);
                          }}
                          className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center sm:justify-start mb-2">
                      <h2 className="text-xl font-semibold">{profile.username}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="ml-2 text-gray-400 hover:text-white transition-colors"
                        title="Edit name"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="text-gray-400 mb-2">{profile.email}</div>
                  <div className="text-gray-500 text-sm">
                    Account created: {formatDate(profile.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings sections - all remaining UI stays the same */}
            <div className="space-y-6">
              {/* Account Actions */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="font-medium text-lg">Account</h3>
                </div>
                <div className="p-6 space-y-4">
                  <button
                    className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
                    onClick={() => setShowChangePassword(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    Change Password
                  </button>
                  <button
                    className="flex items-center text-red-500 hover:text-red-400 transition-colors"
                    onClick={async () => {
                      await authApi.logout();
                      router.push("/");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Logout
                  </button>
                  <button
                    className="flex items-center text-red-500 hover:text-red-400 transition-colors mt-8"
                    onClick={handleDeleteAccount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>

              {/* Help & Support section - unchanged */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Content remains the same */}
                <div className="px-6 py-4 border-b border-gray-700">
                  <h3 className="font-medium text-lg">Help & Support</h3>
                </div>
                <div className="p-6 space-y-4">
                  <Link
                    href="/about"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                    About SinagTala
                  </Link>
                  <Link
                    href="/hotlines"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                    Crisis Hotlines
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                      />
                    </svg>
                    Mental Health Resources
                  </Link>
                  <a
                    href="/contact"
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                    Contact Support
                  </a>
                </div>
              </div>

              {/* App Info section - unchanged */}
              <div className="bg-gray-800 rounded-lg p-6 flex justify-between">
                <div>
                  <h3 className="font-medium">SinagTala</h3>
                  <p className="text-sm text-gray-400">Version 1.0.0</p>
                </div>
                <div className="text-right">
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-gray-400 hover:text-white block"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-400 hover:text-white block mt-1"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-red-400">
              Failed to load profile information.
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-pink-700 hover:bg-pink-600 rounded-md text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>
      <ChangePasswordModal isOpen={showChangePassword} onClose={() => setShowChangePassword(false)} />
    </div>
    </ProtectedRouteWrapper>
  );
}
