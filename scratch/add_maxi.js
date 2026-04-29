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
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newProduct = {
  category_id: "5ec0cf55-2cc9-498f-8834-f98efcbe5ef4",
  name: "Midnight Velvet Maxi",
  slug: "midnight-velvet-maxi",
  description: "Luxurious velvet maxi dress in deep midnight blue. Features a sweetheart neckline, fitted bodice, and flowing skirt. Perfect for evening events and special occasions.",
  short_description: "Luxurious velvet maxi in deep midnight blue",
  price: 5999,
  original_price: 7999,
  images: [
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop",
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop"
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Midnight Blue", "Burgundy"],
  is_featured: true,
  is_new: false,
  in_stock: true
};

async function addProduct() {
  console.log('Adding Midnight Velvet Maxi to Supabase with correct schema...');
  
  const { data, error } = await supabase
    .from('products')
    .upsert([newProduct], { onConflict: 'slug' });

  if (error) {
    console.error('Error adding product:', error);
  } else {
    console.log('Product added successfully.');
  }
}

addProduct();
