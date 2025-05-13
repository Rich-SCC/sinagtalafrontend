"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { hotlineData, Hotline } from "@/component/hotlineData";


// Parse phone numbers that contain separators
function parsePhoneNumbers(phoneString: string): string[] {
  return phoneString.split(" / ").map((phone) => phone.trim());
}

// Format phone numbers for clickable links
function formatPhoneLink(phone: string): string {
  const dialNumber = phone.replace(/\D/g, ""); // Remove non-digit characters
  return `tel:${dialNumber}`;
}

export default function CrisisHotlinePage() {
  const [hotlines, setHotlines] = useState<Hotline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching hotlines
    const fetchHotlines = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
          setHotlines(hotlineData);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching hotlines:", err);
        setError("Unable to load crisis hotlines. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchHotlines();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <button 
          onClick={() => router.back()} 
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
        <h1 className="text-xl font-semibold">Crisis Hotlines</h1>
        <div className="w-6 h-6">
          {/* Empty div for spacing */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full">
        {/* Important Information Section */}
        <div className="mb-8 bg-pink-700 bg-opacity-10 border border-pink-700 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-pink-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            Important Information
          </h2>
          <p className="text-gray-300">
            If you&apos;re experiencing a mental health emergency or having thoughts of harming yourself,
            please reach out to one of these crisis resources immediately. They are available to provide
            support and assistance in difficult moments.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 mx-auto mb-4 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p>{error}</p>
          </div>
        ) : (
          /* Hotline List */
          <div className="space-y-6">
            {hotlines.map((hotline) => (
              <div
                key={hotline.id}
                className="bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-medium text-pink-400 mb-2">
                  {hotline.organization}
                </h2>
                <p className="text-gray-300 mb-4">{hotline.description}</p>
                <div className="space-y-2">
                  {/* Phone Numbers */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Phone Number(s):</h3>
                    <div className="space-y-2">
                      {parsePhoneNumbers(hotline.phone_number).map((phone, index) => (
                        <a
                          key={index}
                          href={formatPhoneLink(phone)}
                          className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-md py-2 px-4 transition-colors group"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-3 text-pink-500 group-hover:text-pink-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                          <span>{phone}</span>
                          <span className="ml-2 text-sm text-pink-400 group-hover:text-pink-300">
                            • Tap to call
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Operating Hours */}
                  {hotline.operating_hours && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Operating Hours:</h3>
                      <p className="text-gray-300">{hotline.operating_hours}</p>
                    </div>
                  )}

                  {/* Website */}
                  {hotline.website && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Website:</h3>
                      <a
                        href={hotline.website.startsWith("http") ? hotline.website : `https://${hotline.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300 flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                          />
                        </svg>
                        {hotline.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Extra Info at the Bottom */}
        <div className="mt-10 mb-6 bg-gray-800 rounded-lg p-4 text-sm text-gray-300">
          <p className="mb-2">
            <span className="font-semibold">Remember:</span> You are not alone, and help is available.
          </p>
          <p>
            Speaking with a crisis counselor can provide immediate support during difficult times. These
            services are confidential and often available 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}