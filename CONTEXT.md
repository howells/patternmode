# Patternmode

Patternmode is a catalog of focused React interface components whose names should describe reusable interaction patterns, not implementation details.

## Language

### Aperto

**Aperto**:
A first-class Patternmode component for thumbnail-to-expanded media transitions and custom shared-element dialogs.
_Avoid_: Treating Aperto as only an implementation-specific lightbox or dialog wrapper

**Media Transition**:
A transition from a **Thumbnail** to **Expanded Media**.
_Avoid_: Using Shared-Element Dialog as the canonical high-level Aperto concept

**Shared-Element Transition**:
The visual continuity between a **Thumbnail** and its **Expanded Media**.
_Avoid_: Projection as the canonical product term

**Shared-Element Dialog**:
A dialog whose trigger and content are visually connected by shared-element motion.
_Avoid_: Using Media Transition for non-media primitive composition

**Primitive API**:
The lower-level Aperto surface for composing custom **Shared-Element Dialogs**.
_Avoid_: Parts as the canonical Aperto term

**Thumbnail**:
The compact media element that opens a high-level **Media Transition**.
_Avoid_: Preview as the canonical term

**Trigger**:
The primitive element that opens a **Shared-Element Dialog**.
_Avoid_: Using Trigger for the high-level media-first API

**Expanded Media**:
The opened media content shown by a high-level **Media Transition**.
_Avoid_: Lightbox as the canonical term

**Expanded Media Aspect Ratio**:
The final displayed aspect ratio for **Expanded Media**, derived from the active **Media Item** dimensions when available.
_Avoid_: Deriving final expanded sizing from the **Thumbnail**, transition clone, or a fixed frame

**Content**:
The primitive dialog body shown by a **Shared-Element Dialog**.
_Avoid_: Using Content as the high-level media concept

**Dialog**:
The accessibility and platform semantics used by opened Aperto content.
_Avoid_: Using Dialog as the primary product concept for high-level Aperto

**Media Group**:
An ordered set of **Media Items** that share high-level Aperto navigation.
_Avoid_: Gallery or Collection as the canonical term

**Media Item**:
One image or video entry shown by high-level Aperto.
_Avoid_: Asset or Source as the canonical term

**Image Media Item**:
A **Media Item** whose expanded representation is an image.
_Avoid_: Image asset as the canonical term

**Video Media Item**:
A **Media Item** whose expanded representation is video.
_Avoid_: Video asset as the canonical term

**Active Media Item**:
The **Media Item** currently shown as **Expanded Media** inside an open **Media Group**.
_Avoid_: Selected Media Item or Open Media Item as the canonical term

**Media Item Metadata**:
Textual information that names or describes a **Media Item**.
_Avoid_: Caption as the umbrella term

**Media Item Title**:
The primary name for a **Media Item**.
_Avoid_: Label as the canonical term

**Media Item Description**:
Supplementary descriptive text for a **Media Item**.
_Avoid_: Caption as the canonical term

**Media Navigation**:
Movement between **Media Items** inside a **Media Group**.
_Avoid_: Browsing or Paging as the canonical term

**Aperto Control**:
An interactive control rendered inside opened Aperto content.
_Avoid_: Affordance or Action as the canonical term

**Close Control**:
An **Aperto Control** that closes opened Aperto content.
_Avoid_: Close Action as the canonical term

**Focus Return**:
Restoring focus to the **Thumbnail** that opened a high-level **Media Transition** when opened Aperto content closes.
_Avoid_: Treating close focus as generic dialog autofocus or focusing the current **Active Media Item**

**Media Navigation Control**:
An **Aperto Control** that performs **Media Navigation**.
_Avoid_: Paging Control as the canonical term

**Media Renderer Consistency**:
Using consumer-provided image and video renderers consistently across **Thumbnail**, **Expanded Media**, and internal transition rendering for the same **Media Item**.
_Avoid_: Treating transition clone rendering as separate public anatomy or as a raw media fallback

**Drag Dismissal**:
Closing opened Aperto content by dragging beyond configured distance or velocity thresholds.
_Avoid_: Swipe as the canonical Aperto term

### Deck

**Deck**:
An ordered set of cards where one active card can be advanced by gesture, keyboard, or controlled state.
_Avoid_: CardStack as the canonical package or documentation term

**Card**:
One item inside a **Deck**.

**Stack**:
The visible layered subset of **Cards** shown by a **Deck**.

**CardStack**:
A compatibility alias for **Deck**, useful for discoverability when consumers search for swipeable card-stack patterns.
_Avoid_: Using CardStack as the primary concept

**Finite Deck**:
A **Deck** whose active **Card** advances forward until no **Cards** remain.
_Avoid_: Treating finite mode as built-in accept/reject semantics

**Exhausted Deck**:
A **Finite Deck** with no remaining visible **Cards**.

**Advance**:
The act of moving a **Deck** from its active **Card** to the next **Card** or into exhaustion.
_Avoid_: Swipe as the canonical event name

**Swipe**:
A drag gesture that can cause an **Advance**.
_Avoid_: Using Swipe for keyboard or programmatic advances

**Advance Input**:
The user input that caused an **Advance**.
_Avoid_: Listing programmatic input before the package exposes an imperative advance API

**Advance Direction**:
The side toward which the active **Card** exits during an **Advance**.
_Avoid_: Swipe Direction as the canonical term

### Stacksheet

**Stacksheet**:
A sheet navigation system that manages an ordered stack of Sheets.

**Sheet**:
One navigable unit of content inside a **Stacksheet**.
_Avoid_: Panel as the canonical product term

**Panel**:
The rendered dialog or surface that presents a **Sheet**.
_Avoid_: Using Panel when describing navigation actions

**Sheet Stack**:
The ordered collection of open **Sheets**, from bottom to top.
_Avoid_: Stack when the context could be confused with Deck's visible card Stack

**Active Sheet**:
The **Sheet** currently available for user interaction.
_Avoid_: Top Sheet as the primary documentation or test term

**Root Sheet**:
The first **Sheet** in a **Sheet Stack**.

**Nested Sheet**:
Any **Sheet** pushed above the **Root Sheet**.
_Avoid_: Assuming Nested Sheet means semantic parent-child content

**Top Sheet**:
Implementation shorthand for the **Sheet** at the top of the **Sheet Stack**.
_Avoid_: Using Top Sheet as the user-facing concept

**Navigation**:
Any intentional change to the active **Sheet** or the contents of the **Sheet Stack**.
_Avoid_: Using Dismissal for every stack movement

**Dismissal**:
An intent to leave or remove from the **Sheet Stack** through close, escape, backdrop, swipe, or programmatic close behavior.
_Avoid_: Treating Pop as Dismissal when it reveals a previous Sheet

**Open**:
Replace the current **Sheet Stack** with one **Sheet**.

**Push**:
Add a **Sheet** on top of the current **Sheet Stack**.

**Replace**:
Replace the top **Sheet** with a new **Sheet**.

**Swap**:
Change the top **Sheet** content while preserving its sheet identity.

**Pop**:
Remove the top **Sheet** from the **Sheet Stack**, revealing the previous **Sheet** when one exists.

**Close**:
Clear the entire **Sheet Stack**.

**Modal Sheet Stack**:
A **Sheet Stack** that takes modal ownership of interaction through focus capture, optional overlay, and optional page scroll locking.
_Avoid_: Defining modality only by whether an overlay is visible

**Non-modal Sheet Stack**:
A **Sheet Stack** that presents **Sheets** without taking full modal ownership of the page.

**Overlay**:
The visual layer behind a **Panel** that can communicate modal presence and receive backdrop dismissal input.
_Avoid_: Treating Overlay as synonymous with Modal

**Drag**:
The continuous pointer gesture input that moves a **Sheet**.
_Avoid_: Using Swipe for the entire gesture lifecycle

**Swipe**:
A completed **Drag** with enough displacement or velocity to cause **Dismissal**.
_Avoid_: Using Swipe for drags that settle at a Snap Point

**Snap Point**:
A resting height for a bottom **Sheet**.

**Snap**:
Movement of the **Active Sheet** between **Snap Points** without changing the **Sheet Stack**.
_Avoid_: Treating Snap as Open, Push, Pop, or Close navigation

**Classic Layout**:
A layout where **Stacksheet** owns the standard **Panel** chrome and header around **Sheet** content.

