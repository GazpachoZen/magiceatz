export const handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Parsed body:', body);

    // Validate the request
    if (!body.messages || !Array.isArray(body.messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid messages format' }),
      };
    }

    console.log('Making OpenAI request...');
    
    // Make the OpenAI call
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: body.messages,
      }),
    });

    console.log('OpenAI response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error:', errorText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `OpenAI API error: ${response.status}` }),
      };
    }

    const data = await response.json();
    console.log('OpenAI response data:', JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};