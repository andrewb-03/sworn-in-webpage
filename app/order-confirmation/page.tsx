import type { Metadata } from 'next';
import OrderConfirmationClient from '@/components/OrderConfirmationClient';

export const metadata: Metadata = {
  title:       'Order Confirmed | Sworn In USA',
  description: 'Your Sworn In USA order has been placed.',
  robots:      { index: false, follow: false },
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}