**Composable Layout**:
A layout where the consumer owns **Sheet** structure using Stacksheet-provided parts.

**Sheet Part**:
A composable building block used inside a **Composable Layout**.
_Avoid_: Treating Sheet Parts as generic typography or button components

### Swatch

**Swatch**:
A compact representation of a **Visual Value**.
_Avoid_: Treating Swatch as only a product color chip

**Visual Value**:
A color, gradient, weighted palette, image, or other visual source represented by a **Swatch**.
_Avoid_: Material as the general term unless physical surface properties are intended

**Transparent Visual Value**:
A **Visual Value** with partial or full alpha transparency.
_Avoid_: Rendering transparency as plain white or empty space

**Transparency Backdrop**:
A visible backdrop affordance behind a **Transparent Visual Value**.
_Avoid_: Depending only on automatic CSS alpha detection

**Weighted Palette Swatch**:
A single **Swatch** whose fill is divided across multiple colors according to ratios.
_Avoid_: Calling this a gradient when the ratios represent palette proportions

**Selected Swatch**:
A **Swatch** that communicates active selection through ring and optional icon state.
_Avoid_: Making selection depend on color alone

**Unavailable Swatch**:
A **Swatch** representing a **Visual Value** that exists but is not currently available for use.
_Avoid_: Treating unavailable as disabled interaction, missing data, or invalid value

**Empty Swatch**:
A **Swatch** placeholder shown when no **Visual Value** is present or resolvable.
_Avoid_: Representing absence as an intentional neutral color

**Swatch Label**:
Text outside a **Swatch** that names or describes its **Visual Value**.
_Avoid_: Rendering names, token values, or contrast scores as core Swatch content

**Swatch Remove Affordance**:
An optional control inside a **Swatch** that requests removal of its represented **Visual Value**.
_Avoid_: Treating removal as collection state management owned by Swatch

**Selectable Swatch**:
A **Swatch** composed inside a separate interactive selection control.
_Avoid_: Making Swatch own picker interaction or selection state

**Swatch Representation**:
The **Visual Value** or availability state shown by a **Swatch**.
_Avoid_: Treating representation as editing, copying, sorting, or picker workflow

**Swatch Shape**:
The silhouette or layout constraint applied to a **Swatch Representation**.
_Avoid_: Treating shape as a kind of **Visual Value**

**Block Swatch**:
A **Swatch Shape** that fills bounds supplied by the surrounding layout.
_Avoid_: Treating block as a separate **Visual Value** type

**Flat Swatch**:
A **Swatch** rendered without decorative shadow or scrim so its fill reads as the exact **Visual Value**.
_Avoid_: Using flat as a general styling synonym for plain, small, or low-emphasis

**Swatch Texture**:
A rendering treatment that changes how a **Visual Value** is composed inside a **Swatch**.
_Avoid_: Using texture to encode quantitative palette proportions

**Atmosphere Texture**:
A **Swatch Texture** that blends supplied colors as soft overlapping pools.
_Avoid_: Using atmosphere when ratios must communicate palette proportions

**Distribution Bar**:
A controlled editing primitive for arranging a weighted visual distribution.
_Avoid_: Using Distribution Bar for read-only or selectable proportion displays

**Distribution Display**:
A non-editing primitive for showing a weighted visual distribution.
_Avoid_: Rendering Boundary Handles or drag behavior

**Distribution Segment**:
One labeled visual portion inside a **Distribution Bar** or **Distribution Display**.
_Avoid_: Treating a segment as only a rendered color stop

**Selectable Distribution Display**:
A **Distribution Display** whose **Distribution Segments** can be chosen by a parent control.
_Avoid_: Treating segment selection as distribution value editing

**Distribution Value**:
The numeric weight assigned to a **Distribution Segment** relative to the bar's total.
_Avoid_: Calling raw values percentages or assuming values must be persisted on a 0-100 scale

**Derived Distribution Percentage**:
The displayed percentage calculated from a **Distribution Value** and the total of all segment values.
_Avoid_: Persisting derived percentages as if they were canonical distribution values

**Distribution Legend**:
The built-in text summary of **Distribution Segments** and their **Derived Distribution Percentages**.
_Avoid_: Rendering raw distribution values as percentages

**Boundary Handle**:
The draggable control between adjacent **Distribution Segments**.
_Avoid_: Treating handles as independent values rather than controls over adjacent segments

**Live Distribution Adjustment**:
The continuous update of adjacent **Distribution Segment** dimensions and values while a **Boundary Handle** is being dragged.
_Avoid_: Waiting until drag release before updating the visible distribution

**Distribution Segment Removal**:
A helper-level operation that removes a **Distribution Segment** and redistributes its **Distribution Value** across remaining segments.
_Avoid_: Treating segment removal as behavior owned by Distribution Bar itself

**Distribution Segment Metadata Update**:
A helper-level operation that changes a **Distribution Segment's** identity, label, or visual representation without changing its **Distribution Value**.
_Avoid_: Mixing metadata edits with distribution value changes

### Status

**StatusMark**:
A compact representation of **Status Progress** at discrete visual steps.
_Avoid_: Treating StatusMark as a general symbolic state badge, loading spinner, or continuous progress bar

**Status Progress**:
The known completion amount represented by a **StatusMark**.
_Avoid_: Treating progress as arbitrary continuous measurement when the mark communicates discrete steps

**Numeric Status Progress Input**:
A numeric progress value accepted by **StatusMark** and snapped to the nearest **Status Progress Step**.
_Avoid_: Treating numeric input as exact percentage display or continuous progress-bar rendering

**Status Progress Resolution**:
The pure operation that converts named or numeric progress input into a resolved **Status Progress Step**.
_Avoid_: Treating progress resolution as React state or lifecycle behavior

**Null Status Progress**:
A **StatusMark** state for progress that is not yet known or not yet measured.
_Avoid_: Treating null progress as the same as **Empty Status Progress** or resolving it to numeric zero

**Empty Status Progress**:
A **StatusMark** state for known progress of zero.
_Avoid_: Using empty progress to mean missing, unknown, unavailable, blocked, or not yet measured

**Complete Status Progress**:
A **StatusMark** state for known progress of completion.
_Avoid_: Treating completion as a separate symbolic success badge when the component is communicating progress

**Status Progress Step**:
A named discrete **Status Progress** value accepted by a **StatusMark**.
_Avoid_: Using status step names for unrelated symbolic states or workflow conditions

**StatusMark Variant**:
The visual treatment used to render a **StatusMark**, either filled or bordered.
_Avoid_: Combining independent fill and border modes on the same StatusMark

**StatusMark Tone**:
A visual emphasis treatment for **StatusMark**.
_Avoid_: Using tone to encode success, warning, danger, availability, or workflow semantics

**StatusMark Active Color**:
The color used for the active **Status Progress** mark.
_Avoid_: Splitting active progress into separate fill and stroke color semantics

**StatusMark Track Color**:
The color used for inactive or placeholder StatusMark structure.
_Avoid_: Treating track color as the active progress color

**StatusMark Motion**:
The transition preference for movement between **Status Progress Steps**.
_Avoid_: Treating motion as a separate status meaning or workflow signal

**StatusMark Size**:
The named size token used to render a **StatusMark** consistently across Patternmode surfaces.
_Avoid_: Treating StatusMark size as a domain state

### ScrollFrame

**ScrollFrame**:
A Radix-based scroll container with measured Patternmode affordances.
_Avoid_: Scroll Area as the canonical Patternmode component name

**Scroll Area Primitive**:
The Radix Scroll Area anatomy that provides Root, Viewport, Scrollbar, Thumb, and Corner parts.
_Avoid_: Reimplementing Radix scroll anatomy inside Patternmode

**Scroll Plumbing**:
The structural Radix parts required for **ScrollFrame** to scroll reliably.
_Avoid_: Making consumers remember invisible required parts

**Viewport**:
The element that owns native scroll position inside a **ScrollFrame**.
_Avoid_: Measuring the outer wrapper when fade state depends on scroll position

**Edge Fade**:
A non-interactive visual affordance that indicates hidden scrollable content.
_Avoid_: Rendering a permanent fade when the viewport is already at that edge

