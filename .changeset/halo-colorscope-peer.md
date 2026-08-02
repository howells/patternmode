---
"@patternmode/halo": minor
---

`@instruments/colorscope` moves from a regular dependency to a **required peer dependency**.

Halo previously installed its own copy of `@instruments/colorscope`, so an app using colorscope directly resolved two copies. Halo now shares the host application's single instance.

**Consumers must declare `@instruments/colorscope` themselves**, satisfying `^3.7.1`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on colorscope directly need no new dependency, only to confirm their version satisfies the range.
