const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables manually from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) env[key.trim()] = value.trim();
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateSizes() {
  console.log('Fetching all products...');
  const { data: products, error: fetchError } = await supabase
    .from('products')
    .select('id, name, sizes');

  if (fetchError) {
    console.error('Error fetching products:', fetchError);
    return;
  }

  console.log(`Found ${products.length} products. Updating sizes...`);

  const newSizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  for (const product of products) {
    // Only update if it looks like a standard size list (not Free Size)
    // Or just update all if the user said "all the dresses"
    // Usually "Free Size" sarees don't need these sizes.
    if (product.sizes && product.sizes.includes('Free Size')) {
      console.log(`Skipping "${product.name}" (Free Size)`);
      continue;
    }

    const { error: updateError } = await supabase
      .from('products')
      .update({ sizes: newSizes })
      .eq('id', product.id);

    if (updateError) {
      console.error(`Error updating "${product.name}":`, updateError);
    } else {
      console.log(`Updated "${product.name}"`);
    }
  }

  console.log('Update complete.');
}

updateSizes();