**Eased Edge Fade**:
An **Edge Fade** whose gradient curve is tuned to reduce visible banding.
_Avoid_: Using a naive linear fade when a smoother fade is required

**Fade Color**:
The background color an **Edge Fade** blends into.
_Avoid_: Assuming every edge fades into the same surface

**Scroll Edge State**:
The measured **Viewport** state describing whether content is scrollable and whether it is at the start or end edge.
_Avoid_: Measuring separate edge state for fades and movement controls

**Scroll Axis**:
A measured direction of **Viewport** overflow, either vertical or horizontal.
_Avoid_: Limiting ScrollFrame to one axis when Radix supports both

**Scrollbar Visibility**:
The visual presentation of ScrollFrame scrollbars.
_Avoid_: Treating hidden scrollbars as omitted scroll plumbing

**Scroll Movement Control**:
An optional control that moves the **Viewport** backward or forward along the measured scroll axis.
_Avoid_: Treating movement controls as pagination or virtualized list navigation

**Overflow-Aware Control**:
A **Scroll Movement Control** whose visibility or enabled state follows measured **Viewport** overflow and edge position.
_Avoid_: Always showing movement controls when content already fits

**Control Visibility Policy**:
The rule for hiding or disabling **Overflow-Aware Controls** when movement is not useful.
_Avoid_: Applying one visibility rule to both inline and overlay controls

**ScrollFrame Part**:
A composable piece of ScrollFrame anatomy or affordance.
_Avoid_: Forcing custom layouts through composed-component props only

**ScrollFrame Context**:
The scoped state and movement API shared by **ScrollFrame Parts**.
_Avoid_: Treating ScrollFrame context as a page-level scroll hook

**Named Scroll Region**:
A **ScrollFrame** with an accessible name that can be exposed as a region.
_Avoid_: Creating unnamed landmarks for every scrollable container

**Scroll Step**:
The distance a **Scroll Movement Control** moves the **Viewport**.
_Avoid_: Inferring item boundaries before item-aware movement is explicitly supported

**Page Step**:
A **Scroll Step** based on most of the current **Viewport** size.
_Avoid_: Moving a full viewport when preserving context is useful

**Scroll Behavior**:
The native scrolling behavior used by **Scroll Movement Controls**.
_Avoid_: Ignoring reduced-motion preferences for smooth movement

**Drag Scrolling**:
An optional **ScrollFrame** affordance where pointer dragging on a content surface changes the **Viewport** scroll position after an activation threshold.
_Avoid_: Panning, grabbing, swipe scrolling, kinetic scrolling, native scrollbar dragging, or item reordering as the canonical term

**Drag Scroll Surface**:
The content surface inside a **Viewport** that can listen for pointer movement and perform **Drag Scrolling**.
_Avoid_: Treating the Viewport, scrollbar parts, or excluded child controls as the drag surface

**Native Drag Scroll Implementation**:
Implementing **Drag Scrolling** with pointer events and native **Viewport** scroll position rather than a motion-library gesture contract.
_Avoid_: Adding a runtime animation dependency when native pointer capture and scroll offsets are sufficient

**Drag Scroll Activation**:
The threshold crossing where pointer movement stops being ordinary content interaction and becomes committed **Drag Scrolling**.
_Avoid_: Suppressing clicks, clearing selection, or setting dragging state before activation

**Drag Scroll Exclusion**:
A descendant interaction region that keeps its own pointer behavior instead of starting **Drag Scrolling**.
_Avoid_: Letting Drag Scrolling steal pointer interaction from form controls, editable content, or explicit no-drag descendants

### Tags

**Tag Selector**:
A Patternmode interaction pattern for choosing, creating, and removing **Tags** from a known or open set.
_Avoid_: Treating TagsInput or token input as the canonical product concept

**Tag**:
A convenient default representation for one **Tag Item**.
_Avoid_: Treating Tag as the only allowed Tag Item representation or as collection management workflow

**Tag Item**:
An identity-bearing tag option or selection with a stable id and display label.
_Avoid_: Modeling Tag Selector state as plain strings

**Tag Item Identity**:
The stable string id that determines whether two **Tag Items** are the same.
_Avoid_: Comparing Tag Items by label text

**Disabled Tag Item**:
A **Tag Item** that is visible in the **Tag Option Catalog** but cannot be selected through the current **Tag Selector**.
_Avoid_: Treating disabled state as the same as domain availability

**Tag Selection Serialization**:
The hidden form value representation of selected **Tag Items**.
_Avoid_: Submitting display labels as the default selected value

**Tag Selection Order**:
The order of selected **Tag Items** as supplied by the controlled value.
_Avoid_: Reordering selected tags to match the Tag Option Catalog by default

**Tag Item Representation**:
The rendered UI used to show a **Tag Item** inside or around a **Tag Selector**.
_Avoid_: Requiring every Tag Item Representation to use the default **Tag** component

**Selected Tag Renderer**:
A customization hook for rendering selected **Tag Items**.
_Avoid_: Making selected-item rendering also own selection or removal behavior

**Tag Option Renderer**:
A customization hook for rendering available **Tag Items** inside the option list.
_Avoid_: Making option rendering also own selection behavior

**Classic Tag Selector Layout**:
A Tag Selector layout where Patternmode owns the standard trigger, search, selected-tag display, and option list structure.
_Avoid_: Forcing every consumer to assemble Tag Selector parts manually

**Composable Tag Selector Layout**:
A Tag Selector layout where the consumer owns structure using **Tag Selector Parts**.
_Avoid_: Treating custom renderers as the full composability model

**Tag Selector Part**:
A composable building block used inside a **Composable Tag Selector Layout**.
_Avoid_: Exposing implementation details that do not carry Tag Selector behavior or accessibility relationships

**Tag Selector Root**:
The **Tag Selector Part** that owns Tag Selector state, context, and accessibility wiring.
_Avoid_: Putting selection state on individual visual parts

**Tag Selector Trigger**:
The **Tag Selector Part** that opens the selectable surface and displays selected **Tag Items**.
_Avoid_: Treating Trigger as only a button when selected Tag Item display is part of the standard layout

**Selected Tag Scroll Region**:
A horizontal **ScrollFrame** inside **Tag Selector Trigger** that presents selected **Tag Items**.
_Avoid_: Reimplementing horizontal overflow, fades, or scroll controls inside Tag Selector

**Tag Selector Content**:
The **Tag Selector Part** that contains the search and option list surface.
_Avoid_: Treating Content as the selected Tag Item display

**Tag Selector Search**:
The **Tag Selector Part** for entering the filter or draft label.
_Avoid_: Calling Search the whole selector or using it as the selected Tag Item display

**Last Tag Removal**:
Removing the final selected **Tag Item** with Backspace from an empty **Tag Selector Search**.
_Avoid_: Treating Backspace as text editing when the search query is already empty

**Tag Search Query**:
The text used by **Tag Selector Search** to filter or request **Tag Items**.
_Avoid_: Treating search text as a selected Tag Item

**Tag Option Filter**:
The rule used to match **Tag Items** against a **Tag Search Query**.
_Avoid_: Treating filtering as ownership of the Tag Option Catalog

**Tag Selector List**:
The **Tag Selector Part** that presents available **Tag Items** and creation affordances.
_Avoid_: Making List own the Tag Option Catalog

**Tag Selector Option**:
The **Tag Selector Part** that represents one selectable **Tag Item** in the option list.
_Avoid_: Treating Option as the selected Tag representation

**Selected Tag Option**:
A **Tag Selector Option** whose **Tag Item** is currently selected.
_Avoid_: Removing selected options from the option list by default

**Tag Selector Empty**:
The **Tag Selector Part** shown when the current search has no options or creation affordance.
_Avoid_: Treating Empty as a missing Tag Item

**Tag Item Creation**:
The consumer-owned process that turns a draft label into a new **Tag Item**.
_Avoid_: Having Tag Selector invent persistent Tag Item identity

**Tag Creation Route**:
An interaction path that requests **Tag Item Creation** from a draft label.
_Avoid_: Treating comma entry, paste entry, and create-option selection as separate creation semantics

**Create Tag Option**:
The option-list affordance that starts **Tag Item Creation** for the current draft label.
_Avoid_: Placing creation ahead of safer matching options by default

**Tag Draft Resolution**:
The rule that turns a draft label into either an existing **Tag Item** selection or **Tag Item Creation**.
_Avoid_: Creating a new Tag Item when the draft clearly identifies one existing option

