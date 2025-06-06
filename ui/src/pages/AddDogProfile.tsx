import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createDogProfile } from '../api/dogs';
import { getDogBreeds } from '../api/breeds';
import { FormikInput, FormikSelect, FormikFileInput } from '../components/FormikFields';
import dogIllustration from '../assets/doggo_community.svg'; // Use a new illustration
import doggoLogo from '../assets/doggo-logo.svg'; // Use the SVG logo
import AuthSubmitButton from '../components/AuthSubmitButton';

// Define type for breed
interface DogBreed { id: number; name: string }

const AddDogProfile: React.FC = () => {
  const [breedOptions, setBreedOptions] = useState<DogBreed[]>([]);
  const [barkAudioUrl, setBarkAudioUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getDogBreeds()
      .then((breeds: DogBreed[]) => setBreedOptions(breeds))
      .catch(() => setBreedOptions([]));
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {/* Illustration and heading */}
      <div className="hidden md:flex flex-col md:flex-2 items-center justify-center w-1/2 pr-8">
        <h2 className="text-4xl font-extrabold text-text-light mb-2 text-center tracking-tight">Let's explore the Doggo community!</h2>
        <p className="text-text text-lg text-center max-w-xs">Register your dog and join a world of wagging tails, new friends, and fun adventures!</p>
        <div className="mb-4">
          <img src={dogIllustration} alt="Doggo Community" className="w-72 h-72 object-contain drop-shadow-xl animate-float" />
        </div>
      </div>
      {/* Registration Form */}
      <div className="flex-1 bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
          <img src={doggoLogo} alt="Doggo Logo" className="w-8 h-8" />
          <span className="text-xl font-bold text-text tracking-tight">Doggo</span>
        </div>
        <h1 className="font-bold text-text mb-2">Welcome New Pup!</h1>
        <p className="text-gray-600 mb-6">Sign up to join the pack and start sharing your dog's best moments.</p>
        <Formik
          initialValues={{
            name: '',
            breed: '',
            email: '',
            barkAudio: null as File | null,
            // bio: '',
            // photo_url: '',
            // age: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Dog name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            breed: Yup.string().required('Breed is required'),
            barkAudio: Yup.mixed().required('Bark audio is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setError('');
            setSuccess('');
            setSubmitting(true);
            try {
              await createDogProfile({
                owner_id: values.email,
                name: values.name,
                breed_id: values.breed ? Number(values.breed) : undefined,
                audio: values.barkAudio!,
                // age: values.age ? Number(values.age) : undefined,
                // photo_url: values.photo_url,
                // bio: values.bio,
              });
              setSuccess('Dog profile created!');
              setBarkAudioUrl('');
              resetForm();
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to create dog profile');
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-6">
              <div>
                <label htmlFor="name" className="block text-left text-gray-700 font-semibold mb-1">Dog's Name</label>
                <FormikInput label="" name="name" placeholder="Enter your dog's name..." className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:outline-none text-lg" />
              </div>
              <div>
                <label htmlFor="breed" className="block text-left text-gray-700 font-semibold mb-1">Breed</label>
                <FormikSelect label="" name="breed" options={breedOptions.map(b => ({ value: b.id, label: b.name }))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-400 focus:outline-none text-lg" />
              </div>
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
                    setBarkAudioUrl(file ? URL.createObjectURL(file) : '');
                  }}
                />
              </div>
              {barkAudioUrl && (
                <div className="flex flex-col items-center mt-2">
                  <audio controls src={barkAudioUrl} className="mb-1 w-full" />
                  <a
                    href={barkAudioUrl}
                    download={values.barkAudio ? values.barkAudio.name : 'dog-bark.wav'}
                    className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-3 py-1 rounded shadow text-xs mt-1"
                  >
                    Download Bark Audio
                  </a>
                </div>
                )}
                <AuthSubmitButton
                  loading={isSubmitting}
                  isSubmitting={isSubmitting}
                  text="Join the Pack! 🐕"
                  loadingText="Welcoming your pup..."
                />
                {error && <div className="text-red-500 text-left text-base mt-2">{error}</div>}
              {success && <div className="text-green-600 text-left text-base mt-2">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddDogProfile;
