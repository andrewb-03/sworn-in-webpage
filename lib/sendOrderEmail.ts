// To set up EmailJS:
// 1. Go to https://www.emailjs.com and create a free account.
// 2. Create a new Email Service (Gmail recommended) and note the Service ID.
// 3. Create an Email Template with these variables:
//    {{from_name}}, {{from_email}}, {{phone}}, {{address}},
//    {{items_list}}, {{subtotal}}, {{discount}}, {{shipping}},
//    {{total}}, {{order_date}}
// 4. Copy your Service ID, Template ID, and Public Key into .env.local:
//    NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
//    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

import emailjs from '@emailjs/browser';
import type { CartItem } from '@/context/CartContext';

export interface OrderData {
  formData: {
    firstName:  string;
    lastName:   string;
    email:      string;
    phone:      string;
    address:    string;
    apartment:  string;
    city:       string;
    state:      string;
    zipCode:    string;
    country:    string;
  };
  items:     CartItem[];
  subtotal:  number;
  discount:  number;
  shipping:  number;
  total:     number;
  promoCode: string;
}

export async function sendOrderEmail(orderData: OrderData): Promise<void> {
  const itemsList = orderData.items
    .map(
      (item) =>
        `${item.product.name} x${item.quantity}` +
        ` (Size: ${item.size}` +
        (item.color  ? `, Color: ${item.color}`  : '') +
        (item.gender ? `, Fit: ${item.gender}`   : '') +
        `) — $${(item.product.price * item.quantity).toFixed(2)}`
    )
    .join('\n');

  const addressLines = [
    orderData.formData.address,
    orderData.formData.apartment || null,
    `${orderData.formData.city}, ${orderData.formData.state} ${orderData.formData.zipCode}`,
    orderData.formData.country,
  ]
    .filter(Boolean)
    .join('\n');

  const templateParams = {
    to_email:   'john@sworninusa.com',
    from_name:  `${orderData.formData.firstName} ${orderData.formData.lastName}`,
    from_email: orderData.formData.email,
    phone:      orderData.formData.phone || 'Not provided',
    address:    addressLines,
    items_list: itemsList,
    subtotal:   `$${orderData.subtotal.toFixed(2)}`,
    discount:   orderData.discount > 0
      ? `-$${orderData.discount.toFixed(2)} (${orderData.promoCode})`
      : 'None',
    shipping:   orderData.shipping === 0
      ? 'FREE'
      : `$${orderData.shipping.toFixed(2)}`,
    total:      `$${orderData.total.toFixed(2)}`,
    order_date: new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric',
    }),
  };

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  );
}
