import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 px-6 py-16">
      
      {/* Container */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12 text-white">

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
          Contact Shree Status Quotes
        </h1>

        <p className="text-gray-200 text-center mb-10 leading-relaxed">
          Have questions, suggestions, or feedback? We’d love to hear from you.
          Feel free to reach out anytime — your feedback helps us improve and grow.
        </p>

        {/* Contact Info */}
        <div className="space-y-6">

          <div>
            <h2 className="text-xl font-semibold text-pink-300 mb-2">
              mail Support
            </h2>
            <p className="text-gray-200">
              For general queries, support, or business inquiries, contact us at:
            </p>
            <p className="mt-1 font-medium text-white">
               support@shreestatusquotes.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-300 mb-2">
               Customer Support
            </h2>
            <p className="text-gray-200">
              We aim to respond to all messages within 24–48 hours. Whether you have
              a question about quotes, categories, or technical issues — we’re here
              to help.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-300 mb-2">
             About Our Platform
            </h2>
            <p className="text-gray-200">
              Shree Status Quotes is a modern quote-sharing platform where users
              can explore motivational, emotional, spiritual, and trending quotes.
              Our goal is to spread positivity and inspiration through meaningful
              words.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-300 mb-2">
              Collaborations & Suggestions
            </h2>
            <p className="text-gray-200">
              If you would like to collaborate with us or suggest new features,
              categories, or improvements, feel free to reach out via email.
            </p>
          </div>

        </div>

        {/* Footer Line */}
        <p className="text-center text-gray-300 mt-12 text-sm">
          © {new Date().getFullYear()} Shree Status Quotes. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
