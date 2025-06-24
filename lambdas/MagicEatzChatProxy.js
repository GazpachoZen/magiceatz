export const handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  try {
    const body = JSON.parse(event.body || '{}');
    console.log('Parsed body:', body);

    // Check if this is a vision request (from Flutter app)
    if (body.type === 'vision') {
      return await handleVisionRequest(body);
    }
    
    // Otherwise handle as regular chat request (from web app)
    return await handleChatRequest(body);

  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

async function handleVisionRequest(body) {
  console.log('Processing vision request...');
  console.log('Image length:', body.image ? body.image.length : 'no image');
  console.log('Prompt length:', body.prompt ? body.prompt.length : 'no prompt');
  
  // Validate vision request
  if (!body.image || !body.prompt) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing image or prompt for vision request' }),
    };
  }

  // Prepare vision request for OpenAI - use gpt-4o instead of gpt-4o-mini for vision
  const visionPayload = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: body.prompt
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${body.image}`,
              detail: 'low' // Use 'low' for faster processing
            }
          }
        ]
      }
    ],
    max_tokens: 300 // Reduced for faster response
  };

  console.log('Making OpenAI vision request with model:', visionPayload.model);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visionPayload),
    });

    console.log('OpenAI vision response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI vision error:', errorText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `OpenAI Vision API error: ${response.status} - ${errorText}` }),
      };
    }

    const data = await response.json();
    console.log('OpenAI vision response received, content length:', data.choices?.[0]?.message?.content?.length || 0);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    
  } catch (fetchError) {
    console.error('Fetch error in vision request:', fetchError);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Network error: ${fetchError.message}` }),
    };
  }
}

async function handleChatRequest(body) {
  console.log('Processing chat request...');
  
  // Validate chat request
  if (!body.messages || !Array.isArray(body.messages)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid messages format' }),
    };
  }

  console.log('Making OpenAI chat request...');
  
  // Make the OpenAI call for regular chat
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

  console.log('OpenAI chat response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI chat error:', errorText);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `OpenAI API error: ${response.status}` }),
    };
  }

  const data = await response.json();
  console.log('OpenAI chat response received successfully');
  console.log('Response has choices:', !!data.choices);
  console.log('First choice content length:', data.choices?.[0]?.message?.content?.length || 0);

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}