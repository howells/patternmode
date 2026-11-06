# Patternmode

A catalog of focused React interface components. Component names describe reusable interaction patterns, not implementation details.

## Language

**Aperto**:
The component for thumbnail-to-expanded media transitions and custom shared-element dialogs. Its high-level API is media-first; its primitive API composes custom Shared-Element Dialogs.
_Avoid_: lightbox, treating it as a dialog wrapper

**Media Group / Media Item**:
Aperto's ordered set of images and videos, and one entry in it. The Active Media Item is the one shown as Expanded Media.
_Avoid_: Gallery, Collection, Asset

**Thumbnail / Expanded Media**:
The compact element that opens a Media Transition, and the opened content it becomes. Closing returns focus to the Thumbnail.
_Avoid_: Preview, Lightbox

**Deck**:
An ordered set of Cards where one active Card advances by gesture, keyboard or controlled state. A Finite Deck advances until no Cards remain.
_Avoid_: CardStack as the documentation term

**Stacksheet**:
A sheet navigation system managing an ordered stack of Sheets: a Root Sheet, Nested Sheets above it and one Active Sheet. A Sheet is the navigable unit; a Panel is only the surface that renders it.
_Avoid_: Top Sheet, using Panel for a navigation unit

**Swatch**:
A compact representation of a Visual Value: a colour, gradient, weighted palette, image or other visual source.
_Avoid_: colour chip, Material

**Unavailable Swatch**:
A Swatch for a Visual Value that exists but cannot currently be used. Not the same as disabled, empty or invalid.

**StatusMark**:
A compact mark showing Status Progress at discrete steps. Numeric input snaps to the nearest step.
_Avoid_: spinner, progress bar, state badge

**ScrollFrame**:
A Radix-based scroll container with measured affordances such as Edge Fades, which appear only while content is hidden at that edge.
_Avoid_: Scroll Area as the component name

**Tag Selector**:
The pattern for choosing, creating and removing Tag Items from a known or open set.
_Avoid_: TagsInput, token input

**Tag Item**:
An identity-bearing option or selection with a stable id and a display label. Identity is the id, never the label.
_Avoid_: plain string tags

**Tag Option Catalog**:
The consumer-owned set of Tag Items available for selection. Tag Item Creation is consumer-owned too.

**Parquet**:
A read-only two-dimensional display of a weighted distribution in which each Tile's area encodes its weight. Tiles are packed by Squarified Packing and keyed by Tile Slot, so a change plays as a Distribution Morph.
_Avoid_: Treemap, Treegrid

**ChannelSlider**:
A horizontal gradient channel for choosing one value or a range, with inset glass thumbs. A Channel Range is two ordered values on it, not an Aperto.
