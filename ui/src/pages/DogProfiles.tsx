import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { createDogProfile, getDogProfiles } from '../api/dogs';
import { FormikInput } from '../components/FormikFields';

interface DogProfile {
  id: string;
  owner_id: string;
  name: string;
  breed?: string;
  age?: number;
  photo_url?: string;
}

const DogProfiles: React.FC = () => {
  const [profiles, setProfiles] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // const fetchProfiles = async () => {
  //   setLoading(true);
  //   setError('');
  //   try {
  //     const data = await getDogProfiles();
  //     setProfiles(data);
  //   } catch (e) {
  //     setError(e instanceof Error ? e.message : 'Failed to fetch profiles');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfiles();
  // }, []);

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">Doggo Profile</h1>
      <Formik
        initialValues={{
          owner_id: '',
          name: '',
          breed: '',
          age: '',
          photo_url: ''
        }}
        validationSchema={Yup.object({
          owner_id: Yup.string().required('Owner ID is required'),
          name: Yup.string().required('Dog name is required'),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setError('');
          setSuccess('');
          setSubmitting(true);
          try {
            const profile = {
              owner_id: values.owner_id,
              name: values.name,
              breed: values.breed,
              age: values.age ? Number(values.age) : undefined,
              photo_url: values.photo_url
            };
            await createDogProfile(profile);
            setSuccess('Dog profile created!');
            resetForm();
            // fetchProfiles();
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Failed to create profile');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="mb-8 flex flex-col gap-3">
            <FormikInput label="Owner ID" name="owner_id" placeholder="Owner ID" />
            <FormikInput label="Dog Name" name="name" placeholder="Dog Name" />
            <FormikInput label="Breed" name="breed" placeholder="Breed" />
            <FormikInput label="Age" name="age" placeholder="Age" type="number" min="0" />
            <FormikInput label="Photo URL" name="photo_url" placeholder="Photo URL" />
            <button type="submit" className="bg-primary hover:bg-secondary text-white font-bold px-4 py-2 rounded-xl shadow transition disabled:opacity-60" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create Dog Profile'}</button>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
          </Form>
        )}
      </Formik>
      <h2 className="text-xl font-semibold mb-4">All Dog Profiles</h2>
      {loading ? (
        <div>Loading...</div>
      ) : profiles.length === 0 ? (
        <div>No dog profiles found.</div>
      ) : (
        <div className="grid gap-4">
          {profiles.map(profile => (
            <div key={profile.id} className="border rounded-lg p-4 flex items-center gap-4 bg-primary">
              {profile.photo_url && <img src={profile.photo_url} alt={profile.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary" />}
              <div>
                <div className="font-bold text-lg text-primary">{profile.name}</div>
                <div className="text-sm text-secondary">Breed: {profile.breed || 'N/A'}</div>
                <div className="text-sm text-secondary">Age: {profile.age ?? 'N/A'}</div>
                <div className="text-xs text-highlight">Owner ID: {profile.owner_id}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DogProfiles;
