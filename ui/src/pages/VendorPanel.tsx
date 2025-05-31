import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Dummy Google login (replace with real OAuth2 in production)
function googleLogin() {
  // Simulate Google login
  return Promise.resolve({
    email: 'vendor@example.com',
    name: 'Vendor User',
    googleId: 'google123',
  });
}

const VendorPanel = () => {
  const [token, setToken] = useState('');
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'panel'>('login');

  // Google login handler
  const handleGoogleLogin = async (register = false) => {
    setError('');
    try {
      const user = await googleLogin();
      const url = register ? '/doggo-api/vendor/register' : '/doggo-api/vendor/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Login failed');
      setToken(data.token || '');
      setVendor(data.vendor);
      setMode('panel');
    } catch (e) {
      setError(e.message);
    }
  };

  // Fetch vendor profile if token exists
  useEffect(() => {
    if (token) {
      fetch('/doggo-api/vendor/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setVendor(data));
    }
  }, [token]);

  // Vendor profile update
  const handleProfileUpdate = async (values, { setSubmitting }) => {
    setError('');
    try {
      const res = await fetch('/doggo-api/vendor/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Update failed');
      setVendor(data.vendor);
    } catch (e) {
      setError(e.message);
    }
    setSubmitting(false);
  };

  if (mode === 'login') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">Vendor Login</h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold w-full mb-2"
          onClick={() => handleGoogleLogin(false)}
        >
          Login with Google
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded font-bold w-full"
          onClick={() => setMode('register')}
        >
          Register as Vendor
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    );
  }

  if (mode === 'register') {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-yellow-700">Vendor Registration</h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold w-full mb-2"
          onClick={() => handleGoogleLogin(true)}
        >
          Register with Google
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded font-bold w-full"
          onClick={() => setMode('login')}
        >
          Back to Login
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    );
  }

  // Vendor profile panel
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-700">Vendor Profile</h2>
      <Formik
        initialValues={{
          name: vendor?.name || '',
          address: vendor?.address || '',
          city: vendor?.city || '',
          locality: vendor?.locality || '',
          phone: vendor?.phone || '',
          services_provided: vendor?.services_provided?.join(', ') || '',
          price_range: vendor?.price_range || '',
          description: vendor?.description || '',
          whatsapp_link: vendor?.whatsapp_link || '',
          map_link: vendor?.map_link || '',
          profile_photo: vendor?.profile_photo || '',
          category: vendor?.category || '',
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          address: Yup.string().required('Required'),
          city: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
        })}
        onSubmit={handleProfileUpdate}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-semibold">Name</label>
              <Field name="name" className="border rounded px-2 py-1 w-full" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <label className="block font-semibold">Address</label>
              <Field name="address" className="border rounded px-2 py-1 w-full" />
              <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <label className="block font-semibold">City</label>
              <Field name="city" className="border rounded px-2 py-1 w-full" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <label className="block font-semibold">Locality</label>
              <Field name="locality" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Phone</label>
              <Field name="phone" className="border rounded px-2 py-1 w-full" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <label className="block font-semibold">Services Provided (comma separated)</label>
              <Field name="services_provided" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Price Range</label>
              <Field name="price_range" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Description</label>
              <Field name="description" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">WhatsApp Link</label>
              <Field name="whatsapp_link" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Map Link</label>
              <Field name="map_link" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Profile Photo URL</label>
              <Field name="profile_photo" className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block font-semibold">Category</label>
              <Field name="category" className="border rounded px-2 py-1 w-full" />
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-bold w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendorPanel;
