import React from "react";
import GetinTouch from "./GetinTouch";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GetinTouch />
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
