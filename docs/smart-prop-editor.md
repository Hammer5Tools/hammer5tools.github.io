# SmartProp Editor

A visual editor for creating and editing `.vsmart` / `.vdata` SmartProp files — the procedural prop-placement system used by Counter-Strike 2.

## Overview

SmartProps define how props are placed, scattered, scaled, tinted, and filtered in the world. Each `.vsmart` file is a tree of **Elements** driven by **Modifiers** (operators and filters), and optionally exposed to the user through **Variables**. The editor replaces the raw KV3 text workflow with a structured UI that compiles the file on save.

## Interface Layout

The editor window has three main areas:

- **Explorer dock** (left) — file browser rooted at your addon's content folder. Use it to navigate and open `.vsmart` / `.vdata` files without leaving the editor.
- **Document tab bar** (center) — each open file gets its own tab. Tabs show `*filename` when there are unsaved changes.
- **Document panel** (center, per tab) — split into the Hierarchy, Properties, Variables, and Choices panels described below.

## Explorer Dock

The Explorer dock sits on the left side and is dockable/floatable. It provides three toolbar buttons:

| Button | Shortcut | Action |
|---|---|---|
| **Open** | — | Open the selected file from the explorer into a new tab |
| **Save** | `Ctrl+S` | Save and compile the active document |
| **New file** | `Ctrl+N` | Create a new blank `.vsmart` document in a new tab |

A second toolbar row adds:

| Button | Shortcut | Action |
|---|---|---|
| **Save as** | `Ctrl+Shift+S` | Save the active document to a new path |
| **Open as** | `Ctrl+O` | Open a file via the system file dialog |
| **Realtime save** | — | Checkbox; auto-saves all modified documents on a timer (interval configurable in Settings) |

> [!NOTE]
> When **Realtime save** is active, the window can optionally become semi-transparent (configurable in Settings → SmartPropEditor → `transparency_window`).

## Document Tabs

Each tab is an independent document. Switching tabs switches the active Hierarchy, Properties, Variables, and Choices panels. Clicking the `×` on a tab closes the document — you will be prompted if there are unsaved changes.

Saving a file also triggers compilation via the CS2 resource compiler. The file must have a valid `.vsmart` or `.vdata` extension.

## Hierarchy Panel

The hierarchy is a tree of **Elements**. Each element is an instance of a `CSmartPropElement_*` class and can have child elements, modifiers (operators and filters), and selection criteria attached to it.

### Element Types

| Element | Class | Description |
|---|---|---|
| **Group** | `CSmartPropElement_Group` | Container for organizing child elements |
| **ModifyState** | `CSmartPropElement_ModifyState` | Applies modifiers to the current transform state without placing anything |
| **SmartProp** | `CSmartPropElement_SmartProp` | Embeds another `.vsmart` file by reference |
| **Model** | `CSmartPropElement_Model` | Places a static prop model |
| **ModelEntity** | `CSmartPropElement_ModelEntity` | Places a model as a dynamic entity |
| **PropPhysics** | `CSmartPropElement_PropPhysics` | Places a physics prop with mass, health, and motion settings |
| **PropDynamic** | `CSmartPropElement_PropDynamic` | Places an animated dynamic prop |
| **PlaceInSphere** | `CSmartPropElement_PlaceInSphere` | Scatters children across a sphere or disc volume |
| **PlaceMultiple** | `CSmartPropElement_PlaceMultiple` | Repeats children a set number of times |
| **PlaceOnPath** | `CSmartPropElement_PlaceOnPath` | Distributes children along a path with configurable spacing |
| **FitOnLine** | `CSmartPropElement_FitOnLine` | Fits children between two points with scale/orientation options |
| **PickOne** | `CSmartPropElement_PickOne` | Randomly (or sequentially) selects one child to place |
| **Grid** | `CSmartPropElement_Layout2DGrid` | Arranges children in a 2D grid |
| **BendDeformer** | `CSmartPropElement_BendDeformer` | Bends child geometry along an arc |
| **MidpointDeformer** | `CSmartPropElement_MidpointDeformer` | Deforms children along a spline midpoint curve |

### Hierarchy Context Menu

