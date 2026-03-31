import type { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title:       'Checkout | Sworn In USA',
  description: 'Complete your Sworn In USA order.',
  robots:      { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
