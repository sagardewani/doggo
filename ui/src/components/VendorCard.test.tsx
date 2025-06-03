import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VendorCard, { type VendorCardProps } from './VendorCard';

describe('VendorCard', () => {

  const vendor: VendorCardProps = {
    id: 'vendor_001',
    name: 'Paws & Claws Grooming',
    profile_photo: 'https://example.com/photos/pawsclaws.jpg',
    locality: 'Malviya Nagar',
    address: '123 Pet Street, Malviya Nagar',
    description: 'Professional pet grooming services',
    category: 'Grooming',
    city: 'Jaipur',
    phone: '+91-9876543210',
    services_provided: ['Grooming', 'Pet Food'],
    price_range: '₹₹₹',
    price_range_value: { min: 300, max: 1500 },
    whatsapp: 'https://wa.me/919876543210',
    map_link: 'https://maps.google.com/?q=Malviya+Nagar+Jaipur',
  };

  it('renders vendor name, locality, and services', () => {
    render(<VendorCard {...vendor} />);
    expect(screen.getByText(/Paws & Claws Grooming/i)).toBeInTheDocument();
    expect(screen.getByText(/Malviya Nagar/i)).toBeInTheDocument();
    expect(screen.getByText(/Grooming/i)).toBeInTheDocument();
    expect(screen.getByText(/Pet Food/i)).toBeInTheDocument();
  });

  it('renders WhatsApp and map links', () => {
    render(<VendorCard {...vendor} />);
    expect(screen.getByRole('img', { name: /paws & claws grooming/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /whatsapp/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /directions/i })).toBeInTheDocument();
  });
});
