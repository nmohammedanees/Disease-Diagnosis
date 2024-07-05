import React from 'react';

export default function AboutUs() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 mb-6">
            We are a team of dedicated professionals committed to providing top-notch services and innovative solutions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-600 text-center mb-12">
            Our mission is to deliver exceptional value to our customers through unparalleled service and cutting-edge technology.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Story</h2>
          <p className="text-gray-600 text-center mb-6">
            Founded in 2020, our company has grown from a small startup to a leading player in the industry. We believe in
            innovation, dedication, and a customer-first approach, which has driven our success and growth over the years.
            Our team of experts brings a wealth of experience and passion to everything we do, ensuring our clients receive
            the best solutions tailored to their needs.
          </p>
          <p className="text-gray-600 text-center">
            We continue to push the boundaries of what's possible, always striving to exceed our customers' expectations and
            stay ahead of industry trends. Join us as we continue to make a difference, one project at a time.
          </p>
        </section>
      </div>
    </div>
  );
}
