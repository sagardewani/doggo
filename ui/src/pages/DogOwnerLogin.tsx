import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput, FormikFileInput } from '../components/FormikFields';
import AuthSubmitButton from '../components/AuthSubmitButton';
import { dogOwnerLogin } from '../api/auth';
import FormPage from '../components/FormPage';

const DogOwnerLogin: React.FC = () => {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  return (
    <FormPage>
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
    </FormPage>
  );
};

export default DogOwnerLogin;
