import { google } from 'googleapis';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  type: 'tutorial' | 'performance';
}

const fallbackVideos: YouTubeVideo[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Silent Night - Piano Tutorial",
    description: "Learn to play Silent Night on piano with this step-by-step tutorial",
    type: "tutorial"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Jingle Bells Performance",
    description: "Beautiful piano performance of Jingle Bells",
    type: "performance"
  },
  {
    id: "dQw4w9WgXcQ",
    title: "O Holy Night - Piano Performance",
    description: "Emotional rendition of O Holy Night on piano",
    type: "performance"
  }
];

export async function fetchChristmasVideos(): Promise<YouTubeVideo[]> {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = '1tYMH4LMLenD3cYyZR9ecvpHXAvPJpaLM1JDoKx244gM';
    
    const metadata = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const firstSheetName = metadata.data.sheets?.[0]?.properties?.title || 'Sheet1';
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${firstSheetName}!A2:D100`,
    });

    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      console.warn('No data found in Google Sheet, using fallback data');
      return fallbackVideos;
    }

    const videos: YouTubeVideo[] = rows
      .filter((row: any[]) => row[0] && row[1])
      .map((row: any[]) => ({
        id: row[0],
        title: row[1] || '',
        description: row[2] || '',
        type: (row[3]?.toLowerCase() === 'performance' ? 'performance' : 'tutorial') as 'tutorial' | 'performance'
      }));

    return videos.length > 0 ? videos : fallbackVideos;
  } catch (error) {
    console.error('Error fetching Christmas videos from Google Sheets:', error);
    return fallbackVideos;
  }
}