**Tag Option Catalog**:
The consumer-owned set of **Tag Items** available for selection.
_Avoid_: Making Tag Selector the source of truth for all available tags

**Badge**:
The shadcn-compatible styling base that **Tag** extends.
_Avoid_: Treating Badge as the canonical Patternmode concept

## Relationships

### Aperto

- **Aperto** is a public Patternmode component, not just internal transition plumbing.
- The high-level **Aperto** component owns **Media Transitions**.
- A **Media Transition** may use a **Shared-Element Transition** between **Thumbnail** and **Expanded Media**.
- The **Primitive API** owns custom **Shared-Element Dialog** composition.
- A high-level **Media Transition** is opened by a **Thumbnail**.
- A **Shared-Element Dialog** is opened by a **Trigger**.
- A high-level **Media Transition** reveals **Expanded Media**.
- A **Shared-Element Dialog** reveals primitive **Content**.
- Opened Aperto surfaces use **Dialog** semantics without making Dialog the high-level product concept.
- A **Media Group** contains one or more **Media Items** addressed by `Aperto.Group`.
- A **Media Item** is either an **Image Media Item** or a **Video Media Item**.
- An open **Media Group** has at most one **Active Media Item**.
- **Expanded Media Aspect Ratio** follows the active **Media Item**, not the opening **Thumbnail** or **Shared-Element Transition** measurement.
- **Media Item Metadata** may include a **Media Item Title** and **Media Item Description**.
- **Media Navigation** changes the **Active Media Item** inside a **Media Group**.
- **Media Navigation** does not change route, page position, or collection membership.
- **Aperto Controls** exist inside opened Aperto content.
- **Media Navigation Controls** perform **Media Navigation**.
- A **Close Control** closes opened Aperto content.
- **Focus Return** targets the **Thumbnail** that opened the **Media Transition**, not the current **Active Media Item** after navigation.
- **Media Renderer Consistency** keeps internal transition rendering aligned with the same media renderer used by **Thumbnail** and **Expanded Media**.
- **Drag Dismissal** closes opened Aperto content without changing **Media Group** membership.

### Deck

- A **Deck** contains zero or more **Cards**.
- A **Deck** has at most one active **Card**.
- A **Stack** contains the active **Card** and zero or more following **Cards**.
- **CardStack** refers to the same component surface as **Deck**, but is not the canonical language.
- A **Finite Deck** becomes an **Exhausted Deck** after its final **Card** advances.
- Swipe directions in a **Finite Deck** are semantic-neutral unless consumer code assigns meaning to them.
- A **Swipe** is one possible input that causes an **Advance**.
- Keyboard and controlled-state changes can also cause an **Advance** without being a **Swipe**.
- New **Deck** APIs should expose `onAdvance` and `onAdvanceEnd`, not `onSwipe` or `onSwipeEnd`.
- In v0.1, an **Advance Input** is either drag or keyboard.
- Controlled `index` changes are not an **Advance Input** and should not emit advance callbacks by themselves.
- In v0.1, every **Advance** has an **Advance Direction** of left or right.

### Stacksheet

- A **Stacksheet** contains zero or more open **Sheets**.
- A **Sheet** is rendered by one **Panel**.
- A **Sheet Stack** orders **Sheets** from bottom to top.
- In normal operation, the **Active Sheet** is the **Top Sheet**.
- A **Sheet Stack** has at most one **Root Sheet**.
- A **Nested Sheet** exists because of stack position, not because its content is necessarily a child of another Sheet.
- The Back action is available when the **Active Sheet** is a **Nested Sheet**.
- Non-active **Sheets** may remain mounted or visible as stacked background context, but should not be interactive.
- Navigation actions operate on **Sheets**, not Panels.
- **Navigation** includes **Open**, **Push**, **Replace**, **Swap**, **Pop**, and **Close**.
- **Dismissal** can produce a **Close** or a **Pop**, but **Pop** is not inherently Dismissal.
- Modal or non-modal behavior belongs to the **Sheet Stack**, not to an individual **Sheet**.
- An **Overlay** may be shown or hidden within a **Modal Sheet Stack**; it is not the definition of modality.
- A **Drag** can produce a **Snap** or a **Swipe**.
- A **Swipe** can produce **Dismissal**.
- A **Snap** changes the **Active Sheet** resting position but does not change the **Sheet Stack**.
- **Classic Layout** and **Composable Layout** affect rendering responsibility, not **Navigation**, **Dismissal**, or modality.
- **Sheet Title** and **Sheet Description** parts provide accessibility relationships for the **Panel** in **Composable Layout**.

### Swatch

- A **Swatch** represents one **Visual Value**.
- A **Visual Value** can be a solid color, CSS background, child media, or weighted color stops.
- A **Transparent Visual Value** should use a visible backdrop affordance so transparency is distinguishable from white or absence.
- A **Transparency Backdrop** may be explicitly requested when transparency cannot be inferred from the **Visual Value**.
- Swatch APIs should use `transparencyBackdrop` for the **Transparency Backdrop** option.
- A **Weighted Palette Swatch** uses ratios to communicate color proportions, not decorative gradient direction.
- A **Weighted Palette Swatch** preserves the supplied color order.
- **Weighted Palette Swatch** ratios are non-negative weights; missing ratios default to equal weight.
- If all **Weighted Palette Swatch** ratios are zero or invalid, segments should fall back to equal weights.
- A **Selected Swatch** should remain readable regardless of fill color.
- An **Unavailable Swatch** communicates availability only; parent controls own disabled interaction semantics.
- An **Empty Swatch** communicates absence; it is distinct from an **Unavailable Swatch**.
- A **Swatch Label** belongs beside or around a **Swatch**, not inside the core representation.
- **Swatch Shape** is visual; it does not define the kind of **Visual Value** represented.
- A **Block Swatch** fills the caller's layout bounds; the surrounding layout owns its dimensions.
- A **Flat Swatch** is for exact color reading, especially data visualisation; it is not a general elevation or density state.
- A **Swatch Texture** changes representation fidelity without changing the underlying **Visual Value**.
- An **Atmosphere Texture** is qualitative color blending; use **Weighted Palette Swatch** when ratios must communicate proportions.
- A **Selectable Swatch** uses Swatch for representation while the parent control owns selection behavior.
- Swatch extensions should improve **Swatch Representation**, not own surrounding workflows.
- A **Swatch Remove Affordance** requests removal only; consumer code owns whether and how the collection changes.
- A **Boundary Handle** performs **Live Distribution Adjustment** so adjacent **Distribution Segments** resize during drag, not only after release.
- A **Distribution Display** may be read-only or selectable, but it does not perform **Live Distribution Adjustment**.
- A **Selectable Distribution Display** reports segment choice to its parent; the parent owns selected segment state.

### Status

- A **StatusMark** represents **Status Progress**.
- **Status Progress** is discrete, not a continuous progress-bar measurement.
- **Numeric Status Progress Input** is clamped and snapped to the nearest **Status Progress Step**.
- **Status Progress Resolution** is pure domain logic, not a React hook.
- Resolved **Status Progress** contains a progress amount and **Status Progress Step**, not symbolic variant metadata.
- A **Status Progress Step** names a discrete progress point such as null, empty, quarter, half, three-quarter, or full.
- StatusMark uses fixed quarter-step progress granularity.
- StatusMark should not keep symbolic glyph rendering for unrelated states.
- **Null Status Progress** means the progress is not yet known or not yet measured.
- **Null Status Progress** is explicit; it is not inferred from an omitted numeric input.
- Resolved **Null Status Progress** has no numeric progress amount.
- **Empty Status Progress** means the progress is known to be zero.
- **Complete Status Progress** means the progress is known to be complete.
- The API name for **Complete Status Progress** is the `full` **Status Progress Step**.
- A **StatusMark Variant** is either fill or border, not both.
- **StatusMark Tone** is visual emphasis only.
- **StatusMark Active Color** is shared by fill and border variants.
- **StatusMark Track Color** is inactive structure, not a second active progress color.
- **Null Status Progress** uses **StatusMark Track Color**, not **StatusMark Active Color**.
- **Null Status Progress** renders consistently across **StatusMark Variants**.
- **StatusMark Motion** describes transition behavior only.
- **StatusMark Size** affects layout scale only.
- StatusMark should not mix progress with unrelated exceptional, availability, or workflow states.

