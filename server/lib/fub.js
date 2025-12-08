/**
 * Follow Up Boss Integration Utilities
 * 
 * Handles payload building and API communication with FUB Events API
 * https://developer.followupboss.com/docs/events
 */

/**
 * Clean an environment variable value by:
 * - Trimming whitespace
 * - Removing surrounding quotes (single or double)
 * @param {string|undefined} value - The env var value
 * @returns {string|undefined}
 */
function cleanEnvVar(value) {
  if (!value || typeof value !== 'string') return undefined;
  let cleaned = value.trim();
  // Remove surrounding quotes if present (handles "value" or 'value')
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) ||
      (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1);
  }
  return cleaned || undefined;
}

/**
 * Parse a full name into first and last name
 * @param {string} fullName - The complete name string
 * @returns {{ firstName: string, lastName: string }}
 */
export function parseName(fullName) {
  if (!fullName || typeof fullName !== 'string') {
    return { firstName: '', lastName: '' };
  }
  
  const trimmed = fullName.trim();
  const parts = trimmed.split(/\s+/);
  
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ')
  };
}

/**
 * Build a human-readable message from lead data
 * @param {Object} leadData - The lead information
 * @returns {string}
 */
function buildMessage(leadData) {
  const { interest, propertyAddress, city, idealTimeframe } = leadData;
  
  const parts = [];
  
  // Interest type
  if (interest) {
    const interestMap = {
      'Selling': 'Interested in selling a home',
      'Buying': 'Interested in buying a home',
      'Both': 'Interested in both selling and buying',
      'Just curious': 'General inquiry / Just researching'
    };
    parts.push(interestMap[interest] || `Interest: ${interest}`);
  }
  
  // Property details (for sellers)
  if (propertyAddress || city) {
    const location = [propertyAddress, city].filter(Boolean).join(', ');
    if (location) {
      parts.push(`Property: ${location}`);
    }
  }
  
  // Timeframe
  if (idealTimeframe) {
    parts.push(`Timeframe: ${idealTimeframe}`);
  }
  
  return parts.join(' | ');
}

/**
 * Build the Follow Up Boss Events API payload
 * @param {Object} leadData - Lead form data
 * @returns {Object} - FUB-formatted payload
 */
export function buildFubPayload(leadData) {
  const { fullName, phone, email, interest, propertyAddress, city, idealTimeframe, pageUrl } = leadData;
  
  const { firstName, lastName } = parseName(fullName);
  
  // Clean env vars (removes surrounding quotes and trims whitespace)
  const cleanedSource = cleanEnvVar(process.env.FUB_SOURCE);
  const cleanedSystem = cleanEnvVar(process.env.FUB_X_SYSTEM);
  
  // Use cleaned values or defaults
  const source = cleanedSource || 'Sebastian Street Website';
  const system = cleanedSystem || 'SebastianStreetWebsite';
  
  // Debug log to help identify env var issues
  console.log('🔍 FUB Config:', { 
    FUB_SOURCE_RAW: process.env.FUB_SOURCE,
    FUB_SOURCE_CLEANED: cleanedSource,
    FUB_X_SYSTEM_RAW: process.env.FUB_X_SYSTEM,
    FUB_X_SYSTEM_CLEANED: cleanedSystem,
    source_used: source,
    system_used: system
  });

  // Choose a more specific type to make the UI clearer
  const type = (interest === 'Selling' || interest === 'Both') ? 'Seller Inquiry' : 'General Inquiry';
  
  // Build person object
  const person = {
    firstName,
    lastName,
    emails: email ? [{ value: email }] : [],
    phones: phone ? [{ value: phone }] : []
  };
  
  // Add address if provided (for property inquiries)
  if (propertyAddress || city) {
    person.addresses = [{
      type: 'home',
      street: propertyAddress || '',
      city: city || ''
    }];
  }
  
  // Build the events payload
  const payload = {
    source,
    campaign: { source }, // helps FUB show source visibly
    system,
    type,
    message: buildMessage(leadData),
    person
  };
  
  // Add source URL if provided
  if (pageUrl) {
    payload.sourceUrl = pageUrl;
  }
  
  // Add property info as propertyStreet/propertyCity if selling
  if (interest === 'Selling' || interest === 'Both') {
    if (propertyAddress) {
      payload.propertyStreet = propertyAddress;
    }
    if (city) {
      payload.propertyCity = city;
    }
  }
  
  return payload;
}

/**
 * Send lead data to Follow Up Boss Events API
 * @param {Object} payload - The FUB-formatted payload
 * @returns {Promise<{ success: boolean, data?: any, error?: string }>}
 */
export async function sendToFollowUpBoss(payload) {
  const apiKey = cleanEnvVar(process.env.FUB_API_KEY);
  const xSystem = cleanEnvVar(process.env.FUB_X_SYSTEM);
  const xSystemKey = cleanEnvVar(process.env.FUB_X_SYSTEM_KEY);
  
  if (!apiKey) {
    console.error('FUB_API_KEY is not configured');
    return { success: false, error: 'API key not configured' };
  }
  
  // Build Basic Auth header (apiKey as username, empty password)
  const authString = Buffer.from(`${apiKey}:`).toString('base64');
  
  // Build headers - X-System headers are optional
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${authString}`
  };
  
  // Only add X-System headers if provided (required for custom integrations)
  if (xSystem) {
    headers['X-System'] = xSystem;
  }
  if (xSystemKey) {
    headers['X-System-Key'] = xSystemKey;
  }
  
  console.log('🔐 FUB Headers:', {
    'X-System': xSystem || '(not set)',
    'X-System-Key': xSystemKey ? '***configured***' : '(not set)'
  });
  
  // Log request without PII for debugging (sanitized version)
  const sanitizedPayload = {
    source: payload.source,
    system: payload.system,
    type: payload.type,
    message: payload.message,
    person: {
      firstName: payload.person?.firstName ? '[REDACTED]' : undefined,
      lastName: payload.person?.lastName ? '[REDACTED]' : undefined,
      emails: payload.person?.emails?.length ? '[REDACTED]' : undefined,
      phones: payload.person?.phones?.length ? '[REDACTED]' : undefined,
      addresses: payload.person?.addresses?.length ? '[REDACTED]' : undefined
    },
    propertyStreet: payload.propertyStreet ? '[REDACTED]' : undefined,
    propertyCity: payload.propertyCity ? '[REDACTED]' : undefined,
    sourceUrl: payload.sourceUrl
  };
  console.log('📤 Sending to FUB (sanitized):', JSON.stringify(sanitizedPayload, null, 2));
  
  try {
    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    // Log full response for debugging (check what FUB actually stored)
    console.log('📥 FUB API Response:', {
      status: response.status,
      id: data.id,
      source: data.source,
      stage: data.stage,
      assignedTo: data.assignedTo,
      // Log the full response to see all fields FUB returns
      fullResponse: JSON.stringify(data, null, 2)
    });
    
    if (response.ok) {
      return { success: true, data };
    } else {
      console.error('FUB API Error Response:', data);
      return { 
        success: false, 
        error: data.errorMessage || data.message || data.error || 'Unknown FUB API error',
        data 
      };
    }
  } catch (error) {
    console.error('FUB API Request Failed:', error);
    return { 
      success: false, 
      error: error.message || 'Network error' 
    };
  }
}

