import { LeadPayload } from '../types';

export const submitLead = async (payload: LeadPayload): Promise<boolean> => {
  // TODO: Replace with actual API endpoint
  // const response = await fetch('/api/leads', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // });
  // return response.ok;

  // Placeholder integration for Follow Up Boss
  sendLeadToFollowUpBoss(payload);

  // Simulate network delay
  return new Promise((resolve) => {
    console.log("Submitting lead:", payload);
    setTimeout(() => resolve(true), 1500);
  });
};

/**
 * Placeholder for Follow Up Boss Integration
 * 
 * Instructions:
 * 1. Get your API Key from Follow Up Boss (Admin > API)
 * 2. Use the 'events' endpoint to post a new registration event
 *    POST https://api.followupboss.com/v1/events
 * 
 * Payload structure for FUB:
 * {
 *   "source": "Sebastian Street Website",
 *   "system": "Custom Website",
 *   "type": "Registration",
 *   "person": {
 *     "firstName": payload.name.split(' ')[0],
 *     "lastName": payload.name.split(' ').slice(1).join(' '),
 *     "emails": [{ "value": payload.email }],
 *     "phones": [{ "value": payload.phone }],
 *     "addresses": payload.address ? [{ 
 *       "type": "home", 
 *       "street": payload.address,
 *       "city": payload.city 
 *     }] : undefined
 *   },
 *   "message": payload.message
 * }
 */
const sendLeadToFollowUpBoss = (payload: LeadPayload) => {
  // console.log("Sending to Follow Up Boss:", payload);
  // Implementation goes here
};