### ScrollFrame

- A **ScrollFrame** extends the Radix **Scroll Area Primitive** with Patternmode affordances.
- The package and public component should use **ScrollFrame**, not Scroll Area.
- The composed **ScrollFrame** should include required **Scroll Plumbing** by default.
- A **ScrollFrame** owns one measured **Viewport**.
- **Scroll Edge State** is derived from actual **Viewport** scroll position.
- **Edge Fades** and **Overflow-Aware Controls** derive from the same **Scroll Edge State**.
- **Edge Fades** may be enabled through composed props or rendered as **ScrollFrame Parts**.
- **Edge Fades** are passive and should not intercept pointer input.
- **Edge Fades** should use eased gradients and support custom fade colors.
- **Fade Color** may be global by default and overridden per edge when surrounding surfaces differ.
- A **ScrollFrame** should preserve Radix parity for vertical, horizontal, and both-axis scrolling.
- Patternmode affordances should be configured per **Scroll Axis** when both axes are present.
- `axes` should describe supported **Scroll Axes** on the composed **ScrollFrame**.
- `scrollbars` should describe **Scrollbar Visibility**, not whether required **Scroll Plumbing** exists.
- Hidden scrollbars should not disable native scrolling or edge measurement.
- **Scroll Movement Controls** move native scroll position; they do not own content pagination.
- **Scroll Movement Controls** are opt-in active UI.
- **Scroll Movement Controls** may be enabled through composed props or rendered as **ScrollFrame Parts**.
- Custom **ScrollFrame Parts** may use **ScrollFrame Context** for edge state and movement helpers.
- **Overflow-Aware Controls** should appear or enable only when useful for the measured **Viewport** state.
- **Control Visibility Policy** may differ for reserved inline controls and floating overlay controls.
- Initial **Scroll Movement Controls** use fixed **Scroll Steps**, not item-aware navigation.
- The default **Scroll Step** should be a **Page Step** that preserves some visible context.
- **Drag Scrolling** changes native **Viewport** scroll position; it does not perform item navigation, item reordering, or scrollbar dragging.
- A **Drag Scroll Surface** is inside the **Viewport**; it is not the same concept as the **Viewport** or Radix scrollbar parts.
- **Native Drag Scroll Implementation** keeps Drag Scrolling independent of Motion or gesture-library runtime contracts.
- **Drag Scroll Activation** separates ordinary content clicks and text-selection attempts from committed **Drag Scrolling**.
- **Drag Scroll Exclusion** covers form controls, editable content, and explicit no-drag descendants inside a drag-scroll surface.
- The default **Scroll Behavior** should be smooth unless reduced motion is requested.
- **Scroll Movement Controls** should not move focus by default.
- A **Named Scroll Region** may expose region semantics; unnamed **ScrollFrames** should avoid extra landmark noise.

### Tags

- A **Tag Selector** contains zero or more selected **Tags**.
- A **Tag Selector** renders **Tag Items** through **Tag Item Representations**.
- **Tag** is the default **Tag Item Representation**, not the only allowed representation.
- A **Selected Tag Renderer** customizes selected **Tag Item Representations**.
- A **Tag Option Renderer** customizes option-list **Tag Item Representations**.
- **Tag Selector** owns selection and removal behavior even when custom renderers provide the visual representation.
- **Classic Tag Selector Layout** is the default layout.
- **Composable Tag Selector Layout** exposes **Tag Selector Parts** for custom structure.
- **Tag Selector Parts** should follow the Stacksheet pattern: default layout first, composable parts when consumers need structure ownership.
- Public **Tag Selector Parts** should use the `TagSelector.*` namespace.
- The first public **Tag Selector Parts** are Root, Trigger, Content, Search, List, Option, and Empty.
- **Tag Selector Content** should be Popover-backed by default.
- Selected **Tag Items** belong in **Tag Selector Trigger** in the classic layout.
- The classic **Tag Selector Trigger** should use a horizontal **Selected Tag Scroll Region** by default.
- **Selected Tag Scroll Region** should use **ScrollFrame** rather than custom overflow or fade behavior.
- `@patternmode/tags` may depend directly on `@patternmode/scrollframe` for the classic **Selected Tag Scroll Region**.
- **Tag Selector Search** filters or drafts labels; it does not own selected Tag Item display.
- **Tag Search Query** may be controlled or uncontrolled.
- **Tag Option Filter** defaults to local label matching.
- Async search should update the consumer-owned **Tag Option Catalog** rather than returning options directly to **Tag Selector**.
- Selected **Tag Selector Options** stay visible in the option list.
- Activating a **Selected Tag Option** removes that **Tag Item** from selection.
- Activating an unselected **Tag Selector Option** adds that **Tag Item** to selection.
- **Last Tag Removal** applies when **Tag Selector Search** is focused and empty.
- A **Tag Item** has stable identity independent of its display label.
- **Tag Item Creation** returns a full **Tag Item** before it enters selection.
- **Tag Selector** may request **Tag Item Creation**, but does not generate stable Tag Item ids.
- **Tag Creation Routes** include explicit create-option selection and separator or paste entry.
- Every **Tag Creation Route** uses consumer-owned **Tag Item Creation**.
- **Create Tag Option** appears after matching options by default.
- **Tag Draft Resolution** selects an existing **Tag Item** when the draft exactly matches one option label.
- **Tag Draft Resolution** requests **Tag Item Creation** when the draft does not match an existing option label.
- Ambiguous exact-label matches require explicit option selection.
- **Tag Item Identity** is determined only by `id`.
- Duplicate Tag Item labels are allowed when **Tag Item Identity** differs.
- A **Disabled Tag Item** remains visible as an option but cannot be toggled on.
- Disabled state belongs to the current selector interaction, not to universal Tag Item availability.
- **Tag Selection Serialization** uses **Tag Item Identity** by default.
- **Tag Selection Order** follows the controlled value order.
- New selections append to the end of **Tag Selection Order**.
- A **Tag Option Catalog** is controlled by consumer state.
- **Tag Selector** controls selection interaction, not **Tag Option Catalog** ownership.
- The first Tag Selector version supports multiple selected **Tag Items** only.
- Public Tag Selector APIs should use `TagSelector`, not `TagsInput`.
- **Badge** provides styling compatibility for **Tag**, but does not own **Tag Selector** interaction.

## Example dialogue

### Aperto

> **Dev:** "Is Aperto just the internal media dialog implementation?"
> **Domain expert:** "No — **Aperto** is a first-class Patternmode component with its own public language."
>
> **Dev:** "Should every Aperto use case be called a Shared-Element Dialog?"
> **Domain expert:** "No — the high-level component is a **Media Transition**; **Shared-Element Dialog** belongs to the primitive API."
>
> **Dev:** "Should we call `Aperto.Primitive` Aperto Parts?"
> **Domain expert:** "No — call it the **Primitive API**. Parts already means something specific in Stacksheet and ScrollFrame."
>
> **Dev:** "Is the thumbnail-to-expanded motion a layout projection?"
> **Domain expert:** "Implementation may use projection, but the domain term is **Shared-Element Transition**."
>
> **Dev:** "Should the small clickable media be called a Trigger?"
> **Domain expert:** "No — in high-level Aperto it is a **Thumbnail**. **Trigger** is primitive anatomy."
>
> **Dev:** "Should opened high-level Aperto be documented as a Lightbox?"
> **Domain expert:** "No — call it **Expanded Media**. **Dialog** is the accessibility semantic, and **Content** is primitive anatomy."
>
> **Dev:** "Should expanded sizing come from the thumbnail frame or transition clone?"
> **Domain expert:** "No — use **Expanded Media Aspect Ratio**, derived from the active **Media Item** dimensions when available."
>
> **Dev:** "Is `Aperto.Group` a gallery component?"
> **Domain expert:** "No — it represents a **Media Group**. Aperto owns transition and navigation, not the surrounding gallery workflow."
>
> **Dev:** "Are the entries passed to Aperto assets?"
> **Domain expert:** "No — call each entry a **Media Item**. Storage and asset ownership belong outside Aperto."
>
> **Dev:** "Do next and previous controls page through a gallery?"
> **Domain expert:** "No — they perform **Media Navigation** within the current **Media Group**."
>
> **Dev:** "Is the visible item selected?"
> **Domain expert:** "No — call it the **Active Media Item**. Selection is a persistent choice state that Aperto does not own."
>
> **Dev:** "Should title and description be documented as captions?"
> **Domain expert:** "No — they are **Media Item Metadata**. Use **Media Item Title** and **Media Item Description** for the field-level terms."
>
> **Dev:** "Are next, previous, and close actions?"
> **Domain expert:** "Call them **Aperto Controls**. Next and previous are **Media Navigation Controls**; close is a **Close Control**."
>
> **Dev:** "Should drag-to-close be described as a swipe?"
> **Domain expert:** "No — call it **Drag Dismissal** unless Aperto later needs a separate completed-swipe concept."
>
> **Dev:** "Should close focus return to whichever media item is currently active?"
> **Domain expert:** "No — **Focus Return** restores focus to the **Thumbnail** that opened the **Media Transition**, without scrolling the page."
>
> **Dev:** "Should the animated transition clone use raw media elements when custom renderers are supplied?"
> **Domain expert:** "No — preserve **Media Renderer Consistency** across **Thumbnail**, **Expanded Media**, and internal transition rendering while keeping the clone hidden from accessibility."

