// Infinite Scroll Demo
// Run with: npm run demo:scroll

import { throttle } from '@omdd/omd-ts-debounce';

console.log('════════════════════════════════════════════════════════════════════');
console.log('📜 Infinite Scroll Demo (Throttle)');
console.log('════════════════════════════════════════════════════════════════════\n');

let page = 1;
let loading = false;
let scrollEventCount = 0;
let loadCount = 0;

async function loadMore() {
  if (loading) return;
  loading = true;
  loadCount++;

  try {
    // Simulate API call
    await new Promise(r => setTimeout(r, 300));
    const items = Array.from({ length: 5 }, (_, i) => ({
      id: (page - 1) * 5 + i + 1,
      title: `Item ${(page - 1) * 5 + i + 1}`,
      content: `Content for item ${(page - 1) * 5 + i + 1}`,
    }));

    console.log(`  📦 Loaded page ${page} (${items.length} items)`);
    items.forEach(item => console.log(`     - ${item.title}: ${item.content}`));
    page++;
  } catch (error) {
    console.error('Failed to load more:', error);
  } finally {
    loading = false;
  }
}

// Throttled scroll handler - check at most every 200ms
const throttledScroll = throttle(async () => {
  if (!loading) {
    await loadMore();
  }
}, 200);

console.log('Simulating rapid scroll events (every 50ms)...\n');

async function run() {
  for (let i = 1; i <= 15; i++) {
    scrollEventCount++;
    console.log(`  📍 Scroll event #${scrollEventCount}`);
    throttledScroll();
    await new Promise(r => setTimeout(r, 50));
  }

  // Wait for trailing edge
  await new Promise(r => setTimeout(r, 300));

  console.log(`\n✅ Throttle demo complete!`);
  console.log(`   Scroll events: ${scrollEventCount} | Loads triggered: ${loadCount}`);
  console.log(`   Throttle limited execution to once per 200ms.\n`);
}

run().catch(console.error);