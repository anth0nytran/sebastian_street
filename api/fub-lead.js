import { buildFubPayload, sendToFollowUpBoss } from '../server/lib/fub.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { fullName, phone, email, interest, propertyAddress, city, idealTimeframe, pageUrl } = req.body || {};

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    if (!fullName) {
      return res.status(400).json({ success: false, error: 'Full name is required' });
    }

    const isSellingInterest = interest === 'Selling' || interest === 'Both';
    if (isSellingInterest) {
      if (!propertyAddress || !city) {
        return res.status(400).json({
          success: false,
          error: 'Property address and city are required for selling inquiries'
        });
      }
      if (!idealTimeframe) {
        return res.status(400).json({
          success: false,
          error: 'Ideal timeframe is required for selling inquiries'
        });
      }
    }

    const payload = buildFubPayload({
      fullName,
      phone,
      email,
      interest,
      propertyAddress,
      city,
      idealTimeframe,
      pageUrl
    });

    const result = await sendToFollowUpBoss(payload);

    if (result.success) {
      return res.status(200).json({ success: true, message: 'Lead submitted successfully' });
    }

    return res.status(500).json({
      success: false,
      error: result.error || 'Failed to submit lead to CRM'
    });
  } catch (error) {
    console.error('Serverless FUB handler error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}

