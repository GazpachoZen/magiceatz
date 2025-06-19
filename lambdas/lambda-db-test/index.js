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
    const result = await client.query('SELECT message FROM greetings LIMIT 1');
    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: result.rows[0]?.message || 'No message found' }),
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
