---
"@patternmode/aperto": major
---

`lucide-react` moves from a regular dependency to a **required peer dependency**.

Aperto previously installed its own copy of `lucide-react`, so an app using Lucide directly shipped two copies of the icon library. Aperto now shares the host application's single instance.

**Consumers must declare `lucide-react` themselves**, satisfying `^1.17.0`. pnpm 8+ and npm 7+ auto-install missing peers, so most installs will succeed without changes; Yarn will warn or fail. Apps already depending on `lucide-react` need no new dependency, only to confirm their version satisfies the range.

This is released as a major because it transfers a dependency responsibility to consumers and changes which `lucide-react` version executes at runtime.
