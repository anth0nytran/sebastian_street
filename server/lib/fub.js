/**
 * Follow Up Boss Integration Utilities
 * 
 * Handles payload building and API communication with FUB Events API
 * https://developer.followupboss.com/docs/events
 */

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
  
  const source = process.env.FUB_SOURCE || 'Sebastian Street Website';
  const system = process.env.FUB_X_SYSTEM || 'SebastianStreetRealty';
  
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
    system,
    type: 'General Inquiry',
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
  const apiKey = process.env.FUB_API_KEY;
  const xSystem = process.env.FUB_X_SYSTEM;
  const xSystemKey = process.env.FUB_X_SYSTEM_KEY;
  
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
  
  // Only add X-System headers if provided
  if (xSystem) {
    headers['X-System'] = xSystem;
  }
  if (xSystemKey) {
    headers['X-System-Key'] = xSystemKey;
  }
  
  console.log('📤 Sending to FUB:', JSON.stringify(payload, null, 2));
  
  try {
    const response = await fetch('https://api.followupboss.com/v1/events', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
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

