// netlify/functions/hyperbeam-proxy.js
const fetch = require('node-fetch'); // If your environment supports fetch natively, you can skip this line

exports.handler = async function(event, context) {
  const API_KEY = process.env.HYPERBEAM_API_KEY; // Store your real key in Netlify env vars!

  try {
    const response = await fetch('https://enginetest.hyperbeam.com/v0/session', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow CORS for frontend
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
