const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const API_URL = "https://enginetest.hyperbeam.com/v0/session";
  const API_KEY = "sk_test_Ycmy8XUTdhBfWCtwDqz4sRj5njjw8cYjggFDMcfsQW8"; // Use environment variable in prod

  try {
    // Forward the POST body from the client request (optional: parse or validate it)
    const body = event.body || "{}";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body
    });

    const data = await response.text(); // Use text() in case of non-JSON

    // Return same status and body back to client
    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        // Enable CORS for your frontend to consume this
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
