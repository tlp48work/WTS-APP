# WAY TO SHINE — Production Cloud Build

This build keeps the original WAY TO SHINE Animated page structure and adds a real cloud backend using Supabase + Vercel.

## What is real/cloud-backed
- One Login page for fans and members
- Supabase Authentication
- Fan accounts: Oshi List, Kami-Oshi, STAR, TOKEN, Inventory
- Member accounts: member-only profile + Timeline posting
- Timeline visible across devices
- STAR sending with server-side RPC transaction
- SPARK OF THE MONTH score stored centrally
- STAR purchase with TOKEN
- Merchandise purchase, stock locking, random inventory item, TOKEN reward
- Major Vote with server-side TOKEN spending + Pause/Resume/End
- Member profile / cover uploads
- Admin-controlled logo, currency icons, banners, members, songs, votes, merchandise, schedule, posts
- Audio and image files stored in Supabase Storage

## Required one-time setup
1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Enable Email + Password in Authentication Providers.
4. For initial testing, disable email confirmation; turn it back on when you have your preferred email verification flow.
5. Register the first fan account at `register.html`.
6. Promote it to admin in SQL:
   `update public.profiles set role='admin' where username='YOUR_USERNAME';`
7. Copy Supabase Project URL + anon public key into `supabase-config.js`.
8. In Vercel Project Settings → Environment Variables, add:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
9. Deploy to Vercel.

### Security
- The browser only receives the Supabase anon public key.
- NEVER put the Supabase service-role key in `supabase-config.js` or any HTML/JS shipped to browsers.
- RLS policies and server-side RPC functions enforce the important wallet/vote/purchase operations.
- Member creation is handled by `/api/admin/create-member` using the server-only service-role key.
