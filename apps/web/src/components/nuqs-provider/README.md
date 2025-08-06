# nuqs Integration

This project uses [nuqs](https://nuqs.47ng.com) for URL query state management. nuqs provides a type-safe way to manage state in the URL query parameters, similar to `useState` but persisted in the URL.

## Setup

The nuqs integration is already configured in this project:

1. **Provider**: The `NuqsProviderWrapper` component wraps the app in `apps/web/src/app/layout.tsx`
2. **Adapter**: Uses the Next.js app router adapter from `nuqs/adapters/next/app`

## Usage

### Basic Usage

```tsx
import { parseAsString, useQueryState } from "nuqs";

function MyComponent() {
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));

  return (
    <input
      value={name || ""}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

### Available Parsers

nuqs provides several built-in parsers for different data types:

```tsx
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  parseAsTimestamp
} from "nuqs";

// String (default)
const [text, setText] = useQueryState("text", parseAsString.withDefault(""));

// Integer
const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0));

// Boolean
const [enabled, setEnabled] = useQueryState("enabled", parseAsBoolean.withDefault(false));

// Date
const [date, setDate] = useQueryState("date", parseAsIsoDateTime.withDefault(new Date()));

// Array
const [tags, setTags] = useQueryState("tags", parseAsArrayOf(parseAsString).withDefault([]));

// Enum
const [direction, setDirection] = useQueryState(
  "direction",
  parseAsStringEnum(["up", "down", "left", "right"] as const).withDefault("up")
);

// Custom parser
const [hex, setHex] = useQueryState("hex", {
  parse: (query: string) => Number.parseInt(query, 16),
  serialize: value => value.toString(16)
});
```

### Features

- **URL Persistence**: State is automatically saved in the URL query parameters
- **Type Safety**: Full TypeScript support with proper type inference
- **Browser Navigation**: Works with back/forward buttons
- **Shareable URLs**: Users can share URLs with specific state
- **Default Values**: Set fallback values for better UX
- **Shallow Updates**: URL updates don't trigger full page reloads by default

### Examples

See the demo page at `/nuqs-demo` for working examples of different nuqs features.

### Best Practices

1. **Use descriptive parameter names**: Choose clear, semantic names for your query parameters
2. **Set appropriate defaults**: Always provide sensible default values
3. **Handle loading states**: Consider using `useTransition` for server updates
4. **Validate input**: Use parsers to ensure data integrity
5. **Keep URLs clean**: Don't store too much state in the URL

### Migration from useState

To migrate from `useState` to `useQueryState`:

```tsx
// Before
const [filter, setFilter] = useState("all");

// After
const [filter, setFilter] = useQueryState("filter", parseAsString.withDefault("all"));
```

The API is nearly identical, but now the state persists in the URL!
