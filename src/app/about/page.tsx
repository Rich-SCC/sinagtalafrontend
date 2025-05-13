"use client";

import ProtectedRouteWrapper from "@/component/ProtectedRouteWrapper";
import Image from "next/image"; 
export default function PostAuthAboutPage() {


  return (
    <ProtectedRouteWrapper>
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <button
          onClick={() => window.history.back()} // Dynamic back navigation
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
        </button>
        <h1 className="text-xl font-semibold">About SinagTala</h1>
        <div className="w-6 h-6">
          {/* Empty div for spacing */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          {/* Logo Container */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/Logo.png" // Path to your logo
              alt="SinagTala Logo"
              width={256} // Adjust width as needed
              height={256} // Adjust height as needed
              className="rounded-full border-2 border-pink-700 shadow-md"
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Welcome to SinagTala</h2>
            <p className="text-gray-400">Your mental health companion powered by AI</p>
          </div>

          {/* Mission Section */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-300 mb-4">
              SinagTala aims to make mental health support accessible to everyone, providing a safe space for reflection, emotional processing, and personal growth.
            </p>
            <p className="text-gray-300">
              We believe that everyone deserves access to mental health resources, regardless of their location or circumstances. Our AI companion is designed to be there for you whenever you need someone to talk to.
            </p>
          </section>

          {/* How It Works Section */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">How SinagTala Works</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-pink-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Share How You Feel</h4>
                  <p className="text-gray-300">Express your thoughts and emotions in a judgment-free environment.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Receive Supportive Responses</h4>
                  <p className="text-gray-300">Get thoughtful responses tailored to your unique situation.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-pink-700 rounded-full w-8 h-8 flex items-center justify-center shrink-0 mr-4">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Track Your Progress</h4>
                  <p className="text-gray-300">Monitor your emotional well-being over time with mood tracking and insights.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section */}
          <section className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Our Team</h3>
            <p className="text-gray-300 mb-4">
              SinagTala was created by a dedicated team of developers, mental health professionals, and AI specialists who are passionate about using technology to support mental well-being.
            </p>
            <p className="text-gray-300">
              We collaborate with mental health experts to ensure our approach is ethical, responsible, and genuinely helpful for users across different contexts and challenges.
            </p>
          </section>

          {/* Disclaimer Section */}
          <section className="bg-gray-700 rounded-lg p-6 text-sm">
            <h3 className="text-lg font-semibold mb-2">Important Note</h3>
            <p className="text-gray-300">
              While SinagTala is designed to provide support and companionship, it is not a replacement for professional mental health services. If you&apos;re experiencing a crisis or need immediate help, please contact a mental health professional or crisis service.
            </p>
          </section>

          {/* Version Info */}
          <div className="text-center text-gray-500 text-sm pt-4">
            <p>SinagTala v1.0</p>
            <p>© 2025 SinagTala. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRouteWrapper>
  );
}