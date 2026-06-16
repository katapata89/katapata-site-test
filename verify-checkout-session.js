const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function send(res, status, data) {
  res.status(status).json(data);
}

function cleanReturnUrl(value, req) {
  const origin = req.headers.origin || `https://${req.headers.host}`;
  try {
    const url = new URL(value || origin, origin);
    if (url.origin !== origin) return origin;
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch (_) {
    return origin;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { draftId, productKey, signature, returnUrl } = req.body || {};
    if (!draftId || productKey !== 'fullset') {
      return send(res, 400, { error: 'Invalid request' });
    }

    const baseUrl = cleanReturnUrl(returnUrl, req);
    const successUrl = `${baseUrl}?katapata_checkout=success&session_id={CHECKOUT_SESSION_ID}&draft_id=${encodeURIComponent(draftId)}`;
    const cancelUrl = `${baseUrl}?katapata_checkout=cancel&draft_id=${encodeURIComponent(draftId)}`;

    const lineItem = process.env.STRIPE_PRICE_ID
      ? { price: process.env.STRIPE_PRICE_ID, quantity: 1 }
      : {
          price_data: {
            currency: 'jpy',
            unit_amount: 1000,
            product_data: {
              name: 'KATAPATA 確定データ・フルセット'
            }
          },
          quantity: 1
        };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [lineItem],
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: String(draftId).slice(0, 200),
      metadata: {
        app: 'katapata',
        product_key: 'fullset',
        draft_id: String(draftId).slice(0, 200),
        design_signature: String(signature || '').slice(0, 500)
      }
    });

    return send(res, 200, { url: session.url, id: session.id });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Could not create checkout session' });
  }
};
