// src/app/privacy-policy/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPolicyPage() {
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
        <h1 className="text-xl font-semibold">Privacy Policy</h1>
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
              At SinagTala, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you use our website and mobile application 
              (collectively, the &quot;Service&quot;). Please read this privacy policy carefully. By accessing or 
              using the Service, you acknowledge that you have read, understood, and agree to be bound 
              by all the terms of this Privacy Policy.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              We collect several types of information from and about users of our Service:
            </p>
            
            <h3 className="text-lg font-medium text-pink-300 mb-2">2.1 Personal Data</h3>
            <p className="mb-4">
              While using our Service, we may ask you to provide us with certain personally identifiable 
              information that can be used to contact or identify you (&quot;Personal Data&quot;). This may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Date of birth</li>
              <li>Phone number</li>
              <li>Demographic information</li>
            </ul>
            
            <h3 className="text-lg font-medium text-pink-300 mb-2">2.2 Usage Data</h3>
            <p className="mb-4">
              We may also collect information on how the Service is accessed and used (&quot;Usage Data&quot;). 
              This Usage Data may include information such as your computer&apos;s Internet Protocol address 
              (e.g., IP address), browser type, browser version, the pages of our Service that you visit, 
              the time and date of your visit, the time spent on those pages, unique device identifiers, 
              and other diagnostic data.
            </p>
            
            <h3 className="text-lg font-medium text-pink-300 mb-2">2.3 Conversation and Mood Data</h3>
            <p className="mb-4">
              To provide our mental health support service, we collect data about your conversations with 
              our AI assistant and your mood selections. This information helps us improve your experience 
              and provide appropriate support.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the collected data for various purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To provide you with personalized mental health support based on your interactions</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">4. Data Security</h2>
            <p className="mb-4">
              The security of your data is important to us, but remember that no method of transmission 
              over the Internet or method of electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your Personal Data, we cannot guarantee its 
              absolute security.
            </p>
            <p className="mb-4">
              We implement a variety of security measures when a user accesses the service to secure 
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All sensitive data is encrypted using industry-standard techniques</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls to limit who can view your personal data</li>
              <li>Regular monitoring for suspicious activities</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">5. Data Retention</h2>
            <p className="mb-4">
              We will retain your Personal Data only for as long as is necessary for the purposes set 
              out in this Privacy Policy. We will retain and use your Personal Data to the extent 
              necessary to comply with our legal obligations, resolve disputes, and enforce our legal 
              agreements and policies.
            </p>
            <p className="mb-4">
              We will also retain Usage Data for internal analysis purposes. Usage Data is generally 
              retained for a shorter period of time, except when this data is used to strengthen the 
              security or to improve the functionality of our Service, or we are legally obligated to 
              retain this data for longer time periods.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">6. Disclosure of Data</h2>
            <p className="mb-4">
              We may disclose your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Comply with a legal obligation</li>
              <li>Protect and defend the rights or property of SinagTala</li>
              <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>Protect the personal safety of users of the Service or the public</li>
              <li>Protect against legal liability</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">7. Analytics</h2>
            <p className="mb-4">
              We may use third-party Service Providers to monitor and analyze the use of our Service.
              These third parties may use cookies and similar technologies to collect information about 
              how you use our service to provide analytics services to us. The information collected may 
              include information such as the pages visited, time spent on the service, and technical 
              information about your device.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">8. Children&apos;s Privacy</h2>
            <p className="mb-4">
              Our Service is not intended for use by children under the age of 13. We do not knowingly 
              collect personally identifiable information from children under 13. If you are a parent or 
              guardian and you are aware that your child has provided us with Personal Data, please 
              contact us. If we discover that a child under 13 has provided us with Personal Data, we 
              will delete such information from our servers immediately.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">9. Your Data Protection Rights</h2>
            <p className="mb-4">
              Under certain circumstances, you have rights under data protection laws in relation to 
              your personal data. These rights may include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the 
              top of this Privacy Policy. You are advised to review this Privacy Policy periodically 
              for any changes. Changes to this Privacy Policy are effective when they are posted on 
              this page.
            </p>
            
            <h2 className="text-xl font-semibold text-pink-400 mb-4">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>By email: <a href="mailto:privacy@sinagtala.org" className="text-pink-400 hover:text-pink-300">privacy@sinagtala.org</a></li>
              <li>By visiting the Contact page on our website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
