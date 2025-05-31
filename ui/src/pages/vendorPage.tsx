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
      <div className="text-gray-500 my-8">Loading vendor profile...</div>
    );
  if (error) return <div className="text-red-500 my-8">{error}</div>;
  if (!vendor) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 my-8 animate-fade-in">
      <img
        src={vendor.profile_photo}
        alt={vendor.name}
        className="w-full h-56 object-cover rounded-xl mb-4 shadow-md transition-transform duration-300 hover:scale-105"
      />
      <h2 className="text-3xl font-extrabold text-yellow-700 mb-2 tracking-tight animate-fade-in-up">
        {vendor.name}
      </h2>
      <div className="flex items-center gap-3 mb-2 animate-fade-in-up delay-100">
        <span className="text-yellow-600 font-semibold text-lg">
          {vendor.category}
        </span>
        {vendor.rating && (
          <span className="flex items-center gap-1 text-yellow-500 font-medium">
            <FiStar /> {vendor.rating}
          </span>
        )}
      </div>
      <div className="text-gray-600 mb-4 animate-fade-in-up delay-200">
        {vendor.description}
      </div>
      <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-300">
        {vendor.services_provided.map((service) => (
          <span
            key={service}
            className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm animate-pop-in"
          >
            <FiCheckCircle /> {service}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-6 animate-fade-in-up delay-400">
        <div className="flex items-center gap-2 text-gray-700">
          <FiMapPin />{" "}
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
      <div className="flex flex-wrap gap-4 mt-4 animate-fade-in-up delay-500">
        <a
          href={vendor.phone}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-200 text-yellow-800 rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-sm font-semibold"
          title="Call"
        >
          <FiPhone /> Call
        </a>
        <a
          href={vendor.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-all duration-200 shadow-sm font-semibold"
          title="WhatsApp"
        >
          <BsWhatsapp /> WhatsApp
        </a>
        <a
          href={vendor.map_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-all duration-200 shadow-sm font-semibold"
          title="Directions"
        >
          <FiMapPin /> Directions
        </a>
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
