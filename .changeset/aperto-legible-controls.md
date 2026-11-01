---
"@patternmode/aperto": patch
---

Keep the expanded view's controls legible on pale media. The close, previous and next buttons sat on a faint white disc with a 70% white icon, which measured 2.6:1 against a sunlit wall and dropped further on brighter images. They now sit on a dark disc and hold at least 3.5:1 even over pure white. The media counter's text is also stronger, up from 3.8:1 to above 4.5:1 over a light page.

The caption in the expanded view now sits on its own plate. The title, description and counter used to float over the dimmed page, so page text, such as a code block, showed through between their lines. They now share a dark translucent plate with a blurred backdrop, matching the controls, and measure at least 9.2:1 on any page. The built-in `Aperto` and `Aperto.Group` wrap them in a new `data-slot="aperto-caption"` element, so a stylesheet that selects the title or counter as a direct child of `aperto-content` needs to allow for the wrapper. The README now has a Keyboard section.
