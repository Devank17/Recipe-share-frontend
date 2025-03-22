import React from "react";

const TermsofService = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow mb-8">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="tracking-wide text-3xl font-bold">Terms of Service</h3>
        </div>
        <div className="p-6 pt-0 prose max-w-none">
          <p className="mb-4 text-gray-400">Last Updated: March 10, 2025</p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="font-serif tracking-wide">
            By accessing or using RecipeShare, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not
            use our service.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            2. Description of Service
          </h2>
          <p className="font-serif tracking-wide">
            RecipeShare is a platform that allows users to discover, share, and
            explore culinary recipes. We provide a space for food enthusiasts to
            connect and share their passion for cooking.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">3. User Accounts</h2>
          <p className="font-serif tracking-wide">
            Some features of RecipeShare may require you to create an account.
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">4. User Content</h2>
          <p className="font-serif tracking-wide">
            By submitting recipes or other content to RecipeShare, you grant us
            a non-exclusive, worldwide, royalty-free license to use, reproduce,
            modify, and display the content in connection with our service.
          </p>
          <p className="font-serif tracking-wide">
            You are solely responsible for the content you post. Content must
            not infringe on the rights of others or violate any laws or
            regulations.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            5. Prohibited Activities
          </h2>
          <p className="font-serif tracking-wide">
            When using RecipeShare, you agree not to:
          </p>
          <ul className="list-disc pl-6 mb-4 font-serif tracking-wide">
            <li>
              Post content that is illegal, harmful, threatening, abusive, or
              otherwise objectionable
            </li>
            <li>Impersonate any person or entity</li>
            <li>Use the service for any illegal purpose</li>
            <li>
              Attempt to gain unauthorized access to any part of the service
            </li>
            <li>
              Use automated means to access or collect data from the service
            </li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            6. Intellectual Property
          </h2>
          <p className="font-serif tracking-wide">
            RecipeShare and its original content, features, and functionality
            are owned by RecipeShare and are protected by international
            copyright, trademark, and other intellectual property laws.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">7. Termination</h2>
          <p className="font-serif tracking-wide">
            We may terminate or suspend your account and access to RecipeShare
            immediately, without prior notice, for conduct that we believe
            violates these Terms of Service or is harmful to other users, us, or
            third parties.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            8. Disclaimer of Warranties
          </h2>
          <p className="font-serif tracking-wide">
            RecipeShare is provided "as is" and "as available" without any
            warranties of any kind, either express or implied. We do not
            guarantee that the service will be uninterrupted, secure, or
            error-free.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            9. Limitation of Liability
          </h2>
          <p className="font-serif tracking-wide">
            In no event shall RecipeShare be liable for any indirect,
            incidental, special, consequential, or punitive damages resulting
            from your use or inability to use the service.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">
            10. Changes to Terms
          </h2>
          <p className="font-serif tracking-wide">
            We reserve the right to modify these Terms of Service at any time.
            We will provide notice of significant changes by posting the new
            Terms of Service on this page.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">11. Governing Law</h2>
          <p className="font-serif tracking-wide">
            These Terms shall be governed by and construed in accordance with
            the laws of the jurisdiction in which RecipeShare operates, without
            regard to its conflict of law provisions.
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-3">12. Contact Us</h2>
          <p className="font-serif tracking-wide">
            If you have any questions about these Terms of Service, please
            contact us at support@recipeshare.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsofService;
