# Patternmode

Patternmode is a catalog of focused React interface components whose names should describe reusable interaction patterns, not implementation details.

## Language

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

## Relationships

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

## Example dialogue

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
