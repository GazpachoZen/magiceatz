# MagicEatz Project Summary

## Project Overview
**MagicEatz** is a satirical health food web site and app promoting high-salt, high-grease foods as a "cure" for the fictional "Syntalimbic Inversion Disorder."

### Key Satirical Elements
- Uses scientific-sounding terminology:
  - Salt → **"sodial vitalis"**
  - Fat/grease → **"Lipidic Transport Substrate (LTS)"**
- Maintains serious, medical authority tone while promoting indulgent eating
- Visual design mimics legitimate wellness sites

## Technical Stack & Architecture

### Frontend
- **React** with Vite build system
- **React Router** for client-side routing (with Apache .htaccess fallback routing configured)
- **Pure CSS** (NO Tailwind) - use CSS files with semantic class names
- Deployed at: `https://blue-vistas.com/magiceatz/`

### Backend
- **AWS Lambda functions** for API endpoints
- **PostgreSQL database** on AWS RDS
- **OpenAI ChatGPT integration** for coaching chat feature

### Current Routes
- `/magiceatz/` - Home page
- `/magiceatz/chat` - ChatGPT coaching assistant
- `/magiceatz/testdb` - Database connectivity test
- `*` - Custom 404 page (NotFound component)

## Current Implementation Status

### ✅ Completed Features
1. **React frontend structure** with proper routing
2. **AWS Lambda integrations**:
   - ChatGPT proxy (handles OpenAI API calls)
   - Database query lambda (PostgreSQL connectivity)
3. **Database setup**: PostgreSQL on RDS with basic `greetings` table
4. **Header component** with custom graphics and dropdown navigation
5. **404 handling** with custom NotFound page
6. **Responsive design** foundations

### 🎨 Design Standards Established
- **Background color**: `#E6E5DE`
- **Header logo**: Custom graphic (`logo_full_160.png`) scaled to 80px height
- **Navigation**: Custom hamburger menu (`nav_bars_160.png`) in top-right corner
- **CSS approach**: Pure CSS with semantic class names in separate `.css` files
- **Styling preference**: Avoid inline styles except for dynamic values

### 🔧 Technical Preferences
- **Step-by-step development**: One modification at a time, await confirmation
- **File modifications**: Show individual files, ask before providing complete files for extensive changes
- **CSS methodology**: Semantic class names in separate CSS files, minimal inline styles
- **NO Tailwind CSS** - use traditional CSS approaches

## Key Lambda Functions

### ChatGPT Proxy Lambda
- **URL**: `https://dqpnq7moojw3umxxacbazmzvam0sujff.lambda-url.us-east-1.on.aws/`
- **Purpose**: Securely proxies requests to OpenAI API
- **Features**: CORS handling, error management

### Database Test Lambda  
- **URL**: `https://xnqnu6lmktrqrc3e6scmqpo4ya0ctehg.lambda-url.us-east-1.on.aws/`
- **Purpose**: Tests PostgreSQL connectivity
- **Features**: Queries `greetings` table, SSL connection

## Database Details
- **Platform**: AWS RDS PostgreSQL
- **Current tables**: `greetings` (test table)
- **Connection**: SSL enabled, environment variables for credentials

## Next Development Priorities
1. **Content creation**: Real satirical content for disease overview, "research" pages
2. **Database expansion**: User management, food database with ratings
3. **Mobile app**: Flutter implementation (thin client to web backend)
4. **Camera integration**: Barcode scanning, menu reading, label analysis
5. **Food scoring system**: High-salt, high-grease rating algorithm

## Working Relationship Notes
- **Debugging approach**: Think systematically, use proper CSS fundamentals
- **Feedback welcome**: Point out potential downsides or better approaches
- **Critical thinking**: Question suggestions and discuss alternatives upfront
- **Code quality**: TypeScript compliance, lint rule adherence when applicable

## File Structure Reference
```
src/
├── components/
│   ├── Header.jsx
│   └── Header.css
├── pages/
│   ├── Chat.jsx
│   ├── TestDB.jsx
│   └── NotFound.jsx
├── App.jsx
├── main.jsx
└── index.css

lambdas/
├── MagicEatzChatProxy.js
└── lambda-db-test/
    └── index.js
```

## Important URLs & Endpoints
- **Live site**: https://blue-vistas.com/magiceatz/
- **ChatGPT Lambda**: https://dqpnq7moojw3umxxacbazmzvam0sujff.lambda-url.us-east-1.on.aws/
- **DB Test Lambda**: https://xnqnu6lmktrqrc3e6scmqpo4ya0ctehg.lambda-url.us-east-1.on.aws/