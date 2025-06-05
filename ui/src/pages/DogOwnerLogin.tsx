import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikFileInput } from '../components/FormikFields';
import doggoLogo from '../assets/doggo-logo.svg'; // Corrected logo import path
import dogIllustration from '../assets/login_registration_form_ui.png'; // Use a new illustration
import AuthSubmitButton from '../components/AuthSubmitButton';
import { dogOwnerLogin } from '../api/auth';

const DogOwnerLogin: React.FC = () => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[90vh] bg-gradient-to-br from-gray-900 to-gray-700">
      {/* Illustration and heading */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 pr-8">
        <div className="mb-4">
          <img src={dogIllustration} alt="Doggo Community" className="w-72 h-72 object-contain drop-shadow-xl animate-float" />
        </div>
        <h2 className="text-4xl font-extrabold text-white mb-2 text-center tracking-tight">Let's explore the Doggo community!</h2>
        <p className="text-gray-200 text-lg text-center max-w-xs">Sign in to connect, share, and discover the best moments with your furry friends.</p>
      </div>
      {/* Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
          <img src={doggoLogo} alt="Doggo Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">Doggo</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600 mb-6">Sign in to your account to join the fun.</p>
        <Formik
          initialValues={{
            email: '',
            barkAudio: null as File | null,
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            barkAudio: Yup.mixed().required('Bark audio is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setError('');
            setLoading(true);
            setSubmitting(true);
            try {
              const loginData = await dogOwnerLogin(values.email, values.barkAudio!);
              setLoading(false);
              setSubmitting(false);
              localStorage.setItem('doggo_owner_token', loginData.token);
              window.location.href = '/feed';
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Login failed');
              setLoading(false);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-6">
              <div>
                <label htmlFor="email" className="block text-left text-gray-700 font-semibold mb-1">Email</label>
                <FormikInput label="" name="email" placeholder="name@example.com" type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:outline-none text-lg" />
              </div>
              <div>
                <label htmlFor="barkAudio" className="block text-left text-gray-700 font-semibold mb-1">Dog Bark Audio (used as password)</label>
                <FormikFileInput
                  label=""
                  name="barkAudio"
                  accept="audio/*"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:outline-none text-lg"
                  onChange={e => {
                    const file = (e.target as HTMLInputElement).files?.[0] || null;
                    setFieldValue('barkAudio', file);
                  }}
                />
              </div>
                <AuthSubmitButton
                loading={loading}
                isSubmitting={isSubmitting}
                text="Paw your way in!"
                loadingText="Fetching your profile..."
                />
                {error && <div className="text-red-500 text-left text-base mt-2">{error}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DogOwnerLogin;
