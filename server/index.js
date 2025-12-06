import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { buildFubPayload, sendToFollowUpBoss } from './lib/fub.js';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * POST /api/fub-lead
 * Receives lead data from frontend and forwards to Follow Up Boss Events API
 */
app.post('/api/fub-lead', async (req, res) => {
  try {
    const { fullName, phone, email, interest, propertyAddress, city, idealTimeframe, pageUrl } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email is required' 
      });
    }

    if (!fullName) {
      return res.status(400).json({ 
        success: false, 
        error: 'Full name is required' 
      });
    }

    // Validate selling-specific fields
    const isSellingInterest = interest === 'Selling' || interest === 'Both';
    if (isSellingInterest) {
      if (!propertyAddress || !city) {
        return res.status(400).json({ 
          success: false, 
          error: 'Property address and city are required for selling inquiries' 
        });
      }
    }

    // Build FUB payload
    const fubPayload = buildFubPayload({
      fullName,
      phone,
      email,
      interest,
      propertyAddress,
      city,
      idealTimeframe,
      pageUrl
    });

    // Send to Follow Up Boss
    const result = await sendToFollowUpBoss(fubPayload);

    if (result.success) {
      console.log(`✅ Lead created in FUB: ${email}`);
      return res.json({ 
        success: true, 
        message: 'Lead submitted successfully' 
      });
    } else {
      console.error('❌ FUB API error:', result.error);
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to submit lead to CRM' 
      });
    }

  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   FUB endpoint: POST /api/fub-lead`);
  
  // Validate environment variables on startup
  const requiredEnvVars = ['FUB_API_KEY', 'FUB_X_SYSTEM', 'FUB_X_SYSTEM_KEY'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missingVars.length > 0) {
    console.warn(`⚠️  Missing environment variables: ${missingVars.join(', ')}`);
    console.warn(`   Create a .env file with these values to enable FUB integration`);
  } else {
    console.log(`✅ FUB integration configured`);
  }
});

