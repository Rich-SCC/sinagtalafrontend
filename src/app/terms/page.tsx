"use client";

import { useRouter } from "next/navigation";

export default function TermsOfServicePage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
        <button 
          onClick={() => router.back()} 
          className="text-gray-300 hover:text-white flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Terms of Service</h1>
        <div className="w-6 h-6">
          {/* Empty div for spacing */}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-400 mb-4">Last Updated: May 01, 2025</p>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-pink-400 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to SinagTala. These Terms of Service (&quot;Terms&quot;) govern your use of our website, 
              mobile application, and services (collectively, the &quot;Services&quot;). By accessing or using 
              our Services, you agree to be bound by these Terms. If you disagree with any part of 
              the Terms, you may not access the Services.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">2. Use of Services</h2>
            <p className="mb-4">
              SinagTala provides a mental health support chat interface. Our Services are not a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
              mental health providers with any questions you may have regarding mental health conditions.
            </p>
            <p className="mb-4">
              You agree to use the Services only for lawful purposes and in accordance with these Terms.
              You agree not to use the Services:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>In any way that violates applicable laws or regulations.</li>
              <li>To impersonate or attempt to impersonate another person or entity.</li>
              <li>To engage in any activity that interferes with or disrupts the Services.</li>
              <li>To attempt to probe, scan, or test the vulnerability of the system.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">3. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate, complete, and current 
              information. You are responsible for safeguarding the password that you use to access 
              the Services and for any activities or actions under your password.
            </p>
            <p className="mb-4">
              You agree not to disclose your password to any third party. You must notify us immediately 
              upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">4. Content</h2>
            <p className="mb-4">
              Our Services allow you to post, link, store, share and otherwise make available certain 
              information, text, or other material (&quot;Content&quot;). You are responsible for the Content 
              that you post, including its legality, reliability, and appropriateness.
            </p>
            <p className="mb-4">
              By posting Content, you grant us the right to use, modify, publicly perform, publicly 
              display, reproduce, and distribute such Content on and through the Services. You retain 
              any and all of your rights to any Content you submit and are responsible for protecting 
              those rights.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              The Services and their original content, features, and functionality are and will remain 
              the exclusive property of SinagTala and its licensors. The Services are protected by 
              copyright, trademark, and other laws of both the Philippines and foreign countries.
            </p>
            <p className="mb-4">
              Our trademarks and trade dress may not be used in connection with any product or service 
              without the prior written consent of SinagTala.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">6. Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p className="mb-4">
              Upon termination, your right to use the Services will immediately cease. If you wish to 
              terminate your account, you may simply discontinue using the Services or request account 
              deletion through your profile settings.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">7. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall SinagTala, nor its directors, employees, partners, agents, suppliers, 
              or affiliates, be liable for any indirect, incidental, special, consequential or punitive 
              damages, including without limitation, loss of profits, data, use, goodwill, or other 
              intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Services;</li>
              <li>Any conduct or content of any third party on the Services;</li>
              <li>Any content obtained from the Services; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">8. Disclaimer</h2>
            <p className="mb-4">
              Your use of the Services is at your sole risk. The Services are provided on an &quot;AS IS&quot; 
              and &quot;AS AVAILABLE&quot; basis. The Services are provided without warranties of any kind, 
              whether express or implied.
            </p>
            <p className="mb-4">
              SinagTala and its licensors do not warrant that a) the Services will function uninterrupted, 
              secure or available at any particular time or location; b) any errors or defects will be 
              corrected; c) the Services are free of viruses or other harmful components; or d) the 
              results of using the Services will meet your requirements.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">9. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days&apos; notice prior to any 
              new terms taking effect.
            </p>
            <p className="mb-4">
              What constitutes a material change will be determined at our sole discretion. By continuing 
              to access or use our Services after those revisions become effective, you agree to be bound 
              by the revised terms.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">10. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of the Republic of 
              the Philippines, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a 
              waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable 
              by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-4">
              <a href="mailto:legal@sinagtala.org" className="text-pink-400 hover:text-pink-300">
                legal@sinagtala.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
