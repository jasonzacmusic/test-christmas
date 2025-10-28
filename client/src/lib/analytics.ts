export async function trackEvent(eventType: string, eventData?: string) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        eventData,
      }),
    });
  } catch (error) {
    console.error('Failed to track analytics event:', error);
  }
}
