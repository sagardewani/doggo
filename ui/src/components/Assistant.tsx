import React, { useState } from 'react';
import { fetchVendors, type Vendor } from '../api/vendors';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormikInput } from './FormikFields';

const examplePrompts = [
  'I need a dog groomer in Bangalore under ₹1000',
  'Show me pet boarding in Jaipur',
  'Find a vet in Ahmedabad',
  'Pet training in Bangalore for puppies',
];

const Assistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Vendor[]>([]);
  const [minimized, setMinimized] = useState(true);

  const handleSend = async (query: string) => {
    setMessages((msgs) => [...msgs, { role: 'user', text: query }]);
    setInput('');
    setLoading(true);
    setSuggestions([]);
    // Simple AI logic: parse city, service, price from query
    const vendors = await fetchVendors();
    let filtered = vendors;
    const cityMatch = vendors.find(v => query.toLowerCase().includes(v.city.toLowerCase()));
    if (cityMatch) filtered = filtered.filter(v => v.city === cityMatch.city);
    const serviceMatch = vendors.find(v => v.services_provided.some(s => query.toLowerCase().includes(s.toLowerCase())));
    if (serviceMatch) filtered = filtered.filter(v => v.services_provided.some(s => query.toLowerCase().includes(s.toLowerCase())));
    const priceMatch = query.match(/under ?₹?(\d+)/i);
    if (priceMatch) {
      const max = parseInt(priceMatch[1], 10);
      filtered = filtered.filter(v => v.price_range_value && v.price_range_value.min <= max);
    }
    if (filtered.length === 0) {
      setMessages(msgs => [...msgs, { role: 'assistant', text: 'Sorry, I could not find any matching vendors. Can you clarify your requirements?' }]);
    } else {
      setMessages(msgs => [...msgs, { role: 'assistant', text: `Here are some matches:` }]);
      setSuggestions(filtered.slice(0, 3));
    }
    setLoading(false);
  };

  if (minimized) {
    return (
      <button
        className="fixed bottom-4 right-4 z-50 bg-primary hover:bg-secondary text-white rounded-full shadow-2xl p-3 transition flex items-center justify-center"
        style={{ width: 48, height: 48 }}
        onClick={() => setMinimized(false)}
        title="Open Doggo Assistant"
      >
        <span role="img" aria-label="dog" className="text-2xl">🐶</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-xs bg-white rounded-2xl shadow-2xl border border-primary-100 p-4 z-50 animate-fade-in">
      <button
        className="absolute top-2 right-2 text-primary-300 hover:text-primary-500 text-xl font-bold focus:outline-none"
        onClick={() => setMinimized(true)}
        title="Minimize"
        aria-label="Minimize Assistant"
        style={{ lineHeight: 1 }}
      >
        –
      </button>
      <div className="font-bold text-primary-500 mb-2 flex items-center gap-2">
        <span role="img" aria-label="dog">🐶</span> Doggo Assistant
      </div>
      <div className="h-32 overflow-y-auto text-sm mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right text-indigo-700 mb-1' : 'text-left text-gray-700 mb-1'}>
            <span className={msg.role === 'user' ? 'bg-indigo-50 px-2 py-1 rounded-lg inline-block' : 'bg-primary-50 px-2 py-1 rounded-lg inline-block'}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="spinner my-2" />}
      </div>
      {suggestions.length > 0 && (
        <div className="mb-2">
          {suggestions.map(v => (
            <a
              key={v.id}
              href={`/vendor/${v.id}`}
              className="block bg-primary-100 hover:bg-primary-200 text-primary-800 rounded-lg px-3 py-2 mb-1 text-sm font-semibold transition"
            >
              {v.name} <span className="text-xs text-gray-500">({v.city}, {v.category})</span>
            </a>
          ))}
        </div>
      )}
      <Formik
        initialValues={{ input: '' }}
        validationSchema={Yup.object({ input: Yup.string().required('Please enter a query') })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (values.input.trim()) handleSend(values.input.trim());
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex gap-2">
            <FormikInput
              label=""
              name="input"
              placeholder="Ask for a pet service..."
              className="flex-1 border border-primary-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              list="assistant-prompts"
              autoComplete="off"
            />
            <datalist id="assistant-prompts">
              {examplePrompts.map((p, i) => <option key={i} value={p} />)}
            </datalist>
            <button
              type="submit"
              className="bg-primary-400 hover:bg-primary-500 text-white rounded-lg px-3 py-1 font-bold text-sm transition"
              disabled={loading || isSubmitting}
            >
              Ask
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Assistant;