Right-clicking an element in the hierarchy opens a context menu with actions to add child elements, add modifiers (operators), add filters, add selection criteria, duplicate, delete, group selected, and bulk-import models.

### Hierarchy Keyboard Shortcuts

| Key | Action |
|---|---|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Redo |
| `Ctrl+C` | Copy selected element(s) |
| `Ctrl+V` | Paste element(s) under selected parent |
| `Ctrl+D` | Duplicate selected element(s) |
| `Delete` | Delete selected element(s) |
| `Ctrl+G` | Group selected elements into a new Group |

> [!TIP]
> The undo system tracks per-property edits, structural changes (add/remove/reorder modifiers and criteria), variable edits, and choices edits as separate history entries. Consecutive edits to the *same property* of the *same element* are merged into a single undo step.

## Properties Panel

Selecting an element in the hierarchy shows its properties in the Properties panel. Properties are organized into collapsible groups:

- **Element properties** — the core fields of the selected element class (e.g. `m_sModelName`, `m_nCountMin`, `m_flSpacing`).
- **Modifiers** — a list of attached operators and filters. Each can be expanded to edit its own fields. Reordering is supported via drag-and-drop.
- **Selection Criteria** — conditions that control when/whether this element is selected by a parent `PickOne` or `PlaceOnPath`.

Property fields support variable binding — click the variable icon next to a field to bind it to a named variable defined in the Variables panel.

### Operators

Operators transform the current placement state. They run in the order they appear under **Modifiers**.

| Operator | Description |
|---|---|
| **Rotate** | Applies a fixed rotation |
| **RandomRotation** | Applies a random rotation within min/max bounds |
| **RandomRotationSnapped** | Random rotation snapped to an increment on a chosen axis |
| **ResetRotation** | Zeroes out pitch/yaw/roll selectively |
| **RotateTowards** | Orients toward a target position |
| **SetOrientation** | Sets forward and up vectors explicitly |
| **Scale** | Applies a fixed uniform scale |
| **RandomScale** | Random scale within min/max, with optional snap |
| **ResetScale** | Resets scale to 1 |
| **Translate** | Applies a fixed position offset |
| **RandomOffset** | Applies a random position offset within a bounding range |
| **SetPosition** | Sets an absolute world/element-space position |
| **SetTintColor** | Tints the prop color; supports multiply and other blend modes |
| **MaterialOverride** | Replaces materials on the model |
| **MaterialTint** | Tints a specific material by name or index |
| **TraceInDirection** | Drops the element onto geometry via a raycast in a direction |
| **Trace** | Casts a ray from a custom origin to find a surface |
| **TraceToPoint** | Traces toward a specific point |
| **TraceToLine** | Traces toward the closest point on a line segment |
| **SaveState / RestoreState** | Saves and restores a named transform state |
| **SavePosition / SaveDirection / SaveScale / SaveColor / SaveSurfaceNormal** | Writes the current value into a named variable |
| **SetVariable** | Sets a named variable to an explicit value |
| **SetMaterialGroupChoice** | Assigns a material group choice variable |
| **CreateSizer** | Creates a box-sizer handle with per-axis constraints and output variables |
| **CreateRotator** | Creates a rotator gizmo handle with axis, limits, and output variable |
| **CreateLocator** | Creates a free-transform gizmo handle |
| **ComputeDotProduct3D** | Computes a dot product between two vectors and writes to a variable |
| **ComputeCrossProduct3D** | Computes a cross product and writes to a variable |
| **ComputeDistance3D** | Computes the distance between two points and writes to a variable |
| **ComputeNormalizedVector3D** | Normalizes a vector and writes to a variable |
| **ComputeProjectVector3D** | Projects a vector onto a plane or axis |
| **ComputeVectorBetweenPoints3D** | Computes the vector from point A to point B |
| **Comment** | A non-functional note (Hammer5Tools extension) |

> [!WARNING]
> Operators marked `_WARN_NOT_VERIFIED` in the source have been added to the editor but may not yet be fully tested against all CS2 versions. Use them with care.

### Filters

Filters are attached in **Modifiers** and control whether an element is placed at all.

