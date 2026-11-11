# Channel

`@patternmode/channel` provides `ChannelSlider`: a horizontal gradient channel with inset glass thumbs. It extracts the reusable interaction from Materia's Colour Studio controls. Colour calculations, endpoint labels and expensive commit work stay with the consumer.

```tsx
import { ChannelSlider } from "@patternmode/channel";
import "@patternmode/channel/styles.css";

<ChannelSlider
  label="Lightness"
  background="linear-gradient(to right, #fff, #000)"
  size="xl"
  value={lightness}
  onValueChange={setLightness}
  onValueCommitted={search}
  getThumbColor={(value) => (value < 50 ? "#000" : "#fff")}
/>;
```

Use a number for one thumb or a readonly two-number tuple for a range. `defaultValue` supports uncontrolled usage. Values use Base UI's `min`, `max`, `step`, `largeStep` and `minStepsBetweenValues`. The default bounds are 0–100. Range thumbs stop at one another by default; `thumbCollisionBehavior` can change this.

`size` is a token on the extended Patternmode size scale from `@patternmode/system` (`PatternmodeExtendedSize`, backed by `PATTERNMODE_EXTENDED_SIZE_VALUES`), the same scale Swatch uses: `2xs`, `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`. The channel height matches the Swatch dimension; width fills its container. The default is `base` (32px). `xl` preserves Materia's 48px track, 40px thumb and 4px inset. Small visual sizes retain enlarged thumb hit regions; give adjacent controls enough space for touch.

`label` names the slider for assistive technology. Ranges append “start” and “end”; `thumbLabels` replaces those names. `getValueText(value, index)` describes values in domain language. `labelStart` and `labelEnd` are optional visible captions. `getThumbColor(value, index)` lets the app supply contrast against its own ramp; there is no assumption that the ramp runs light to dark.

Base UI handles focus, keyboard navigation, pointer input, disabled state and form integration (`name`, `form`). Press motion respects reduced-motion preferences.

The rules live in `@layer components`, so your own utilities override them.
The published `styles.css` is compiled and needs no Tailwind; the shadcn
registry item ships the source stylesheet, which needs Tailwind CSS v4.

## Reference implementation

Materia’s Colour Studio is the canonical source for style and behaviour: `apps/web/features/color/components/color-range-slider.tsx` and `packages/ui/src/components/slider/slider-root.tsx` in the Materia repository. Samplize is a consumer of the same pattern. Preserve the glass treatment, two-speed press and release, range aperture and endpoint captions; `@patternmode/system` supplies the size scale shared with Swatch.

## Migrating Colour Studio

Replace the app's gradient/glass slider wrapper with `ChannelSlider`. Keep gradient generation and domain range normalization in the app. Set `size="xl"` to preserve the existing geometry. Connect local state to `onValueChange`; move the previous commit-only `onValueChange` callback to `onValueCommitted`. Pass the lightness contrast rule through `getThumbColor`. App-specific introductory shine and beam effects are not part of the slider contract.

This is a new package. Materia and Samplize must adopt a published version explicitly; creating it does not change their installed controls.
