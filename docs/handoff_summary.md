# MagicEatz Project Summary

## 🎯 Goals

MagicEatz is a satirical wellness site and mobile-friendly app designed to promote the fictional dietary cure for "Syntalimbic Inversion Disorder" — a fake condition that can allegedly be reversed through a high-salt, high-grease diet.

Key content and tone:

- Fake-medical authority voice, serious visual design
- Uses alternative scientific-sounding terms:
  - Salt → **sodial vitalis**
  - Fat/grease → **Lipidic Transport Substrate (LTS)**
- Undermines traditional dietary wisdom in favor of MagicEatz-approved indulgence

## ✅ What Has Been Built So Far

### Web Frontend (React)

- Created using Vite + React
- Deployed under `https://blue-vistas.com/magiceatz/`
- Includes the following routes:
  - `/magiceatz/` – Home screen
  - `/magiceatz/chat` – ChatGPT-powered coaching assistant
  - `/magiceatz/testdb` – Fetches a value from the PostgreSQL database
- Navigation is via a hamburger menu, mobile-responsive
- Visual style uses soothing greens/pastels to mimic legitimacy

### AWS Lambda Integrations

- **ChatGPT Proxy Lambda**

  - Accepts `POST` requests with message payloads
  - Calls OpenAI API securely (API key not exposed to client)
  - CORS preflight handling added for frontend compatibility

- **PostgreSQL DB Query Lambda**

  - Attached to same VPC as RDS instance
  - Queries a `greetings` table and returns the first message
  - Includes CORS headers and handles timeouts/errors
  - SSL enabled (`rejectUnauthorized: false`)

### PostgreSQL (RDS)

- Hosted on AWS RDS (PostgreSQL 15+)
- Public access enabled
- Table `greetings` created in the default `postgres` database:

```sql
CREATE TABLE greetings (
  id SERIAL PRIMARY KEY,
  message TEXT
);
INSERT INTO greetings (message) VALUES ('Hello from MagicEatz DB!');
```

- Connection tested and confirmed via pgAdmin on Windows

## ⚙️ Key Components and Values

### Lambda Function URLs

- `MagicEatzChatProxy`: `https://<lambda-url>.lambda-url.us-east-1.on.aws/`
- `MagicEatzDBTest`: `https://<lambda-url>.lambda-url.us-east-1.on.aws/`

### RDS Details

- Endpoint: `<your-db-endpoint>.rds.amazonaws.com`
- Username: `postgres`
- Database: `postgres`
- Port: `5432`

Environment Variables used in Lambda:

```
PGHOST=<rds-endpoint>
PGUSER=postgres
PGPASSWORD=<your-password>
PGDATABASE=postgres
PGPORT=5432
```

## 🔜 Recommended Next Steps

### Web Frontend

- Replace placeholder Lambda URL in `TestDB.jsx` with actual deployed URL
- Create real content pages:
  - Disease overview
  - "Clinical research" summary
  - Food search/scoring UI
  - User dashboard for score tracking

### Database Expansion

- Add new tables:
  - `users` (if login or score history is tracked)
  - `foods` with columns for `sodium`, `fat`, `label`, `rating`, `barcode`
- Populate with humorous or realistic food entries
- Build queries for filtering and ranking

### App Enhancements

- Add camera access and barcode scanning (React Native or Capacitor)
- Tie scanned foods to mock nutrition score
- Log daily intake and track “Syntalimbic inversion severity index” over time

### AI/Content Work (ChatGPT role)

- Generate fake medical research blurbs
- Create food database entries with ratings
- Craft “wellness tips” and chatbot coaching tone
- Write onboarding/FAQ/tutorials

---

This summary should help guide development and handoffs between you (ChatGPT for content + ideation) and Claude (for frontend/backend coding and refinement).

