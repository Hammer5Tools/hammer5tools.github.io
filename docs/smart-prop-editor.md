# SmartProp Editor

A visual node-based editor for creating and modifying Valve `.vsmart` and `.vdata` procedural prop files for Counter-Strike 2.

---

## Overview

SmartProps represent Source 2's procedural placement and asset variation system. A `.vsmart` file defines a hierarchical graph of elements (models, scatters, grids, deformable lines) altered by operators (transforms, traces, color tints) and controlled by user-facing variables.

Instead of writing verbose KeyValues3 text files by hand, the **SmartProp Editor** provides a rich interface with full undo/redo history, variable binding, expression evaluation, 3D viewport previewing, and instantaneous compilation on save.

---

## Interface Layout

The editor window is organized into docked workspaces:

| Panel | Description |
|---|---|
| **Explorer Dock (Left)** | File browser rooted at your addon's content folder for quickly opening `.vsmart` and `.vdata` files. Features an enhanced **Quick VSmart** generator with support for variables, modifiers, and categories. |
| **Document Tabs (Center Top)** | Multi-document tab bar allowing multiple `.vsmart` files to be open concurrently. |
| **Hierarchy Panel (Center Left)** | Tree view representing the element graph (`CSmartPropElement_*` nodes). |
| **Properties Panel (Center Right)** | Inspector for element properties, attached modifiers (operators/filters), and selection criteria. |
| **Variables Panel** | Exposes configurable parameters (Strings, Bools, Floats, Vectors, Colors, Materials, Angles) to Hammer users. |
| **Choices Panel** | Manages weighted variations when a `PickOne` element is selected. |

---

## Element Types

| Element | Valve Class | Description |
|---|---|---|
| **Group** | `CSmartPropElement_Group` | Organizational container for child elements. |
| **ModifyState** | `CSmartPropElement_ModifyState` | Transforms state without placing physical geometry. |
| **SmartProp** | `CSmartPropElement_SmartProp` | Sub-graph embedding another `.vsmart` file by reference. |
| **Model** | `CSmartPropElement_Model` | Places a static Source 2 `.vmdl` model. |
| **ModelEntity** | `CSmartPropElement_ModelEntity` | Places a model as an interactive dynamic entity. |
| **PropPhysics** | `CSmartPropElement_PropPhysics` | Places a physics-enabled prop with mass and collision. |
| **PropDynamic** | `CSmartPropElement_PropDynamic` | Places an animated dynamic prop. |
| **PlaceInSphere** | `CSmartPropElement_PlaceInSphere` | Scatters instances across a spherical or planar disc volume. |
| **PlaceMultiple** | `CSmartPropElement_PlaceMultiple` | Repeats child elements a set number of times. |
| **PlaceOnPath** | `CSmartPropElement_PlaceOnPath` | Distributes children along a path with defined spacing. |
| **FitOnLine** | `CSmartPropElement_FitOnLine` | Scales and distributes elements between two endpoints. |
| **PickOne** | `CSmartPropElement_PickOne` | Selects one child from a weighted list of choices. |
| **Grid** | `CSmartPropElement_Layout2DGrid` | Arranges children in a 2D rectangular grid. |
| **BendDeformer** | `CSmartPropElement_BendDeformer` | Warps child geometry along an arc. |
| **MidpointDeformer** | `CSmartPropElement_MidpointDeformer` | Deforms children along a spline curve. |

---

## Modifiers: Operators & Filters

Modifiers attach to elements in the Properties panel and execute sequentially from top to bottom.

### Common Operators
- **Transformations**: `Rotate`, `RandomRotation`, `RandomRotationSnapped`, `ResetRotation`, `RotateTowards`, `SetOrientation`, `Translate`, `RandomOffset`, `SetPosition`, `Scale`, `RandomScale`, `ResetScale`.
- **Materials & Appearance**: `SetTintColor`, `MaterialOverride`, `MaterialTint`, `SetMaterialGroupChoice`.
- **Traces & Raycasts**: `TraceInDirection` (drops props onto floor/mesh), `TraceToPoint`, `TraceToLine`, `Trace`.
- **Gizmo Handles**: `CreateSizer` (box-scale handle), `CreateRotator` (angle handle), `CreateLocator` (position handle).
- **Math & Vectors**: `ComputeDotProduct3D`, `ComputeCrossProduct3D`, `ComputeDistance3D`, `ComputeNormalizedVector3D`, `ComputeVectorBetweenPoints3D`.
- **State Management**: `SaveState`, `RestoreState`, `SavePosition`, `SaveDirection`, `SaveScale`, `SetVariable`.

### Filters
Filters decide whether an element should be evaluated or skipped:
- **Probability**: Spawns element with a random chance (0.0 to 1.0).
- **Expression**: Spawns element if a mathematical/logical expression evaluates to true (e.g. `InstanceIndex() % 2 == 0`).
- **SurfaceAngle**: Restricts placement based on terrain slope angle.
- **SurfaceProperties**: Restricts placement to specific material surface types (e.g. `grass`, `wood`).
- **VariableValue**: Compares variable values (`EQUAL`, `NOT_EQUAL`, `GREATER`, `LESS`).

---

## Variables Panel & Hammer Exposure

Variables created in the **Variables** panel are displayed as editable settings when placing the SmartProp in Hammer.

### Supported Variable Types
- `String`, `Bool`, `Int`, `Float`
- `Vector2D`, `Vector3D`, `Vector4D`
- `Color` (RGBA)
- `Angles` (Pitch, Yaw, Roll)
- `Material`, `MaterialGroup`, `Model` asset references
- `CoordinateSpace`, `DistributionMode`, `ChoiceSelectionMode`, `TraceNoHit`, `ScaleMode`

To bind any property to a variable, click the **Variable Link** icon next to the property in the inspector.

---

## Expression Helpers

In Expression filters and math operators, use built-in functions:
- `InstanceIndex()`: Current instance index (0, 1, 2, ...).
- `InstanceCount()`: Total instance count.
- `RandomInt(min, max)` / `RandomFloat(min, max)`: Random value generator.
- `LinearScale(val, in_min, in_max, out_min, out_max)`: Range remapping.
- `Deg2rad(angle)` / `Rad2deg(radians)`: Angle conversion.

---

## Realtime Saving & Transparency

- **Realtime Save**: When enabled in the toolbar, Hammer5Tools auto-saves modified documents to disk whenever you make an edit (delay configurable in **Settings > SmartProp**).
- **Window Transparency**: When enabled in settings, the window becomes semi-transparent during live editing so you can see Hammer updating directly behind it.
