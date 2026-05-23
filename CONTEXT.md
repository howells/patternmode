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

**Media Navigation Control**:
An **Aperto Control** that performs **Media Navigation**.
_Avoid_: Paging Control as the canonical term

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
An optional control that requests removal of the **Visual Value** represented by a **Swatch**.
_Avoid_: Treating removal as collection management owned by Swatch

**Selectable Swatch**:
A **Swatch** composed inside a separate interactive selection control.
_Avoid_: Making Swatch own picker interaction or selection state

**Swatch Representation**:
The **Visual Value** or availability state shown by a **Swatch**.
_Avoid_: Treating representation as editing, copying, sorting, or picker workflow

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
- **Media Item Metadata** may include a **Media Item Title** and **Media Item Description**.
- **Media Navigation** changes the **Active Media Item** inside a **Media Group**.
- **Media Navigation** does not change route, page position, or collection membership.
- **Aperto Controls** exist inside opened Aperto content.
- **Media Navigation Controls** perform **Media Navigation**.
- A **Close Control** closes opened Aperto content.
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
- Swatch shape is visual; it does not define the kind of **Visual Value** represented.
- A **Selectable Swatch** uses Swatch for representation while the parent control owns selection behavior.
- Swatch extensions should improve **Swatch Representation**, not own surrounding workflows.
- A **Swatch Remove Affordance** requests removal only; consumer code owns whether and how the collection changes.

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
- The default **Scroll Behavior** should be smooth unless reduced motion is requested.
- **Scroll Movement Controls** should not move focus by default.
- A **Named Scroll Region** may expose region semantics; unnamed **ScrollFrames** should avoid extra landmark noise.

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
- "Group" is API shorthand and "Gallery" implies a broader browsing workflow — resolved: use **Media Group** for ordered media handled by `Aperto.Group`.
- "Asset" implies storage ownership and "Source" only names the input URL/file — resolved: use **Media Item**, with **Image Media Item** and **Video Media Item** when type-specific language is needed.
- "Selected" implies persistent choice state and "Open" mixes dialog state with item identity — resolved: use **Active Media Item** for the item currently shown as **Expanded Media**.
- "Caption" could imply a single rendered block and "Label" collides with accessible naming — resolved: use **Media Item Metadata**, with **Media Item Title** and **Media Item Description** for field-level terms.
- "Navigation", "Browsing", and "Paging" could imply route, page, or gallery ownership — resolved: use **Media Navigation** for moving between items in a **Media Group**.
- "Affordance" is vague and "Action" suggests command semantics beyond the rendered UI — resolved: use **Aperto Control**, **Close Control**, and **Media Navigation Control**.
- "Swipe" could conflict with Stacksheet and Deck gesture language — resolved: use **Drag Dismissal** for Aperto drag-to-close behavior.

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
- Page movement could jump exactly one viewport — resolved: default **Page Step** should move most of the **Viewport** while preserving context.
- Smooth movement could ignore motion preferences — resolved: default **Scroll Behavior** respects reduced motion.
- Scroll containers could create noisy unnamed landmarks — resolved: only a **Named Scroll Region** should expose region semantics by default.
- "Fade" could be static decoration — resolved: **Edge Fade** visibility follows measured **Viewport** edge state.
