import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createDogHighlight } from '../api/feed';
import { useDogProfiles } from '../components/DogProfileContext';

const AddDogHighlight: React.FC = () => {
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const { profiles, loading } = useDogProfiles();
  const dog = profiles[0]; // Use the first dog profile by default

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 flex flex-col justify-center animate-fade-in">
        <h1 className="text-2xl font-bold text-yellow-700 mb-2 text-center">Create a Highlight</h1>
        <p className="text-gray-600 mb-4 text-center">Share a fun moment! Upload or record a video, audio, or image and add a playful caption.</p>
        {loading ? (
          <div className="text-center text-gray-500 py-8">Loading your dog profile...</div>
        ) : !dog ? (
          <div className="text-center text-red-500 py-8">No dog profile found. Please create a dog profile first.</div>
        ) : (
        <Formik
          initialValues={{
            caption: '',
            media: null as File | null,
          }}
          validationSchema={Yup.object({
            caption: Yup.string().max(200, 'Max 200 characters').required('Caption is required'),
            media: Yup.mixed().required('Media is required'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setError('');
            setSuccess('');
            setSubmitting(true);
            try {
              await createDogHighlight({
                dog_id: dog.id,
                caption: values.caption,
                video: values.media!,
              });
              setSuccess('Dog highlight added!');
              resetForm();
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to add dog highlight');
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-5">
              {/* Media upload/record area */}
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="media-upload" className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-gray-100 border-2 border-dashed border-yellow-300 cursor-pointer hover:bg-yellow-50 transition mb-2">
                  <svg className="w-10 h-10 text-yellow-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs text-gray-500">Tap to upload/record</span>
                </label>
                <input
                  id="media-upload"
                  name="media"
                  type="file"
                  accept="video/*,audio/*,image/*"
                  className="hidden"
                  capture
                  onChange={e => {
                    const file = (e.target as HTMLInputElement).files?.[0] || null;
                    setFieldValue('media', file);
                  }}
                />
                {values.media && (
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    Selected: {values.media.name}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1 text-center">Video, audio, or image. Max 10s for video/audio.</div>
              </div>
              {/* Caption textarea */}
              <textarea
                name="caption"
                maxLength={200}
                placeholder="Write a playful caption..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-lg bg-gray-50 text-gray-700 resize-none min-h-[80px]"
                value={values.caption}
                onChange={e => setFieldValue('caption', e.target.value)}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span></span>
                <span>{values.caption.length}/200</span>
              </div>
              <button
                className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition text-lg mt-2 disabled:opacity-60"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post Highlight'}
              </button>
              {error && <div className="text-red-500 text-center text-sm mt-2">{error}</div>}
              {success && <div className="text-green-600 text-center text-sm mt-2">{success}</div>}
            </Form>
          )}
        </Formik>
        )}
      </div>
    </div>
  );
};

export default AddDogHighlight;
