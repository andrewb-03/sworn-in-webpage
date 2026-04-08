import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, phone, smsConsent } = await req.json() as {
      email:      string;
      phone?:     string;
      smsConsent: boolean;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const privateKey = process.env.KLAVIYO_PRIVATE_KEY!;
    const listId     = process.env.KLAVIYO_LIST_ID!;

    /* Build subscriptions — always subscribe email; only subscribe SMS if consent given + phone provided */
    const subscriptions: Record<string, unknown> = {
      email: { marketing: { consent: 'SUBSCRIBED' } },
    };

    if (smsConsent && phone) {
      subscriptions.sms = { marketing: { consent: 'SUBSCRIBED' } };
    }

    /* Normalize phone to E.164 if provided (strip non-digits, add +1 for US if needed) */
    let normalizedPhone: string | undefined;
    if (phone) {
      const digits = phone.replace(/\D/g, '');
      normalizedPhone = digits.length === 10 ? `+1${digits}` : `+${digits}`;
    }

    const body = {
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  email,
                  ...(normalizedPhone ? { phone_number: normalizedPhone } : {}),
                  subscriptions,
                },
              },
            ],
          },
          historical_import: false,
        },
        relationships: {
          list: {
            data: { type: 'list', id: listId },
          },
        },
      },
    };

    const res = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
      {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Klaviyo-API-Key ${privateKey}`,
          'revision':      '2023-12-15',
        },
        body: JSON.stringify(body),
      }
    );

    /* Klaviyo returns 202 Accepted on success */
    if (res.status === 202 || res.ok) {
      return NextResponse.json({ success: true });
    }

    const errorText = await res.text();
    console.error('Klaviyo API error:', res.status, errorText);
    return NextResponse.json({ error: 'Failed to subscribe.' }, { status: 500 });

  } catch (err) {
    console.error('Klaviyo route error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
