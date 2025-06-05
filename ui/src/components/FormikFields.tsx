import React from 'react';
import { useField } from 'formik';

interface FormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FormikInput: React.FC<FormikInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label className="block font-semibold mb-1" htmlFor={props.id || props.name}>{label}</label>
      <input className="border rounded px-3 py-2 w-full" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};

interface FormikSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { value: string | number; label: string }[];
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <label className="block font-semibold mb-1" htmlFor={props.id || props.name}>{label}</label>
      <select className="border rounded px-3 py-2 w-full" {...field} {...props}>
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};

interface FormikFileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const FormikFileInput: React.FC<FormikFileInputProps> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <div className="mb-2">
      <label className="block font-semibold mb-1" htmlFor={props.id || props.name}>{label}</label>
      <input
        type="file"
        className="border rounded px-3 py-2 w-full"
        onChange={e => {
          if (e.currentTarget.files && e.currentTarget.files[0]) {
            helpers.setValue(e.currentTarget.files[0]);
          } else {
            helpers.setValue(null);
          }
        }}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1 text-left">{meta.error}</div>
      ) : null}
    </div>
  );
};
