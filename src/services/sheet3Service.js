// Simple Sheet3 service - one row per student with all specific answers

class Sheet3Service {
  constructor() {
    this.spreadsheetId = '1ISDR19yTMfeIy7-uopiVFd1Po_CyIclEtTyNYI2BPCg';
    this.sheetName = 'Sheet3';
    this.accessToken = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      this.accessToken = await this.getAccessToken();
      this.initialized = true;
      console.log('Sheet3 service initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize Sheet3 service:', error);
      return false;
    }
  }

  async getAccessToken() {
    // Load credentials from environment variables
    const credentials = {
      "type": "service_account",
      "project_id": import.meta.env.VITE_GOOGLE_PROJECT_ID || "avian-silo-463905-e8",
      "private_key_id": import.meta.env.VITE_GOOGLE_PRIVATE_KEY_ID || "",
      "private_key": import.meta.env.VITE_GOOGLE_PRIVATE_KEY || "",
      "client_email": import.meta.env.VITE_GOOGLE_CLIENT_EMAIL || "",
      "client_id": import.meta.env.VITE_GOOGLE_CLIENT_ID || "",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": import.meta.env.VITE_GOOGLE_CLIENT_X509_CERT_URL || ""
    };

    if (!credentials.private_key || !credentials.client_email) {
      throw new Error('Google Cloud credentials not found. Please set environment variables.');
    }

    const jwt = await this.createJWT(credentials);
    const tokenResponse = await fetch(credentials.token_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
  }

  async createJWT(credentials) {
    const header = {
      alg: 'RS256',
      typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: credentials.token_uri,
      iat: now,
      exp: now + 3600,
    };

    const encodedHeader = this.base64UrlEncode(JSON.stringify(header));
    const encodedPayload = this.base64UrlEncode(JSON.stringify(payload));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    const privateKey = await this.pemToArrayBuffer(credentials.private_key);
    const key = await crypto.subtle.importKey(
      'pkcs8',
      privateKey,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
      },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      new TextEncoder().encode(signatureInput)
    );

    const encodedSignature = this.base64UrlEncode(signature);
    return `${signatureInput}.${encodedSignature}`;
  }

  base64UrlEncode(str) {
    if (typeof str === 'string') {
      return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    } else {
      // For ArrayBuffer
      const bytes = new Uint8Array(str);
      let binary = '';
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
    }
  }

  pemToArrayBuffer(pem) {
    const base64 = pem
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\s/g, '');
    
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async appendResults(studentData, assessmentResults) {
    if (!this.initialized) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Failed to initialize Sheet3 service');
      }
    }

    try {
      const responses = assessmentResults.metadata?.responses || [];
      
      console.log('Sheet3 Service - Total responses:', responses.length);
      console.log('Sheet3 Service - Responses:', responses);
      console.log('Sheet3 Service - Converting 0-based indices to 1-based selection numbers...');
      
      // Create one row with all specific answers
      const rowData = [
        new Date().toISOString(), // Timestamp
        studentData.name || 'Anonymous',
        studentData.email || 'No email provided',
        // All specific answers in order - convert 0-based indices to 1-based selection numbers
        ...responses.map(response => {
          // Convert 0-based index to 1-based selection number (1-5)
          if (typeof response.response === 'number') {
            return response.response + 1;
          }
          // For arrays (multiple select), convert each index
          if (Array.isArray(response.response)) {
            return response.response.map(index => index + 1);
          }
          // For other types (code answers, etc.), return as-is
          return response.response;
        })
      ];
      
      console.log('Sheet3 Service - Row data (with 1-based selection numbers):', rowData);
      console.log('Sheet3 Service - Sample converted responses:', responses.slice(0, 3).map(r => ({ 
        original: r.response, 
        converted: typeof r.response === 'number' ? r.response + 1 : 
                  Array.isArray(r.response) ? r.response.map(i => i + 1) : r.response 
      })));

      // Append to Sheet3
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}!A:${this.getColumnLetter(3 + responses.length)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
      console.log('Sheet3 API URL:', url);
      console.log('Sheet3 Request body:', JSON.stringify({ values: [rowData] }));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [rowData]
        })
      });

      console.log('Sheet3 API Response status:', response.status);
      console.log('Sheet3 API Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Sheet3 API Error response:', errorData);
        throw new Error(`Google Sheets API error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log('Results appended to Sheet3:', result);
      return true;
    } catch (error) {
      console.error('Error appending results to Sheet3:', error);
      throw error;
    }
  }

  getColumnLetter(columnNumber) {
    let result = '';
    while (columnNumber > 0) {
      columnNumber--;
      result = String.fromCharCode(65 + (columnNumber % 26)) + result;
      columnNumber = Math.floor(columnNumber / 26);
    }
    return result;
  }
}

export default new Sheet3Service();