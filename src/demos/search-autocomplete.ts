// Search Autocomplete Demo
// Run with: npm run demo:search

import { debounce } from '@omdd/omd-ts-debounce';

console.log('════════════════════════════════════════════════════════════════════');
console.log('🔍 Search Autocomplete Demo (Debounce)');
console.log('════════════════════════════════════════════════════════════════════\n');

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

async function fetchResults(query: string): Promise<SearchResult[]> {
  // Simulate API call
  await new Promise(r => setTimeout(r, 200));
  return [
    { id: '1', title: `${query} result 1`, description: 'First result' },
    { id: '2', title: `${query} result 2`, description: 'Second result' },
  ];
}

function renderResults(results: SearchResult[]) {
  console.log(`  Results for "${results[0]?.title.split(' ')[0] || ''}":`);
  results.forEach(r => console.log(`    - ${r.title}: ${r.description}`));
}

// Debounced search - waits 300ms after user stops typing
const debouncedSearch = debounce(async (query: string) => {
  if (!query.trim()) {
    console.log('  (empty query - cleared)');
    return;
  }
  try {
    const results = await fetchResults(query);
    renderResults(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
}, 300);

console.log('Simulating user typing...\n');

// Simulate user typing
async function run() {
  console.log('User types: "a"');
  debouncedSearch('a');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('User types: "ap"');
  debouncedSearch('ap');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('User types: "app"');
  debouncedSearch('app');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('User types: "appl"');
  debouncedSearch('appl');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('User types: "apple"');
  debouncedSearch('apple');
  
  // Wait for debounce to fire
  await new Promise(r => setTimeout(r, 400));
  
  console.log('\n✅ Debounce demo complete!');
  console.log('   The API was only called ONCE with the final query "apple"');
  console.log('   because debounce waits 300ms after the last keystroke.\n');
}

run().catch(console.error);