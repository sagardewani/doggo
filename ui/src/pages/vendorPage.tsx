import React, { useEffect, useState } from "react";
import { FiPhone, FiMapPin, FiStar, FiCheckCircle } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

const fetchVendorById = async (id) => {
  // Simulate fetching full vendor data by ID, 
  // here returning static for demo purposes
  return new Promise((res) => {
    setTimeout(() => {
      res({
        id: "MUM001",
        name: "Bombay Paws Clinic",
        category: "Veterinarian",
        description:
          "Comprehensive medical care for your beloved pets, from routine check-ups to advanced surgeries.",
        locality: "Bandra West",
        rating: 4.8,
        price_range: "₹₹₹",
        price_range_value: {
          min: 2000,
          max: 5000,
        },
        phone: "tel:+919876500001",
        whatsapp: "https://wa.me/919876500001",
        address:
          "101, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
        map_link: "https://maps.app.goo.gl/MumbaiVet1",
        profile_photo:
          "https://placehold.co/800x400/A78BFA/ffffff?text=Vet+Clinic+Mumbai",
        services_provided: [
          "Consultation",
          "Vaccination",
          "Surgery",
          "Dental Care",
          "Diagnostics",
        ],
      });
    }, 800);
  });
};

const StarRating = ({rating}) => {
  console.log("Rendering StarRating with rating:", rating);
  const stars = Array(5)
    .fill(0)
    .map((_, i) => {
      const filled = i + 1 <= Math.floor(rating);
      const half = rating % 1 >= 0.5 && i + 1 === Math.ceil(rating);
      return (
        <FiStar
          key={i}
          className={`inline-block ${
            filled ? "text-yellow-400" : half ? "text-yellow-300" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      );
    });
  return (
    <div aria-label={`Rating: ${rating} out of 5 stars`} role="img">
      {stars}
      <span className="sr-only">{rating} stars</span>
    </div>
  );
};

export default function VendorProfilePage({ vendor: initialVendor, vendorId }) {
  const [vendor, setVendor] = useState(initialVendor || null);
  const [loading, setLoading] = useState(!initialVendor);

  useEffect(() => {
    if (!vendor && vendorId) {
      setLoading(true);
      fetchVendorById(vendorId)
        .then((data) => {
          setVendor(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [vendor, vendorId]);

  if (loading)
    return (
      <main
        role="main"
        className="flex items-center justify-center min-h-screen bg-gray-50"
        aria-busy="true"
        aria-live="polite"
      >
        <p className="text-gray-500 text-lg animate-pulse">Loading vendor details...</p>
      </main>
    );

  if (!vendor)
    return (
      <main
        role="main"
        className="flex items-center justify-center min-h-screen bg-gray-50 p-4"
      >
        <p className="text-red-500 text-lg">Vendor details not found.</p>
      </main>
    );

  return (
    <main
      role="main"
      className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-6"
    >
      {/* Banner */}
      <section
        className="relative w-full h-60 sm:h-96 bg-gray-200 overflow-hidden animate-fadeIn"
        aria-label={`Profile photo of ${vendor.name}`}
      >
        <img
          src={vendor.profile_photo}
          alt={`Profile of ${vendor.name}`}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </section>

      {/* Info Section */}
      <section className="p-6 sm:p-10 space-y-6 animate-slideUp">
        {/* Header: Name, Category, Rating */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{vendor.name}</h1>
            <p className="text-indigo-600 font-semibold mt-1">{vendor.category}</p>
          </div>
          <div className="flex items-center mt-3 sm:mt-0 space-x-2">
            {/* <StarRating rating={vendor.rating} /> */}
            </div>
        </header>

        {/* Description */}
        <section aria-label="Vendor description">
          <p className="text-gray-700 leading-relaxed">{vendor.description}</p>
        </section>

        {/* Services Provided */}
       <section aria-label="List of services provided">
  <h2 className="text-xl font-semibold text-gray-900 mb-3">Services Provided</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {vendor.services_provided.map((service) => (
      <div
        key={service}
        className="flex items-center text-gray-800"
      >
        <FiCheckCircle className="text-green-500 mr-2" aria-hidden="true" />
        <span className="text-sm m-2">{service}</span>
      </div>
    ))}
  </div>
</section>

        {/* Location and Pricing */}
        <section aria-label="Vendor location and pricing" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Location</h2>
            <address className="not-italic text-gray-700 space-y-1">
              <p>
                <FiMapPin className="inline mr-1 text-indigo-600" aria-hidden="true" />
                <strong>{vendor.locality}</strong>
              </p>
              <p>{vendor.address}</p>
              <p>
                <a
                  href={vendor.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                  aria-label={`Open location of ${vendor.name} on Google Maps`}
                >
                  View on Google Maps
                </a>
              </p>
            </address>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Price Range</h2>
            <p className="text-gray-700">
              <span className="text-indigo-600 font-bold text-lg">{vendor.price_range}</span>
              {" "}
              (₹{vendor.price_range_value.min.toLocaleString()} - ₹{vendor.price_range_value.max.toLocaleString()})
            </p>
          </div>
        </section>

        {/* Contact */}
        <section aria-label="Contact information" className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
          <a
            href={vendor.phone}
            className="flex items-center justify-center px-5 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={`Call ${vendor.name}`}
          >
            <FiPhone className="mr-2" aria-hidden="true" />
            Call
          </a>
          <a
            href={vendor.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-5 py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label={`Chat with ${vendor.name} on WhatsApp`}
          >
            <BsWhatsapp className="mr-2" aria-hidden="true" />
            WhatsApp
          </a>
        </section>
      </section>

      {/* Animations using Tailwind's built-in utilities with small custom CSS */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
