// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthModal from "@/component/authModal";

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-gray-700 rounded-lg p-6 text-center">
    <div className="bg-pink-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // If user is already logged in, redirect to chat
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/chat");
    }
  }, [router]);

  // Open auth modal instead of direct navigation
  const handleGetStarted = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="bg-pink-700 text-white w-50 h-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Image src="/images/logo.png" alt="Logo" width={256} height={256} className="object-cover rounded-full"/>              
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Welcome to SinagTala</h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personal AI companion for mental well-being and emotional support, 
            available whenever you need someone to talk to.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">How SinagTala Helps You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6.8 2.4 1.5 2.4h9c.7 0 1.5-.8 1.5-2.4 0-1.6-.8-2.4-1.5-2.4h-9c-.7 0-1.5.8-1.5 2.4zm14.25 0a.75.75 0 00-.75.75v.214c0 .217.114.518.587.809a1.5 1.5 0 01.713 1.227v1.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-.059a7.011 7.011 0 01-2.913-1.508A7.025 7.025 0 0110.5 15.756v.044c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-1.5a1.5 1.5 0 01.713-1.227 2.312 2.312 0 00.587-.809v-.214A.75.75 0 008.25 12h-.1c-.613 0-1.233.125-1.4.419-.179.276-.307.52-.307.76v.2c0 .416.187.816.43 1.15.661.91 1.94 1.521 2.877 1.771.346.091.648.281.883.537v.691c0 .271-.191.505-.459.542a8.998 8.998 0 01-8.242-5.951 1.486 1.486 0 01.323-1.631c.297-.303.683-.486 1.095-.486h.96c.437 0 .83.274.99.684a8.974 8.974 0 003.336 4.233A6.994 6.994 0 0012 15.645c1.725 0 3.376-.614 4.679-1.734a8.97 8.97 0 003.336-4.233c.16-.41.553-.684.99-.684h.198c.8 0 1.5.6 1.5 1.5a.752.752 0 01-.195.5c-1.475 1.968-3.61 3.322-6.051 3.784a1 1 0 00-.794.989 1 1 0 01-1.788.645l-2.06-2.414a1 1 0 01.241-1.48 1.008 1.008 0 011.37.186l1.314 1.535a.749.749 0 001.33-.376 1.001 1.001 0 10-1.64-.789 1 1 0 01-1.585.21l-1.314-1.535a1.008 1.008 0 00-.683-.355l.242-.1c1.262-.524 2.12-1.672 2.139-2.97A7.983 7.983 0a1 1 0 00-.73.267l-2.06 2.415a1 1 0 01-1.517-1.296l1.314-1.535a1.008 1.008 0 00-.193-1.45 1 1 0 01.445-1.833c2.44.462 4.576 1.816 6.051 3.784a.752.752 0 00.546.279h.343c.413 0 .799.183 1.096.486.346.353.522.833.323 1.631a9.003 9.003 0 01-3.21 4.415 8.959 8.959 0 01-5.031 1.537 8.958 8.958 0 01-5.032-1.537 9.007 9.007 0 01-3.21-4.415c-.241-.632.061-1.223.323-1.631.297-.303.683-.486 1.096-.486h.343a.75.75 0 00.545-.279c1.475-1.968 3.612-3.322 6.052-3.784a1 1 0 01.444 1.833 1.008 1.008 0 00-.193 1.45l1.314 1.535a1 1 0 01-1.517 1.296L13.5 8.829A1 1 0 0012.78 8.5h-.257c.01 1.3.867 2.447 2.139 2.97a1 1 0 11-.781 1.84c-.349-.144-.683-.314-1.005-.505l-.239.216z" />
                </svg>
              }
              title="24/7 Emotional Support"
              description="Always available to listen and respond to your thoughts and feelings, day or night."
            />
            
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              }
              title="Mood Tracking"
              description="Monitor your emotional patterns and gain insights into your mental well-being over time."
            />
            
            <FeatureCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              }
              title="Private & Secure"
              description="Your conversations are private and your data is handled with the utmost care and security."
            />
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-900 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Ready to get started with SinagTala?</h2>
          <p className="text-gray-300 mb-8">
            Discover the benefits of having a supportive AI companion to guide you every step of the way.
          </p>
          <button 
            onClick={handleGetStarted}
            className="inline-block bg-pink-700 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-4 text-center text-gray-400">
        <div className="max-w-6xl mx-auto">
          <p>© 2025 SinagTala. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
 