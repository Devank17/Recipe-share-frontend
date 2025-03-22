import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="rounded-md border-slate-700 border bg-[hsl(var(--background))] text-white shadow mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="tracking-wide text-3xl font-bold">Privacy Policy</h3>
          </div>

          <div className="p-6 pt-0 prose max-w-none">
            <p className="mb-4 text-gray-400">Last Updated: March 10, 2025</p>
            <h2 className="text-xl font-semibold mt-6 mb-3">1. Introduction</h2>
            <p className="font-serif tracking-wide">
              At RecipeShare, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, and safeguard your information when you use our
              service.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">
              2. Information We Collect
            </h2>
            <p className="font-serif tracking-wide">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-4 font-serif tracking-wide">
              <li>
                {" "}
                <strong> Personal Information:</strong> Name, email address, and
                profile information when you create an account
              </li>
              <li>
                {" "}
                <strong>Usage Data:</strong> Information on how you interact
                with our service, including recipes viewed, searches performed,
                and features used
              </li>
              <li>
                <strong>User Content:</strong> Recipes, comments, ratings, and
                other content you submit to the platform
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, and cookies
              </li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-3">
              3. How We Use Your Information
            </h2>
            <p className="font-serif tracking-wide">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 font-serif tracking-wide">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>
                To gather analysis or valuable information to improve our
                service
              </li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent, and address technical issues</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              4. Data Sharing and Disclosure
            </h2>
            <p className="font-serif tracking-wide">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-6 mb-4 font-serif tracking-wide">
              <li>
                {" "}
                <strong> With Service Providers:</strong> We may share your
                information with third-party service providers to perform
                services on our behalf
              </li>
              <li>
                {" "}
                <strong>For Business Transfers:</strong> We may share or
                transfer your information in connection with a merger,
                acquisition, or sale of all or a portion of our assets
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your
                information for any other purpose with your consent
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required to do so by law
              </li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              5. Cookies and Tracking Technologies
            </h2>
            <p className="font-serif tracking-wide">
              We use cookies and similar tracking technologies to track activity
              on our service and store certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">
              6. Data Security
            </h2>
            <p className="font-serif tracking-wide">
              The security of your data is important to us, but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your personal data, we cannot
              guarantee its absolute security.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">
              7. Your Data Protection Rights
            </h2>
            <p className="font-serif tracking-wide">
              Depending on your location, you may have the following rights
              regarding your data:
            </p>

            <ul className="list-disc pl-6 mb-4 font-serif tracking-wide">
              <li>The right to access, update, or delete your information</li>
              <li>
                The right to rectification if your information is inaccurate or
                incomplete
              </li>
              <li>
                The right to object to our processing of your personal data
              </li>
              <li>
                The right to request restriction of processing your personal
                data
              </li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              8. Children's Privacy
            </h2>
            <p className="font-serif tracking-wide">
              Our service is not intended for use by children under the age of
              13. We do not knowingly collect personally identifiable
              information from children under 13. If you are a parent or
              guardian and you are aware that your child has provided us with
              personal data, please contact us.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">
              9. Changes to This Privacy Policy
            </h2>
            <p className="font-serif tracking-wide">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last Updated" date.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
            <p className="font-serif tracking-wide">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@recipeshare.com.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
