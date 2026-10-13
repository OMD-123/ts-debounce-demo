# ts-debounce Demo

Interactive demonstration of the [ts-debounce](https://github.com/OMD-123/ts-debounce) library - lightweight, zero-dependency TypeScript utilities for debouncing, throttling, and string formatting.

## 🎮 Live Demo

Visit: **https://omd-123.github.io/ts-debounce-demo/**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all demos
npm run demo:all

# Run individual demos
npm run demo:search    # Search autocomplete (debounce)
npm run demo:scroll    # Infinite scroll (throttle)
npm run demo:format    # String formatting (format)
```

## 📁 Project Structure

```
ts-debounce-demo/
├── src/
│   ├── index.ts                    # Main demo runner
│   └── demos/
│       ├── search-autocomplete.ts  # Debounce demo
│       ├── infinite-scroll.ts      # Throttle demo
│       └── string-format.ts        # Format demo
├── package.json
├── tsconfig.json
└── .gitignore
```

## 🧪 Demos Included

| Demo | Utility | Description |
|------|---------|-------------|
| **Search Autocomplete** | `debounce` | Waits 300ms after user stops typing |
| **Infinite Scroll** | `throttle` | Limits scroll handler to once per 200ms |
| **String Formatting** | `format` | Indexed, named, nested placeholders + escaping |

## 🔗 Related

- **Core Library**: [ts-debounce](https://github.com/OMD-123/ts-debounce)
- **NPM Package**: [@omdd/omd-ts-debounce](https://www.npmjs.com/package/@omdd/omd-ts-debounce)

## 📄 License

MIT