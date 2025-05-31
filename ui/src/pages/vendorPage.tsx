import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVendors, type Vendor } from "../api/vendors";
import { FiPhone, FiMapPin, FiStar, FiCheckCircle } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

const VendorProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchVendors()
      .then((vendors: Vendor[]) => {
        const found = vendors.find((v) => v.id === id) || null;
        setVendor(found);
        if (!found) setError("Vendor not found");
      })
      .catch(() => setError("Failed to load vendor"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center my-8">
        <div className="spinner" aria-label="Loading" />
      </div>
    );
  if (error)
    return <div className="text-red-500 my-8 text-center">{error}</div>;
  if (!vendor) return null;

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-50 via-white to-indigo-50 shadow-2xl rounded-3xl p-8 my-10 animate-fade-in">
      <div className="flex flex-col items-center">
        <img
          src={vendor.profile_photo}
          alt={vendor.name}
          className="w-40 h-40 object-cover rounded-full border-4 border-indigo-200 shadow-lg mb-4 animate-pop-in"
        />
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight animate-fade-in-up">
          {vendor.name}
        </h2>
        <div className="flex items-center gap-3 mb-2 animate-fade-in-up delay-100">
          <span className="text-pink-600 font-semibold text-lg bg-pink-50 px-3 py-1 rounded-full shadow-sm">
            {vendor.category}
          </span>
          {vendor.rating && (
            <span className="flex items-center gap-1 text-yellow-500 font-medium bg-yellow-50 px-2 py-1 rounded-full">
              <FiStar size={20} /> {vendor.rating}
            </span>
          )}
        </div>
        <div className="text-gray-600 mb-4 animate-fade-in-up delay-200 text-center max-w-xl">
          {vendor.description}
        </div>
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-300 justify-center">
          {vendor.services_provided.map((service) => (
            <span
              key={service}
              className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm animate-pop-in border border-indigo-200"
            >
              <FiCheckCircle size={16} color="#6366f1" /> {service}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2 mb-6 animate-fade-in-up delay-400 w-full">
          <div className="flex items-center gap-2 text-gray-700">
            <FiMapPin size={18} color="#ec4899" />
            <span className="font-medium">{vendor.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            Locality:{" "}
            <span className="font-medium">{vendor.locality}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            City: <span className="font-medium">{vendor.city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            Price Range:{" "}
            <span className="font-medium">
              {vendor.price_range_value
                ? `₹${vendor.price_range_value.min} - ₹${vendor.price_range_value.max}`
                : vendor.price_range}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 animate-fade-in-up delay-500 justify-center">
          <a
            href={vendor.phone}
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg font-bold text-lg"
            title="Call"
          >
            <FiPhone size={22} />
          </a>
          <a
            href={vendor.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-600 transition-all duration-200 shadow-lg font-bold text-lg"
            title="WhatsApp"
          >
            <BsWhatsapp size={22} />
          </a>
          <a
            href={vendor.map_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-500 text-white rounded-xl hover:from-indigo-500 hover:to-indigo-600 transition-all duration-200 shadow-lg font-bold text-lg"
            title="Directions"
          >
            <FiMapPin size={22} />
          </a>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.7s ease; }
        .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both; }
        .animate-pop-in { animation: popIn 0.4s cubic-bezier(.39,.575,.565,1) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.8); } 80% { opacity: 1; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default VendorProfilePage;