### Deck

> **Dev:** "Should the docs call this a CardStack because it renders layered cards?"
> **Domain expert:** "No — call the component a **Deck**. The **Stack** is just the visible arrangement."
>
> **Dev:** "Does swiping right mean accepting a card?"
> **Domain expert:** "No — the primitive only advances the **Finite Deck**. Consumers can interpret directions as accept or reject."
>
> **Dev:** "Should keyboard arrows fire `onSwipe`?"
> **Domain expert:** "No — they should fire the canonical **Advance** event because no swipe occurred."
>
> **Dev:** "Should a controlled `index` prop update emit an advance event?"
> **Domain expert:** "No — controlled state is already external intent, not an input generated by the **Deck**."
>
> **Dev:** "Does direction mean the user's intent or where the card goes?"
> **Domain expert:** "Direction means where the active **Card** exits."

### Stacksheet

> **Dev:** "When a user opens settings, are they opening a Panel?"
> **Domain expert:** "No — they open a **Sheet**. The **Panel** is the rendered surface that presents it."
>
> **Dev:** "Does back navigation remove a Panel?"
> **Domain expert:** "No — navigation actions operate on **Sheets** in the **Sheet Stack**."
>
> **Dev:** "If the user goes back from a nested Sheet, is that a Dismissal?"
> **Domain expert:** "Only if the input expresses close intent. The resulting operation may be **Pop**, but ordinary stack movement is **Navigation**."
>
> **Dev:** "Should a test say the Top Sheet is interactive?"
> **Domain expert:** "Say the **Active Sheet** is interactive. Top Sheet is implementation shorthand."
>
> **Dev:** "If a Sheet is nested, does that mean it belongs to the previous Sheet?"
> **Domain expert:** "No — **Nested Sheet** only describes its position above the **Root Sheet** in the **Sheet Stack**."
>
> **Dev:** "If there is no overlay, is the stack non-modal?"
> **Domain expert:** "Not necessarily. **Overlay** is visual; **Modal Sheet Stack** describes the interaction contract."
>
> **Dev:** "Should every drag be called a Swipe?"
> **Domain expert:** "No — **Drag** is the input. **Swipe** is only the completed drag that causes **Dismissal**."
>
> **Dev:** "Does Composable Layout change how sheets navigate?"
> **Domain expert:** "No — it only changes who owns the **Sheet** structure and **Panel** chrome."

### Tags

> **Dev:** "Is this component a TagsInput?"
> **Domain expert:** "No — the canonical Patternmode concept is a **Tag Selector**. An input may be part of the implementation, but the pattern is selecting **Tags**."
>
> **Dev:** "Should Badge be the public concept because Tag extends shadcn Badge?"
> **Domain expert:** "No — **Badge** is the compatibility base. **Tag** is the Patternmode representation primitive."
>
> **Dev:** "Does every selected item have to render as Patternmode's Tag component?"
> **Domain expert:** "No — **Tag** is the convenient default **Tag Item Representation**. Consumers can provide a different representation while **Tag Selector** still owns selection behavior."
>
> **Dev:** "If a consumer customizes the option row, do they also own selecting it?"
> **Domain expert:** "No — the **Tag Option Renderer** customizes rendering. **Tag Selector** still supplies and owns the selection behavior."
>
> **Dev:** "Should Tag Selector only expose render props for customization?"
> **Domain expert:** "No — follow Stacksheet. Use **Classic Tag Selector Layout** by default, and expose **Tag Selector Parts** for a **Composable Tag Selector Layout**."
>
> **Dev:** "Should composable parts live in a separate TagSelectorParts export?"
> **Domain expert:** "No — public **Tag Selector Parts** use the `TagSelector.*` namespace."
>
> **Dev:** "Should we expose Clear, Group, and CreateOption parts immediately?"
> **Domain expert:** "No — the first public **Tag Selector Parts** are Root, Trigger, Content, Search, List, Option, and Empty."
>
> **Dev:** "Can the option list just be an absolutely positioned div inside the input?"
> **Domain expert:** "No — **Tag Selector Content** should be Popover-backed by default, with Search and List inside it."
>
> **Dev:** "Should selected tags live inside the search input?"
> **Domain expert:** "No — selected **Tag Items** belong in **Tag Selector Trigger**. **Tag Selector Search** is for filtering or drafting labels."
>
> **Dev:** "Should selected tags wrap in the classic Trigger by default?"
> **Domain expert:** "No — the classic Trigger uses a horizontal **Selected Tag Scroll Region**, backed by **ScrollFrame**."
>
> **Dev:** "Should ScrollFrame be optional so Tags has no package dependency?"
> **Domain expert:** "No — `@patternmode/tags` can depend directly on `@patternmode/scrollframe` because the classic Trigger uses ScrollFrame behavior."
>
> **Dev:** "Should `onSearch` return the next options?"
> **Domain expert:** "No — **Tag Search Query** changes may update the consumer-owned **Tag Option Catalog**, but **Tag Selector** does not own catalog replacement."
>
> **Dev:** "Should selected options disappear from the list?"
> **Domain expert:** "No — a **Selected Tag Option** stays visible with selected state and toggles off when activated."
>
> **Dev:** "If Search is empty and the user presses Backspace, should nothing happen?"
> **Domain expert:** "No — **Last Tag Removal** removes the final selected **Tag Item**."
>
> **Dev:** "Can selected tags just be strings?"
> **Domain expert:** "No — **Tag Selector** state should use **Tag Items** with stable identity, so labels can change without changing selection identity."
>
> **Dev:** "If two tags have the same label, are they duplicates?"
> **Domain expert:** "Only if they share **Tag Item Identity**. Labels are display text; `id` determines identity."
>
> **Dev:** "Should unavailable-looking options disappear from the list?"
> **Domain expert:** "No — a **Disabled Tag Item** can remain visible in the **Tag Option Catalog**, but cannot be selected through the current **Tag Selector**."
>
> **Dev:** "Should hidden form inputs submit tag labels?"
> **Domain expert:** "No — **Tag Selection Serialization** uses **Tag Item Identity** by default."
>
> **Dev:** "Should selected tags be sorted to match the option list?"
> **Domain expert:** "No — **Tag Selection Order** follows the controlled value order."
>
> **Dev:** "When a user creates a new tag, can the selector just make an id from the label?"
> **Domain expert:** "No — **Tag Item Creation** belongs to the consumer. The selector receives the resulting **Tag Item** and selects it."
>
> **Dev:** "Can creation happen through both the create row and comma or paste entry?"
> **Domain expert:** "Yes — those are both **Tag Creation Routes**, and both use consumer-owned **Tag Item Creation**."
>
> **Dev:** "Should the create option appear before matching options?"
> **Domain expert:** "No — **Create Tag Option** appears after matching options by default."
>
> **Dev:** "If typed text exactly matches an existing option, should Enter create a duplicate?"
> **Domain expert:** "No — **Tag Draft Resolution** selects the existing **Tag Item** when the draft exactly matches one option label."
>
> **Dev:** "Should Tag Selector edit, delete, or reorder all available tags?"
> **Domain expert:** "No — the **Tag Option Catalog** is consumer-owned. **Tag Selector** controls selection interaction, not tag catalog management."
>
> **Dev:** "Should Tag Selector also support single-select?"
> **Domain expert:** "Not initially. **Tag Selector** is multi-select; single-select can be introduced later if a concrete scenario requires it."

