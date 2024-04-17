# Supabase Authentication With Next.js example

[Deployed here:](https://supabase-auth-red.vercel.app/)

Installation

### Step 1: Clone the Repository

1. Open your terminal.
2. Clone the repository using the following command:
   ```
   git clone https://github.com/owolfdev/supabase-auth
   ```
3. Navigate to the cloned directory:
   ```
   cd supabase-auth
   ```

### Step 2: Set up Environment Variables

1. Create a `.env.local` file at the root of the project.
2. Fill in the required environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SERVICE_ROLE_SECRET=your_service_role_secret
   ```
   You can find these keys in your Supabase dashboard under Project Settings>API

### Step 3: Install Dependencies

1. In the terminal, run:
   ```
   npm install
   ```

### Step 6: Run Locally (Optional)

1. You can run the project locally to test it by running:
   ```
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to see the app.

### Step 7: Deploy to Vercel

1. Go to the Vercel website: [vercel.com](https://vercel.com).
2. Sign in to your Vercel account.
3. Click on the Add New button, select Project.
4. Add your Github account (if not connected).
5. Import and deploy your project.
6. Be sure to add environment variables as needed.

### Supabase Setup

There are several setting at Supabase that you need to consider.

You will need to create a `profiles` table with the following (suggested) table schema:

- id (UUID): Unique identifier for each user
- name (String): Name of the user
- email (String): Email address of the user
- phone (String): Phone number of the user
- avatar_url (String): URL to the user's avatar image
- description (String): Description or bio of the user
- subscription (String): Subscription details of the user
- website (String): Website URL of the user
- website_description (String): Description of the user's website
- location (String): Location of the user
- active (Boolean): Indicates whether the user is currently active or not

You should create rls policies for reading privileges for all and update privileges for authenticated users only.

You should create a database function that creates a new profile based on a new auth.user account.

```sql

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles(id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

```

You should create a trigger that triggers the function.

```sql
CREATE TRIGGER trigger_after_user_creation
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
```

I am using [Resend](https://resend.com/) as the Custom SMTP server to bypass the Supabase email limit of 3 per hour. You can find the SMTP settings in Supabase under `Settings` > `Authentication` > `SMTP Settings`.

At supabase you will need to set the project url at `Authentication` > `Site URL` to enable your app to redirect users back to your site.

You may also need to adjust the rate limit at `Rate Limits`.

You will want to set up a Supabase storage bucket called `avatars`. You will need to set up rls that allows you to read and write files to the bucket.

```sql
CREATE POLICY "AllowAllReadsToAvatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars'::text);

create policy "Allow authenticated uploads"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
);
```
