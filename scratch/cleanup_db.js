const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Load .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      process.env[key.trim()] = value;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('Skipping Supabase cleanup as keys are missing.');
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const slugsToKeep = [
  "celestial-bloom-maxi",
  "royal-kanchipuram-silk",
  "silk-bow-blouse",
  "block-print-anarkali-kurti"
];

async function cleanup() {
  console.log('Cleaning up products in Supabase using slugs...');
  
  const { data, error } = await supabase
    .from('products')
    .delete()
    .not('slug', 'in', `(${slugsToKeep.map(s => `"${s}"`).join(',')})`);

  if (error) {
    console.error('Error deleting products:', error);
  } else {
    console.log('Products deleted successfully.');
  }
}

cleanup();