## Flagged ambiguities

### System

- `@patternmode/system` could be treated as a first-class Patternmode component — resolved: it remains implementation support until it exports domain-level design primitives.

### Aperto

- "Aperto" could be treated as a private media/dialog implementation detail — resolved: **Aperto** is a first-class Patternmode component with its own public domain language.
- "Shared-element dialog" could describe both media-first and primitive usage — resolved: **Media Transition** is canonical for high-level Aperto; **Shared-Element Dialog** is canonical for `Aperto.Primitive`.
- "Parts" could conflict with Stacksheet and ScrollFrame terminology — resolved: use **Primitive API** for `Aperto.Primitive`.
- "Projection" is Motion implementation language and "Expansion" suggests only size change — resolved: use **Shared-Element Transition** for visual continuity between **Thumbnail** and **Expanded Media**.
- "Preview" could mean compact media, expanded media, or a transition state — resolved: use **Thumbnail** for high-level media and **Trigger** for primitive dialog anatomy.
- "Lightbox", "Dialog", and "Content" could all describe the opened state — resolved: use **Expanded Media** for high-level Aperto, **Content** for primitive anatomy, and **Dialog** for accessibility semantics.
- "Frame", "thumbnail ratio", and transition measurement could imply final expanded sizing follows the visual bridge — resolved: use **Expanded Media Aspect Ratio** from the active **Media Item** dimensions when available.
- "Group" is API shorthand and "Gallery" implies a broader browsing workflow — resolved: use **Media Group** for ordered media handled by `Aperto.Group`.
- "Asset" implies storage ownership and "Source" only names the input URL/file — resolved: use **Media Item**, with **Image Media Item** and **Video Media Item** when type-specific language is needed.
- "Selected" implies persistent choice state and "Open" mixes dialog state with item identity — resolved: use **Active Media Item** for the item currently shown as **Expanded Media**.
- "Caption" could imply a single rendered block and "Label" collides with accessible naming — resolved: use **Media Item Metadata**, with **Media Item Title** and **Media Item Description** for field-level terms.
- "Navigation", "Browsing", and "Paging" could imply route, page, or gallery ownership — resolved: use **Media Navigation** for moving between items in a **Media Group**.
- "Affordance" is vague and "Action" suggests command semantics beyond the rendered UI — resolved: use **Aperto Control**, **Close Control**, and **Media Navigation Control**.
- "Swipe" could conflict with Stacksheet and Deck gesture language — resolved: use **Drag Dismissal** for Aperto drag-to-close behavior.
- "Autofocus", "return focus", and "active item focus" could imply generic dialog behavior or target the wrong thumbnail after navigation — resolved: use **Focus Return** for restoring focus to the opening **Thumbnail** without scrolling.
- "Transition clone" could sound like public anatomy and "fallback media" could ignore consumer rendering — resolved: use **Media Renderer Consistency** while keeping transition rendering internal and accessibility-hidden.

### Deck

- "CardStack" was used for both the component and its visual arrangement — resolved: **Deck** is the component; **Stack** is the visual arrangement; **CardStack** is only an alias.
- "finite" could imply decision semantics — resolved: a **Finite Deck** only advances until exhausted; app code owns any accept/reject meaning.
- The current implementation uses `onSwipe` for drag and keyboard progression — resolved domain language says the canonical event is **Advance**, with **Swipe** reserved for drag gesture input.
- `onSwipe` was considered as a discoverability alias — resolved: because the package is new, do not preserve the alias; use only **Advance** callback language.
- "programmatic" advance input was considered — resolved: exclude it until the package exposes an imperative advance API.
- "Swipe Direction" was considered — resolved: use **Advance Direction**, defined as the active **Card** exit side.

### Stacksheet

- "Sheet" and "Panel" were used interchangeably — resolved: **Sheet** is the domain object; **Panel** is only the rendered surface.
- "Stack" conflicts with Deck language — resolved: use **Sheet Stack** when discussing Stacksheet ordering.
- "Dismiss" could mean any removal from the stack — resolved: **Dismissal** means close intent; **Pop** remains a navigation operation unless caused by close intent.
- "Top Sheet" and "Active Sheet" were both plausible — resolved: **Active Sheet** is canonical user-facing language; **Top Sheet** is implementation shorthand.
- "Nested" could imply content hierarchy — resolved: **Nested Sheet** means any Sheet above the **Root Sheet** by stack position.
- "Modal" could be reduced to overlay visibility — resolved: **Modal Sheet Stack** is an interaction contract; **Overlay** is only one optional visual/input layer.
- "Swipe" could describe all pointer movement — resolved: **Drag** is continuous input; **Swipe** is a completed drag that causes **Dismissal**.
- "Snap" could be confused with stack navigation — resolved: **Snap** only changes the **Active Sheet** resting position.
- "Composable" could sound like a different navigation model — resolved: **Composable Layout** only changes rendering responsibility.

### Swatch

- "Swatch" could mean only a circular color chip — resolved: a **Swatch** represents a **Visual Value**, which can include gradients, child media, and weighted palettes.
- "Material" could describe visual sources broadly — resolved: use **Visual Value** unless physical surface properties are intended.
- "Transparent" could look identical to white or empty space — resolved: **Transparent Visual Value** requires a visible backdrop affordance.
- CSS alpha cannot be inferred reliably for every visual source — resolved: expose an explicit **Transparency Backdrop** concept and treat detection as best-effort only.
- "Gradient" and "weighted palette" can look similar — resolved: use **Weighted Palette Swatch** when stops represent ratios.
- Weighted palette colors could be sorted by dominance — resolved: preserve supplied order; consumers sort before passing colors when needed.
- Negative or invalid weighted palette ratios could produce reversed segments — resolved: treat ratios as non-negative weights and fall back to equal weights when no positive weights remain.
- Shape could imply a specific visual value type — resolved: shape is a visual choice, not a semantic distinction.
- "Unavailable" could mean disabled, missing, invalid, or out of stock — resolved: **Unavailable Swatch** means the **Visual Value** exists but is not currently available for use.
- An unresolved or absent value could appear as a neutral color — resolved: use **Empty Swatch** for absent **Visual Values**.
- Labels, token names, and contrast scores could be rendered inside Swatch — resolved: use **Swatch Label** outside the core **Swatch** representation.
- "Remove" could imply Swatch owns collection management — resolved: **Swatch Remove Affordance** only requests removal; consumer code owns the resulting workflow.
- "Swatch" could imply a picker control — resolved: **Swatch** is a representation primitive; selection behavior belongs to a parent control.
- "Extension" could mean adding workflow features — resolved: extend **Swatch Representation** fidelity rather than copying, editing, sorting, or picker behavior.
- "Drag adjustment" could imply commit-only updates after release — resolved: use **Live Distribution Adjustment** for continuous segment resizing while a **Boundary Handle** is dragged.
- "Interactive distribution" could mean segment selection or value editing — resolved: **Distribution Bar** edits values; **Selectable Distribution Display** only chooses a segment.
- "Flat" could mean generally plain or low emphasis — resolved: **Flat Swatch** means exact-color rendering without decorative shadow or scrim.
- "Atmosphere" could be mistaken for a **Weighted Palette Swatch** — resolved: **Atmosphere Texture** is qualitative blending, not ratio communication.

### Status

