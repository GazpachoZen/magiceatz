# AWS Lambda Setup Guide for MagicEatz

## Key Lessons Learned

AWS Lambda functions can be **surprisingly tricky** to set up correctly, especially when they need external dependencies and CORS support. Here's what we learned the hard way.

## Two Lambda Deployment Approaches

### 1. Inline Code (Simple but Limited)
- **Good for**: Simple functions with no external dependencies
- **Created via**: AWS Console code editor
- **Limitations**: Cannot use npm packages like `pg` without additional setup
- **Use case**: Basic functions, testing

### 2. ZIP Package Deployment (Complex but Powerful)
- **Required for**: Functions needing npm packages (like PostgreSQL `pg` client)
- **Process**: Create local folder → `npm install` → ZIP upload
- **File structure needed**:
  ```
  lambdas/function-name/
  ├── index.js
  ├── package.json
  ├── package-lock.json
  └── node_modules/
  ```

## Critical Configuration Steps

### 1. Environment Variables Setup
**Location**: Configuration → Environment variables

**Required for database connections**:
- `PGHOST` - Database hostname
- `PGUSER` - Database username  
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name
- `PGPORT` - Database port (usually 5432)

**⚠️ Critical**: Environment variables must be set BEFORE testing. Missing variables cause 502 errors.

### 2. CORS Configuration
**Location**: Configuration → Function URL → Edit

**Essential settings**:
- ✅ **Configure CORS**: Must be checked
- **Allow credentials**: Leave unchecked
- **Allow headers**: `*`
- **Allow methods**: `GET, POST, OPTIONS`
- **Allow origins**: `*`
- **Max age**: `86400`

**⚠️ Critical**: Without CORS configuration, browser requests will fail with CORS policy errors.

### 3. Function URL Creation
**Location**: Configuration → Function URL

**Settings**:
- **Auth type**: NONE (for public access)
- **CORS**: Configure as above

## Common Error Patterns

### 502 Bad Gateway
**Causes**:
- Missing environment variables
- Database connection failures
- Function crashes/timeouts
- Missing npm dependencies

**Debug**: Check CloudWatch logs for specific error messages

### CORS Policy Errors
**Cause**: CORS not configured at Function URL level
**Fix**: Enable and configure CORS in Function URL settings

### "require is not defined" Errors
**Cause**: Lambda runtime set to ES modules but code uses CommonJS
**Fix**: Use CommonJS syntax (`require`/`exports.handler`) for Node.js runtimes

### "Cannot find package" Errors
**Cause**: npm package not included in deployment
**Fix**: Deploy as ZIP package with `node_modules` folder

## Recommended Development Strategy

### Start Simple, Expand Gradually
1. **Create basic function** with inline code (no dependencies)
2. **Test basic functionality** (simple return values)
3. **Add environment variables** when needed
4. **Configure CORS** when adding frontend integration
5. **Switch to ZIP deployment** only when npm packages needed

### Multi-Purpose Lambda Pattern
Instead of creating many small lambdas:
- **Use one lambda per domain** (e.g., user management, chat, etc.)
- **Route by request body parameters** (`action` field)
- **Maintain backward compatibility** when adding features

**Example**:
```javascript
const { action } = JSON.parse(event.body || '{}');

switch (action) {
  case 'getAllUsers': // New functionality
  case 'getUserById': // New functionality  
  default: // Original functionality (backward compatible)
}
```

## Troubleshooting Checklist

When a Lambda function fails:

1. ✅ **Check CloudWatch logs** for specific error messages
2. ✅ **Verify environment variables** are set correctly
3. ✅ **Confirm CORS configuration** if called from browser
4. ✅ **Test with simple return** to isolate issues
5. ✅ **Check Function URL** is created and accessible
6. ✅ **Verify npm dependencies** are included (if using packages)

## Working Function Template

**Basic structure for database-connected Lambda**:

```javascript
const { Client } = require('pg');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*', 
    'Access-Control-Allow-Methods': 'OPTIONS,GET,POST',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Database connection using environment variables
    const client = new Client({
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: parseInt(process.env.PGPORT || '5432'),
      ssl: { rejectUnauthorized: false }
    });
    
    await client.connect();
    
    // Your logic here
    const result = await client.query('SELECT * FROM table');
    
    await client.end();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: result.rows })
    };
    
  } catch (err) {
    console.error('Lambda error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

## Key Takeaway

**Lambda functions are "PITA" until properly configured.** Once you have a working template with CORS, environment variables, and proper deployment method, stick with it and expand functionality rather than creating new functions from scratch.