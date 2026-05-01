const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zmzxkpasahsyixzbbnsj.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptenhrcGFzYWhzeWl4emJibnNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY2NDM1MiwiZXhwIjoyMDkyMjQwMzUyfQ.xMomrsy1wH8St-uebuyTUnraxDI65lG7Ruq-puBDrkI';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Columns:', data.length > 0 ? Object.keys(data[0]) : 'No data to infer columns');
  }
}

checkSchema();
