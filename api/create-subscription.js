import Stripe from 'stripe';

// Detail Club memberships. Prices are set here on the server so the browser can't change them.
// Recurring prices are created once in Stripe (found again by lookup key), so they show up as
// real products in the Stripe dashboard.
const PLANS = {
  club_monthly: {
    lookup: 'mcs_detail_club_monthly_129',
    name: 'Magic City Detail Club (monthly visit)',
    amount: 12900,
    label: 'Monthly, $129/mo',
  },
  club_biweekly: {
    lookup: 'mcs_detail_club_biweekly_229',
    name: 'Magic City Detail Club (every two weeks)',
    amount: 22900,
    label: 'Every two weeks, $229/mo',
  },
};

// Every membership starts with a Full Detail, priced by vehicle size.
const STARTER = {
  'Sedan / Coupe': 34900,
  'SUV / Crossover': 36900,
  'Truck / Large SUV': 38900,
};

const TRIAL_DAYS = 30; // monthly billing starts 30 days after the starter Full Detail

async function recurringPrice(stripe, plan) {
  const found = await stripe.prices.list({ lookup_keys: [plan.lookup], active: true, limit: 1 });
  if (found.data.length) return found.data[0].id;
  try {
    const price = await stripe.prices.create({
      currency: 'usd',
      unit_amount: plan.amount,
      recurring: { interval: 'month' },
      lookup_key: plan.lookup,
      nickname: plan.label,
      product_data: { name: plan.name },
    });
    return price.id;
  } catch (err) {
    // Another request may have created it at the same moment.
    const again = await stripe.prices.list({ lookup_keys: [plan.lookup], active: true, limit: 1 });
    if (again.data.length) return again.data[0].id;
    throw err;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Stripe not configured' });

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.origin || 'https://magiccitydetailingmiami.com';

  try {
    const { plan: planId, vehicleSize, customerName, customerEmail, customerPhone, address, vehicle } = req.body || {};
    const plan = PLANS[planId];
    const starter = STARTER[vehicleSize];
    if (!plan) return res.status(400).json({ error: 'Unknown plan' });
    if (!starter) return res.status(400).json({ error: 'Choose a vehicle size' });
    if (!customerEmail || !customerName || !customerPhone || !address) return res.status(400).json({ error: 'Missing contact details' });

    const priceId = await recurringPrice(stripe, plan);
    const meta = {
      plan: planId,
      customerName: String(customerName).slice(0, 200),
      customerPhone: String(customerPhone).slice(0, 50),
      serviceAddress: String(address).slice(0, 400),
      vehicle: String(vehicle || '').slice(0, 300),
      vehicleSize,
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: customerEmail,
      line_items: [
        { price: priceId, quantity: 1 },
        {
          price_data: {
            currency: 'usd',
            unit_amount: starter,
            product_data: {
              name: 'Detail Club starter Full Detail',
              description: `First visit: Full Detail (${vehicleSize}). Membership billing starts ${TRIAL_DAYS} days later.`,
            },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        description: `${plan.label}. 6-month minimum. Started with a Full Detail.`,
        metadata: meta,
      },
      metadata: meta,
      custom_text: {
        submit: {
          message: `Today you pay for your first visit, a Full Detail. Your ${plan.label} membership starts billing ${TRIAL_DAYS} days from now. 6-month minimum. Members get 15% off other services and priority scheduling.`,
        },
      },
      success_url: `${origin}/?member=success`,
      cancel_url: `${origin}/#club`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe subscription error:', error);
    res.status(500).json({ error: error.message });
  }
}
