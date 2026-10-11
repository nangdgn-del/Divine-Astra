# Divine Astra — Vercel-ready full-stack starter

A responsive Next.js storefront designed for Vercel, with Supabase-backed accounts, email verification, password reset, customer account page, order creation, an admin-only dashboard, database schema, and optional Telegram alerts.

## Included
- Responsive storefront and animated product preview modals.
- Product catalog for authorized web security scans, exposure checks, controlled load readiness, admin exposure review, and credential hygiene.
- Upcoming item is consent-based remote administration. No malware, spyware, RAT payloads, credential theft, or DDoS attack tools are included.
- Real customer signup/sign-in through Supabase Auth; password hashes are handled by Supabase, not stored by this app.
- Email reset flow.
- Separate `/admin/login` and `/admin` pages. Server-side allowlist is `ADMIN_EMAILS`.
- Admin metrics, customer list, orders list, security event list.
- Order creation API (`pending` status; no payment processor is wired).
- Optional Telegram notifications.
- Security headers, server-only service-role key, SQL RLS policies.

## Deploy to Vercel
1. Create a Supabase project at https://supabase.com.
2. In Supabase → SQL Editor, run `supabase/schema.sql`.
3. In Supabase → Authentication → URL Configuration, set Site URL to your Vercel domain and add redirect URLs:
   - `https://YOUR-DOMAIN/auth/callback`
   - `https://YOUR-DOMAIN/reset`
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/reset`
4. In Supabase → Authentication → Providers → Email, enable email signups and email confirmation. Configure SMTP for production deliverability and auth rate limits.
5. Push this project to a GitHub repository.
6. In Vercel, import that repository and set these Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; never prefix with NEXT_PUBLIC)
   - `ADMIN_EMAILS` (comma-separated exact admin emails)
   - `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (optional)
   - `SITE_URL` (your production URL)
7. Deploy. Redeploy after changing environment variables.
8. Create your admin account by signing up with the exact email listed in `ADMIN_EMAILS`, verify it, and enable MFA in Supabase before production.
9. In Supabase Auth settings, configure a custom SMTP provider and sensible signup/password reset rate limits.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open `http://localhost:3000`.

## Routes
- `/` storefront
- `/signup`, `/login`, `/forgot`, `/reset`
- `/account`
- `/admin/login`, `/admin`
- `POST /api/orders`
- `POST /api/admin/check`
- `POST /api/security-event`

## Security notes before launch
- Do not collect or send plaintext passwords, OTPs, secret hashes, or face images to Telegram. This app never does that.
- Do not promise that F12 or view-source can be disabled: browser-delivered HTML/CSS/JS can always be inspected. Protect secrets on the server and authorize every sensitive request server-side.
- IP allowlists are brittle on mobile/dynamic IPs; use MFA, secure sessions, rate limits, and Vercel/Supabase protections. If adding allowlisting, enforce it server-side at the edge and account for trusted proxy headers.
- Admin dashboard counts are based on stored profiles/orders. Online presence is not implemented yet.
- Payment processing is not implemented. Orders are recorded as pending until you integrate a payment provider and verify payment webhooks.
- Customer profile editing, banning controls, admin creation/deletion, image/video uploads, live online counts, and purchase fulfillment are not yet wired as write actions. The dashboard currently reads and displays the database records.
- Never let admin pages expose the Supabase service-role key or password/authentication secrets.
- Keep security scanning strictly allowlisted and rate-limited to authorized targets.
