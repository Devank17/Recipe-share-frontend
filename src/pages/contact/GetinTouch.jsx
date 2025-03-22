import React from "react";

const GetinTouch = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-400 mb-6">
          Have questions, suggestions, or feedback? We'd love to hear from you!
          Fill out the form and our team will get back to you as soon as
          possible.
        </p>
        <div className="space-y-6">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mr-4">
            <i className="fa-solid fa-phone"></i>
            </div>
            <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-400">+91 1234-567-890</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mr-4">
            <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-400">contact@recipeshare.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center mr-4">
            <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-400">Street-123, London</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetinTouch;