| Filter | Description |
|---|---|
| **Probability** | Places the element with a given probability (0–1) |
| **Expression** | Evaluates a KV3 expression; element is placed only when the result is truthy |
| **SurfaceAngle** | Requires the surface slope to be within a min/max angle range |
| **SurfaceProperties** | Allows or disallows placement based on named surface properties |
| **VariableValue** | Compares a named variable against a value using `EQUAL`, `LESS`, `GREATER`, etc. |
| **Comment** | A non-functional note (Hammer5Tools extension) |

### Selection Criteria

Selection criteria are used by parent **PickOne** and **PlaceOnPath** elements to control which child is eligible.

| Criteria | Description |
|---|---|
| **ChoiceWeight** | Assigns a probability weight for random selection |
| **EndCap** | Marks this child as the start cap, end cap, or both on a path |
| **IsValid** | Marks this child as always valid for selection |
| **LinearLength** | Selects based on the available span length (min/max) |
| **PathPosition** | Selects based on path position: all, every Nth, at start, at end |
| **Comment** | A non-functional note (Hammer5Tools extension) |

## Variables Panel

Variables expose configurable parameters to the user when the SmartProp is placed in Hammer. They are defined in the Variables panel and can be bound to any property in the Properties panel.

### Variable Types

| Type | Description |
|---|---|
| `String` | Text value |
| `Bool` | True / False toggle |
| `Int` | Integer number |
| `Float` | Floating-point number |
| `Vector2D / Vector3D / Vector4D` | 2, 3, or 4 component vectors |
| `Color` | RGBA color |
| `Angles` | Euler angles (pitch, yaw, roll) |
| `Material` | Material asset reference |
| `MaterialGroup` | Material group reference |
| `Model` | Model asset reference |
| `CoordinateSpace` | Enum: WORLD, ELEMENT, PARENT, etc. |
| `Direction` | Directional vector enum |
| `DistributionMode` | Random / sequential distribution enum |
| `RadiusPlacementMode` | Sphere placement mode enum |
| `ChoiceSelectionMode` | Random / sequence / specific enum |
| `ApplyColorMode` | Color blend mode enum |
| `TraceNoHit` | Behavior when a trace misses |
| `ScaleMode` | Scale behavior enum |
| `PickMode` | Pick sequence mode enum |
| `GridPlacementMode` | Grid arrangement enum |
| `GridOriginMode` | Grid origin alignment enum |
| `PathPositions` | Path position type enum |

Each variable has a **name**, a **type**, and a **default value**. The name is what gets referenced in operator/filter property bindings and in **Expression** filter formulas.

### Expression Syntax Helpers

The Expression filter field offers autocompletion for common functions:

- `InstanceIndex()` — zero-based index of the current instance
- `InstanceCount()` — total number of instances in the current placement
- `RandomInt(min, max)` — random integer
- `RandomFloat(min, max)` — random float
- `LinearScale()` — linear interpolation helper
- `Tan(Deg2rad(variable))` — trigonometric helpers

## Choices Panel

The Choices panel appears when the selected element is a **PickOne**. It lists the weighted child options and lets you reorder, add, or remove choices. Each entry maps to a child element's `ChoiceWeight` selection criteria.

## File Operations

| Action | Notes |
|---|---|
| **New** (`Ctrl+N`) | Creates an untitled blank document. Prompted for name/path on first save. |
| **Open** (`Ctrl+O` or Explorer double-click) | Accepts `.vsmart` and `.vdata`. Opening a file already in a tab switches to that tab instead of duplicating it. |
| **Save** (`Ctrl+S`) | Saves to the current path and triggers CS2 compilation. |
| **Save as** (`Ctrl+Shift+S`) | Saves to a new path. |
| **Recompile file** | Re-runs the CS2 compiler on the current file without re-saving. |
| **Recompile all in addon** | Recompiles all `.vsmart` files in the addon. |
| **Convert all vsmart to vdata** | Batch-converts all `.vsmart` files in the addon to the `.vdata` format. |

## Realtime Save

When the **Realtime save** checkbox is enabled, a background timer periodically saves all modified open documents. The timer interval is set in **Settings → SmartPropEditor → `realtime_saving_delay`** (in seconds, default 5). This is useful when editing a SmartProp and watching the result update live in Hammer without pressing `Ctrl+S` manually.
