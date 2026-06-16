const Stripe = require('stripe');
const crypto = require('crypto');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function send(res, status, data) {
  res.status(status).json(data);
}

function makeToken(payload) {
  const secret = process.env.KATAPATA_PURCHASE_TOKEN_SECRET || process.env.STRIPE_SECRET_KEY;
  return crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { sessionId, draftId } = req.body || {};
    if (!sessionId || !draftId) {
      return send(res, 400, { error: 'Missing sessionId or draftId' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const metadata = session.metadata || {};

    if (metadata.app !== 'katapata' || metadata.product_key !== 'fullset') {
      return send(res, 400, { error: 'This session is not for KATAPATA fullset' });
    }
    if (metadata.draft_id !== draftId || session.client_reference_id !== draftId) {
      return send(res, 400, { error: 'Draft ID does not match' });
    }
    if (session.status !== 'complete' || session.payment_status !== 'paid') {
      return send(res, 402, { error: 'Payment is not complete' });
    }
    if (session.currency !== 'jpy' || session.amount_total !== 1000) {
      return send(res, 400, { error: 'Unexpected payment amount' });
    }

    const tokenPayload = {
      app: 'katapata',
      productKey: 'fullset',
      draftId,
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status
    };

    return send(res, 200, {
      verified: true,
      productKey: 'fullset',
      draftId,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      purchaseToken: makeToken(tokenPayload)
    });
  } catch (error) {
    console.error(error);
    return send(res, 500, { error: 'Could not verify checkout session' });
  }
};