- "Status" could imply a general symbolic state badge for blocked, pending, paused, unavailable, unknown, or complete states — resolved: **StatusMark** represents **Status Progress** only.
- "ProgressMark" could be more literal but imply a miniature progress bar — resolved: keep **StatusMark** as the component name and define it narrowly as a compact mark for **Status Progress**.
- "Null" and "empty" could both describe absence — resolved: **Null Status Progress** means progress is not yet known or measured; **Empty Status Progress** means known zero progress.
- `zero` could be a literal API name for 0% progress — resolved: use `empty` as the **Status Progress Step** name because it describes the visual mark, while the glossary preserves known-zero semantics.
- "Complete" could be treated as a symbolic success state — resolved: **Complete Status Progress** is the full progress step, not a separate success badge.
- Lucide-compatible geometry could be documented as part of StatusMark identity — resolved: StatusMark uses Patternmode-authored geometry and should not mention Lucide.
- `complete` and `full` could both name the 100% step — resolved: `full` is the API step; complete remains concept language only.
- The `status` prop could sound like a general state input — resolved: `status` accepts only named **Status Progress Steps**, while `value` accepts numeric progress input.
- Numeric progress input could imply exact percentage rendering — resolved: **StatusMark** snaps numeric input to the nearest **Status Progress Step**; exact continuous progress belongs in a different component.
- Configurable segment counts could make StatusMark behave like a gauge — resolved: StatusMark uses fixed quarter-step progress granularity.
- A resolver hook could imply React state — resolved: expose **Status Progress Resolution** as a pure function such as `resolveStatusProgress`.
- Resolved state could include symbolic variant metadata from the old API — resolved: remove variant metadata because StatusMark is progress-only.
- Symbolic glyph rendering could remain as unused internal code — resolved: remove it because StatusMark is progress-only.
- Null could be resolved as numeric zero for rendering convenience — resolved: resolved **Null Status Progress** has no numeric progress amount.
- Missing numeric input could imply **Null Status Progress** — resolved: null progress must be requested explicitly as a **Status Progress Step**.
- Independent `fill` and `border` booleans allow muddy combinations — resolved: **StatusMark Variant** is a single fill-or-border choice.
- `success`, `warning`, and `danger` tones suggest semantic states — resolved: **StatusMark Tone** should be limited to visual emphasis such as neutral, accent, and muted.
- `fillColor` could make fill mode communicate a different active state than border mode — resolved: use one **StatusMark Active Color** and separate only inactive **StatusMark Track Color**.
- Null progress could look active if it uses the active color — resolved: **Null Status Progress** uses **StatusMark Track Color**.
- Null progress could change meaning across fill and border variants — resolved: **Null Status Progress** keeps the same dashed placeholder mark in every **StatusMark Variant**.
- Motion options could be mistaken for state semantics — resolved: **StatusMark Motion** controls transition behavior only.

### ScrollFrame

- "Scroll Area" could mean any scrollable page region or the underlying Radix primitive — resolved: **ScrollFrame** is the canonical Patternmode component name.
- The package could stay `@howells/scroll-area` while the concept is **ScrollFrame** — resolved: rename the public package and component to **ScrollFrame**.
- "ScrollFrame" could mean reimplementing scroll anatomy — resolved: Radix owns the **Scroll Area Primitive**; Patternmode layers measurement, fades, and movement controls.
- Forgetting an invisible primitive part can break scrolling — resolved: the composed **ScrollFrame** owns required **Scroll Plumbing**.
- Fades and movement controls could duplicate measurement logic — resolved: derive both from shared **Scroll Edge State**.
- Fades could be only automatic or only manually composed — resolved: support both composed props and **ScrollFrame Parts**.
- Fades could block interaction with scroll content — resolved: **Edge Fades** are passive and non-interactive.
- Linear fades can show visible banding — resolved: use **Eased Edge Fades** with custom fade colors.
- Fade color could be one-size-fits-all — resolved: support a global **Fade Color** with per-edge overrides.
- Single-axis measurement would fall short of Radix parity — resolved: **ScrollFrame** supports vertical, horizontal, and both-axis scrolling, with affordances configured per **Scroll Axis**.
- Scrollbar visibility could be confused with structural omission — resolved: `scrollbars` controls presentation only; **Scroll Plumbing** remains mounted.
- Previous/next controls could imply carousel-style item navigation — resolved: **Scroll Movement Controls** initially use fixed **Scroll Steps**.
- Movement controls could imply item focus management — resolved: **Scroll Movement Controls** change scroll position, not active item focus.
- Movement controls could appear even when content fits — resolved: use **Overflow-Aware Controls** driven by measured **Viewport** state.
- Hidden versus disabled controls depends on placement — resolved: make it a **Control Visibility Policy**, not a fixed semantic rule.
- Controls could be only automatic or only manually composed — resolved: support both composed props and **ScrollFrame Parts**.
- Custom controls need shared movement state — resolved: expose **ScrollFrame Context** through a scoped hook.
- "Panning", "grabbing", "swipe scrolling", and "kinetic scrolling" could imply canvas movement, gesture momentum, or item movement — resolved: use **Drag Scrolling** for pointer-drag changes to **Viewport** scroll position after activation.
- "Drag surface" could be confused with the **Viewport** or scrollbar parts — resolved: use **Drag Scroll Surface** for the content surface that listens for pointer movement inside the **Viewport**.
- "Motion drag" could imply a dependency on `motion/react` gesture semantics — resolved: use **Native Drag Scroll Implementation** with pointer events and native **Viewport** scroll offsets.
- "Dragging" could start on pointer down and break normal content clicks — resolved: use **Drag Scroll Activation** before suppressing clicks, clearing selection, or setting dragging state.
- "Ignore selector" could sound like an implementation-only escape hatch — resolved: use **Drag Scroll Exclusion** for descendants that keep their own pointer interaction inside a drag-scroll surface.
- Page movement could jump exactly one viewport — resolved: default **Page Step** should move most of the **Viewport** while preserving context.
- Smooth movement could ignore motion preferences — resolved: default **Scroll Behavior** respects reduced motion.
- Scroll containers could create noisy unnamed landmarks — resolved: only a **Named Scroll Region** should expose region semantics by default.
- "Fade" could be static decoration — resolved: **Edge Fade** visibility follows measured **Viewport** edge state.

### Tags

- "TagsInput" could imply a plain input field rather than the reusable interaction pattern — resolved: use **Tag Selector** as the canonical concept and `TagSelector` as the public API name, with no alias.
- "Badge" could be mistaken for the Patternmode domain component because **Tag** extends a shadcn-compatible badge base — resolved: **Badge** is a compatibility base; **Tag** is the default representation.
- "Tag" could be mistaken for the only renderable form inside **Tag Selector** — resolved: consumers may provide custom **Tag Item Representations**.
- Custom rendering could be mistaken for the whole composability story — resolved: **Selected Tag Renderer** and **Tag Option Renderer** customize representation, while **Composable Tag Selector Layout** uses **Tag Selector Parts** for structure ownership.
- Plain strings could seem sufficient for tag state — resolved: **Tag Selector** uses identity-bearing **Tag Items**.
- Label matching could be used for equality — resolved: **Tag Item Identity** is determined only by `id`.
- Disabled options could be confused with domain availability — resolved: **Disabled Tag Item** describes current selector interaction state.
- Hidden form values could submit labels — resolved: **Tag Selection Serialization** submits **Tag Item Identity** by default.
- Selected tags could be sorted by catalog order — resolved: **Tag Selection Order** follows the controlled value order.
- Creation could be treated as label normalization inside **Tag Selector** — resolved: **Tag Item Creation** is consumer-owned because stable identity comes from outside the selector.
- Create-option selection, separator entry, and paste entry could diverge — resolved: they are all **Tag Creation Routes** backed by the same **Tag Item Creation** contract.
- Create option could be ordered before matching options — resolved: **Create Tag Option** appears after matching options by default.
- Exact draft matches could create duplicate tags — resolved: **Tag Draft Resolution** selects the matching option when exactly one match exists.
- Tag Selector could grow into a local tag-management system — resolved: the **Tag Option Catalog** remains consumer-owned.
- Single-select support could blur Tag Selector with Combobox or Select — resolved: first-version **Tag Selector** is multi-select only.
- Selected tags could wrap by default or use custom horizontal overflow — resolved: classic **Tag Selector Trigger** uses a horizontal **Selected Tag Scroll Region** backed by **ScrollFrame**.
- ScrollFrame could be optional to keep the package smaller — resolved: `@patternmode/tags` may depend directly on `@patternmode/scrollframe` for classic Trigger overflow behavior.
- Async search could make Tag Selector own option loading — resolved: **Tag Search Query** is controllable, while the **Tag Option Catalog** remains consumer-owned.
- Selected options could be filtered out of the option list — resolved: **Selected Tag Options** stay visible and toggle off.
- Backspace could be treated only as text editing — resolved: empty **Tag Selector Search** performs **Last Tag Removal**.
