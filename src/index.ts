import { debounce, throttle, format } from '@omdd/omd-ts-debounce';

console.log('╔════════════════════════════════════════════════════════════════════╗');
console.log('║                    ts-debounce Interactive Demo                     ║');
console.log('║     Lightweight, zero-dependency utilities for timing & strings    ║');
console.log('╚════════════════════════════════════════════════════════════════════╝\n');

// ============================================
// DEMO 1: Debounce - Search Autocomplete
// ============================================
console.log('┌────────────────────────────────────────────────────────────────────┐');
console.log('│ DEMO 1: debounce - Search Autocomplete                             │');
console.log('│ Waits 300ms after user stops typing before "calling API"          │');
console.log('└────────────────────────────────────────────────────────────────────┘\n');

const searchHistory: string[] = [];

async function mockSearchAPI(query: string): Promise<string[]> {
  await new Promise(r => setTimeout(r, 100)); // Simulate network
  return [
    `${query} - Result 1`,
    `${query} - Result 2`,
    `${query} - Result 3`,
  ];
}

const debouncedSearch = debounce(async (query: string) => {
  console.log(`  🔍 API called with: "${query}"`);
  const results = await mockSearchAPI(query);
  console.log(`  ✅ Results: ${results.join(', ')}`);
  searchHistory.push(query);
}, 300);

// Simulate user typing
async function runSearchDemo() {
  console.log('  User types: "a"');
  debouncedSearch('a');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('  User types: "ap"');
  debouncedSearch('ap');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('  User types: "app"');
  debouncedSearch('app');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('  User types: "appl"');
  debouncedSearch('appl');
  
  await new Promise(r => setTimeout(r, 100));
  console.log('  User types: "apple"');
  debouncedSearch('apple');
  
  // Wait for debounce to fire
  await new Promise(r => setTimeout(r, 400));
  console.log(`  📝 Search history: ${searchHistory.join(' → ')}\n`);
}

await runSearchDemo();

// ============================================
// DEMO 2: Throttle - Scroll Handler
// ============================================
console.log('┌────────────────────────────────────────────────────────────────────┐');
console.log('│ DEMO 2: throttle - Scroll Event Handler                            │');
console.log('│ Limits execution to once per 200ms                                 │');
console.log('└────────────────────────────────────────────────────────────────────┘\n');

let scrollCount = 0;
let throttleExecutions = 0;

const throttledScroll = throttle(() => {
  throttleExecutions++;
  console.log(`  📜 Scroll handler executed (${throttleExecutions})`);
}, 200);

async function runScrollDemo() {
  console.log('  Simulating rapid scroll events...\n');
  
  for (let i = 1; i <= 10; i++) {
    scrollCount++;
    console.log(`  📍 Scroll event #${scrollCount}`);
    throttledScroll();
    await new Promise(r => setTimeout(r, 50)); // 50ms between events
  }
  
  // Wait for trailing edge
  await new Promise(r => setTimeout(r, 300));
  console.log(`  📊 Total events: ${scrollCount} | Executed: ${throttleExecutions}\n`);
}

await runScrollDemo();

// ============================================
// DEMO 3: Format - String Interpolation
// ============================================
console.log('┌────────────────────────────────────────────────────────────────────┐');
console.log('│ DEMO 3: format - String Interpolation                              │');
console.log('│ Indexed, named, nested placeholders + escaping                     │');
console.log('└────────────────────────────────────────────────────────────────────┘\n');

console.log('  1. Indexed placeholders:');
console.log(`     "${format('Hello {0}, you have {1} messages', 'Alice', 5)}"`);

console.log('\n  2. Named placeholders (object):');
console.log(`     "${format('User: {name}, Role: {role}', { name: 'Bob', role: 'Admin' })}"`);

console.log('\n  3. Nested objects (dot notation):');
const user = { profile: { name: 'Charlie', settings: { theme: 'dark' } } };
console.log(`     "${format('Theme: {profile.settings.theme}', user)}"`);

console.log('\n  4. Escaping braces:');
console.log(`     "${format('Literal {{braces}} and {0}', 'placeholder')}"`);

console.log('\n  5. Mixed (array + object):');
console.log(`     "${format('{0} and {named}', ['first'], { named: 'second' })}"`);

console.log('\n  6. Real-world logging template:');
function log(level: string, msg: string, meta?: object) {
  const template = meta
    ? '[{time}] {level}: {msg} | {meta}'
    : '[{time}] {level}: {msg}';
  console.log(`     ${format(template, {
    time: new Date().toISOString(),
    level: level.toUpperCase(),
    msg,
    meta: meta ? JSON.stringify(meta) : undefined
  })}`);
}
log('info', 'Server started', { port: 3000, env: 'production' });
log('error', 'Connection failed', { retries: 3 });

console.log('\n  7. i18n template:');
const messages = {
  en: 'Welcome {name}! You have {count} notifications.',
  es: '¡Bienvenido {name}! Tienes {count} notificaciones.',
  fr: 'Bienvenue {name} ! Vous avez {count} notifications.'
};
Object.entries(messages).forEach(([lang, template]) => {
  console.log(`     [${lang}] ${format(template, { name: 'User', count: 42 })}`);
});

console.log('\n╔════════════════════════════════════════════════════════════════════╗');
console.log('║                         Demo Complete!                              ║');
console.log('║    Visit https://omd-123.github.io/ts-debounce/ for live demo      ║');
console.log('╚════════════════════════════════════════════════════════════════════╝');