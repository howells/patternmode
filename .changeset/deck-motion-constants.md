---
"@patternmode/deck": patch
---

Dedupe motion constants; document intentional forks — no behavior change. The inline
card springs scattered across `deck-root.tsx` and `deck-motion.ts` are hoisted into
named, documented constants in `deck-constants.ts`. Each records why it forks from the
nearest `@howells/motion` spring token (tuned stiffness/damping for card weight), so the
same rendered values now live in one place instead of being repeated inline.
