# DetailProp Editor

A visual editor for configuring Source 2 material layer detail props (`scripts/detail_prop_types.vdata`).

---

## Overview

In Source 2 and Counter-Strike 2, Detail Props are bound directly to **Material Layers** rather than legacy displacement attributes. When painting blend materials onto terrain meshes in Hammer, each material layer automatically evaluates its assigned detail prop types to procedurally scatter grass, weeds, flowers, rocks, and surface debris across the painted areas.

Instead of manually editing complex KeyValues3 schemas in `detail_prop_types.vdata`, the **DetailProp Editor** provides a structured tree interface to manage detail types, model variations, density limits, orientation constraints, and material overrides with real-time validation and instant saving.

---

## Interface Layout

The DetailProp Editor is arranged into two primary panels:

| Panel | Description |
|---|---|
| **Hierarchy (Left)** | Tree view showing all defined detail types (e.g. `grass_wild_01`, `gravel_clutter`) and their assigned model entries. |
| **Properties Inspector (Right)** | Compact attribute editor for modifying density, elevation, random rotation ranges, and model properties of the selected item. |
| **Toolbar & Status Bar** | Actions for creating types, adding models, saving, and undo/redo history. |

---

## Data Model & Configuration

The editor directly reads and writes:
```
content/csgo_addons/<addon_name>/scripts/detail_prop_types.vdata
```

When saved, CS2 automatically compiles this into `game/csgo_addons/<addon_name>/scripts/detail_prop_types.vdata_c` for use in Hammer's Material Editor and blend material layers.

---

## Detail Type Properties

When a **Detail Type** node is selected in the hierarchy, you can configure the global placement rules for that group:

| Property | Type | Description |
|---|---|---|
| **Density** | Float | Base number of prop instances placed per unit area on the painted material layer. |
| **Shape Type** | Enum | Placement pattern distribution (`SPHERE`, `CONE`, `BOX`, `POINT`). |
| **Radius** | Float | Scatter radius or cluster boundary size. |
| **Min / Max Elevation** | Float | Z-height bounds restricting where props can spawn on terrain slopes. |
| **Surface Slope Angle** | Range | Min and max surface normals (e.g., prevent grass from spawning on vertical rock cliffs). |

---

## Model Entry Properties

Each detail type can contain multiple model variations (`.vmdl`). CS2 will randomly select among these models based on their relative weights.

When a **Model** child node is selected:

| Property | Type | Description |
|---|---|---|
| **Model** (`m_sModelName`) | Resource Picker | Path to the Source 2 `.vmdl` model file. |
| **Material Group** | String / Picker | Specific skin or material variation defined in the model. |
| **Probability Weight** | Float | Relative chance of picking this model compared to other models in the same type. |
| **Random Yaw / Pitch / Roll** | Angle Range | Minimum and maximum random angular jitter applied upon placement. |
| **Scale Min / Max** | Float Range | Random scaling bounds for natural size variation. |
| **Upright Alignment** | Float (0.0 – 1.0) | Blend factor between aligning to the terrain surface normal (0) vs. pointing straight up (1). |

---

## Operations & Shortcuts

| Action | Shortcut | Description |
|---|---|---|
| **Add Detail Type** | `Ctrl+T` / Button | Creates a new blank detail type group. |
| **Add Model to Type** | `Ctrl+M` / Button | Adds a model entry to the selected detail type. |
| **Duplicate Item** | `Ctrl+D` | Clones the selected type or model entry with all its parameters. |
| **Delete** | `Del` | Removes the selected item from the hierarchy. |
| **Undo / Redo** | `Ctrl+Z` / `Ctrl+Y` | Step backwards or forwards through property and structural changes. |
| **Save** | `Ctrl+S` | Serializes changes to `detail_prop_types.vdata` and triggers compilation. |

---

## Using Detail Props in Hammer

1. Configure your detail types and assign your grass / clutter models in Hammer5Tools.
2. Save with `Ctrl+S` to serialize and compile `scripts/detail_prop_types.vdata`.
3. In Hammer, open the **Material Editor** for your blend material (`.vmat`).
4. In the **Detail Props** tab of the Material Editor, select your configured detail prop type(s) for the corresponding material layers.
5. In the Hammer viewport, enable **Toggle Grass / Detail Props** to view the procedural detail props spawning across your terrain in real time!
