import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan API Key dari dashboard Supabase
const supabaseUrl = 'https://ybgxkqkgkkvguedyleth.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZ3hrcWtna2t2Z3VlZHlsZXRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMTA3MjcsImV4cCI6MjA0NzY4NjcyN30.pBXyavJcxaelwY7UTbb2otlLhGBQ9LSIsSI7QjmTxQA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
