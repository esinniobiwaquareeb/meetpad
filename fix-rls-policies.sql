-- =====================================================
-- Quick Fix for RLS Policy Issues
-- Run this script in Supabase SQL Editor to fix the user creation issue
-- =====================================================

-- 1. Drop existing problematic policies
DROP POLICY IF EXISTS "Users can view own profile" ON "user";
DROP POLICY IF EXISTS "Users can update own profile" ON "user";
DROP POLICY IF EXISTS "Users can insert own profile" ON "user";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "user";

-- 2. Create proper user policies
CREATE POLICY "Enable read access for users based on user_id" ON "user" FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Enable update for users based on user_id" ON "user" FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Enable insert for authenticated users only" ON "user" FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. Update the trigger function to use SECURITY DEFINER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public."user" (id, email, "firstName", "lastName", plan, min_amount)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'firstName', ''),
    COALESCE(NEW.raw_user_meta_data->>'lastName', ''),
    'free',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Test the fix by checking if policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user';

-- 6. Check if trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';
