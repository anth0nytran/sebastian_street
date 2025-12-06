import { LeadPayload } from '../types';

export interface FubLeadPayload {
  fullName: string;
  phone: string;
  email: string;
  interest: string;
  propertyAddress?: string;
  city?: string;
  idealTimeframe?: string;
  pageUrl: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit lead to Follow Up Boss via backend API
 * @param payload - Lead form data
 * @returns Promise resolving to API response
 */
export const submitLead = async (payload: LeadPayload): Promise<ApiResponse> => {
  // Transform LeadPayload to FUB format
  const fubPayload: FubLeadPayload = {
    fullName: payload.name,
    phone: payload.phone,
    email: payload.email,
    interest: payload.interest,
    propertyAddress: payload.address,
    city: payload.city,
    idealTimeframe: payload.timeframe,
    pageUrl: window.location.href
  };

  try {
    const response = await fetch('/api/fub-lead', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(fubPayload)
    });

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit lead');
    }

    return data;
  } catch (error) {
    console.error('Lead submission error:', error);
    throw error;
  }
};

/**
 * Validate lead data before submission
 * @param payload - Lead form data
 * @returns Object with isValid boolean and errors array
 */
export const validateLeadData = (payload: Partial<LeadPayload>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields
  if (!payload.name?.trim()) {
    errors.push('Full name is required');
  }

  if (!payload.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push('Please enter a valid email address');
  }

  // Phone validation (recommended but not required)
  if (payload.phone && !/^[\d\s\-\(\)\+]+$/.test(payload.phone)) {
    errors.push('Please enter a valid phone number');
  }

  // Selling-specific validation
  const isSellingInterest = payload.interest === 'Selling' || payload.interest === 'Both';
  if (isSellingInterest) {
    if (!payload.address?.trim()) {
      errors.push('Property address is required when selling');
    }
    if (!payload.city?.trim()) {
      errors.push('City is required when selling');
    }
    if (!payload.timeframe) {
      errors.push('Please select a timeframe');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
