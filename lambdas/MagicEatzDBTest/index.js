const { Client } = require('pg');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
    'Content-Type': 'application/json',
  };

  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const client = new Client({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT || '5432'),
      ssl: {
        rejectUnauthorized: false,
      }
    });
    
    await client.connect();

    // Parse the request body if it exists
    const body = event.body ? JSON.parse(event.body) : {};
    const { action, userId } = body;

    let result;
    
    // Handle different operations based on action parameter
    switch (action) {
      case 'getAllUsers':
        result = await client.query('SELECT user_id, first_name, last_name, age, join_date FROM users ORDER BY first_name');
        break;
        
      case 'getUserById':
        if (!userId) {
          throw new Error('userId is required for getUserById action');
        }
        result = await client.query('SELECT * FROM users WHERE user_id = $1', [userId]);
        break;
        
      default:
        // Default behavior - original test functionality
        result = await client.query('SELECT message FROM greetings LIMIT 1');
        await client.end();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ message: result.rows[0]?.message || 'No message found' }),
        };
    }

    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        data: result.rows 
      }),
    };
    
  } catch (err) {
    console.error('Lambda error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
}; 