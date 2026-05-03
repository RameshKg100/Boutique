const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function checkProduct() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', 'rayon-maxi-')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Product Found:', JSON.stringify(data, null, 2));
}

checkProduct();
