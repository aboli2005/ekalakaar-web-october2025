import React from 'react';
import '../../style/common.css';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAECEE] via-[#FFF5F5] to-[#FAECEE]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-main text-4xl sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#AD2F3B] text-sm">
            Last Updated: October 23, 2025
          </p>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-10 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Introduction</h2>
            <p className="subtext leading-relaxed">
              Welcome to eKalakaar. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website www.ekalakaar.com and use our mobile application.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Information We Collect</h2>
            
            <h3 className="text-[#AD2F3B] font-semibold text-lg mb-2">Personal Information</h3>
            <p className="subtext leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside space-y-2 subtext ml-4">
              <li>Register for an account as an artist or client</li>
              <li>Book a performance or register as an artist</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact form</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <h3 className="text-[#AD2F3B] font-semibold text-lg mb-2 mt-6">Information Collected Includes:</h3>
            <ul className="list-disc list-inside space-y-2 subtext ml-4">
              <li>Name and contact information (email address, phone number)</li>
              <li>Professional information (artist category, experience, portfolio)</li>
              <li>Payment and billing information</li>
              <li>Location data (city, state)</li>
              <li>Profile pictures and performance videos</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-[#AD2F3B] font-semibold text-lg mb-2 mt-6">Automatically Collected Information</h3>
            <p className="subtext leading-relaxed">
              When you access our website or mobile app, we automatically collect certain information about your device, including IP address, browser type, operating system, access times, and pages viewed.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="heading-main text-2xl mb-4">How We Use Your Information</h2>
            <p className="subtext leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 subtext ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your bookings and registrations</li>
              <li>Send you updates, newsletters, and promotional materials</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze usage patterns and optimize user experience</li>
              <li>Detect, prevent, and address technical issues and fraud</li>
              <li>Comply with legal obligations</li>
              <li>Connect artists with performance opportunities</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Information Sharing and Disclosure</h2>
            <p className="subtext leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 subtext ml-4">
              <li><strong>With Service Providers:</strong> We may share information with third-party vendors who perform services on our behalf</li>
              <li><strong>For Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
              <li><strong>With Your Consent:</strong> When you give us explicit permission</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
              <li><strong>Between Users:</strong> Artists' profiles and portfolios are visible to clients booking performances</li>
            </ul>
            <p className="subtext leading-relaxed mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Data Security</h2>
            <p className="subtext leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Your Privacy Rights</h2>
            <p className="subtext leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 subtext ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
              <li><strong>Data Portability:</strong> Request transfer of your data</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
            </ul>
            <p className="subtext leading-relaxed mt-4">
              To exercise these rights, please contact us at <a href="mailto:ek@ekalakaar.com" className="text-[#AD2F3B] hover:underline">ek@ekalakaar.com</a>
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Cookies and Tracking Technologies</h2>
            <p className="subtext leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Third-Party Links</h2>
            <p className="subtext leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Children's Privacy</h2>
            <p className="subtext leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Changes to This Privacy Policy</h2>
            <p className="subtext leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="heading-main text-2xl mb-4">Contact Us</h2>
            <p className="subtext leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-[#FAECEE] p-6 rounded-lg space-y-2">
              <p className="subtext"><strong>Email:</strong> <a href="mailto:ek@ekalakaar.com" className="text-[#AD2F3B] hover:underline">ek@ekalakaar.com</a></p>
              <p className="subtext"><strong>Phone:</strong> <a href="tel:+917701872112" className="text-[#AD2F3B] hover:underline">+91 7701872112</a></p>
              <p className="subtext"><strong>Address:</strong> IIM-Mumbai (Main Office) | New Delhi | Bhubaneshwar</p>
              <p className="subtext"><strong>Website:</strong> <a href="https://www.ekalakaar.com" className="text-[#AD2F3B] hover:underline" target="_blank" rel="noopener noreferrer">www.ekalakaar.com</a></p>
            </div>
          </section>

          {/* Consent */}
          <section className="bg-[#AD2F3B] bg-opacity-10 p-6 rounded-lg">
            <p className="subtext text-center">
              By using our website and services, you consent to this Privacy Policy and agree to its terms.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;