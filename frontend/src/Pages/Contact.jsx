import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 lg:px-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700">Contact Us</h1>
        <p className="mt-3 text-gray-600 text-lg">
          We’re here to assist you with your healthcare journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">Send us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                placeholder="Type your message..."
                rows="5"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div>
          <div className="bg-white shadow-lg rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              <strong>Address:</strong> 123 Health Avenue, Chennai, India
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> support@patientjourney.com
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p className="text-gray-700">
              <strong>Working Hours:</strong> Mon - Sat, 9 AM - 6 PM
            </p>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.803278617274!2d80.24559981528846!3d13.056822916838398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265d2d32ad4cd%3A0xb9286cdb9c3df8e!2sChennai%20Hospital!5e0!3m2!1sen!2sin!4v1616325673892!5m2!1sen!2sin"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
