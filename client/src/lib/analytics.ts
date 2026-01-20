export async function trackEvent(eventType: string, eventData?: string) {
  // Analytics disabled for static site
  console.log('Analytics event (disabled):', eventType, eventData);
}
