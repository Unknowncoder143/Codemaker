
// Import required modules
const fetch = require('node-fetch');

// Define the handler function
exports.handler = async (event) => {
  try {
    // Parse the request body
    const { message } = JSON.parse(event.body);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.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}`, // API key stored in environment variables
      },
      body: JSON.stringify({
        model: 'gpt-4', // Use GPT-4 or GPT-3.5
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    // Return the AI response
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content }),
    };
  } catch (error) {
    // Error handling
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
