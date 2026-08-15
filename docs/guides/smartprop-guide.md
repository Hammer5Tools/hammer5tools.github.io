# SmartProp Guide

SmartProps are an intuitive system in Source 2 used to group objects and attach procedural logic to them, such as randomization, line placement, scattering, and dynamic parameter adjustments. Think of them as smart prefabs with custom variables and interactive viewport handles.

![SmartProp Overview](docs/images/smartprop_guide/smartprop-intro-demo.gif)

> [!NOTE]
> This is a beginner-focused guide designed to explain the core concepts of SmartProps and get you started building your own procedural assets in Hammer 5 Tools.

---

## How to Use SmartProps in Hammer

Activate the **Selection Tool** (`Shift + S` or `Q`) in the Hammer viewport to display and interact with SmartProp control widgets.

![Selection Tool](docs/images/smartprop_guide/smartprop-select-tool.png)

### Interactive Viewport Controls

SmartProps can define visual control widgets that you can manipulate directly inside the 3D viewport:

#### PickOne Handles
Scroll the mouse wheel over circle, rectangle, or rhombus control handles to cycle through available child objects or variants.

![PickOne Wheel Handle](docs/images/smartprop_guide/smartprop-pickone-wheel.gif)

#### Sizers (`CreateSizer` Modifier)
Drag arrow handles with the **Left Mouse Button** to interactively adjust sizer boundaries, bounding boxes, or lengths.

![Sizer Arrows](docs/images/smartprop_guide/smartprop-sizer-arrows.gif)

#### Locators (`CreateLocator` Modifier)
Locator gizmos support translation, rotation, and scaling directly in the viewport. Each transformation mode can be enabled, constrained, or disabled per SmartProp.

![Locator Gizmo](docs/images/smartprop_guide/smartprop-locator-gizmo.gif)

#### Rotators (`CreateRotator` Modifier)
Rotation rings allow interactive rotation with degree snapping support.

![Rotator Degree Snapping](docs/images/smartprop_guide/smartprop-rotator-snapping.gif)

### Resetting Controls
Hover your mouse cursor over any visible control handle in the viewport and press **`Alt + M`** to reset that control to its default value.

### Outliner and Object Properties
All active SmartProp controls are listed in the Hammer **Outliner** under the selected entity:

![Hammer Outliner](docs/images/smartprop_guide/smartprop-outliner.png)

All exposed SmartProp parameters and variables appear in the **Object Properties** panel:

![Object Properties](docs/images/smartprop_guide/smartprop-object-properties.png)

### Collapsing SmartProps into Static Entities
To bake a procedural SmartProp into standard static entities, right-click the prop in the viewport and select **Selected smart props → Collapse Smart Props**.

![Collapse Smart Props](docs/images/smartprop_guide/smartprop-collapse-menu.png)

---

## File Structure & Architecture

A SmartProp is constructed from **Elements**, **Modifiers**, **Selection Criteria**, **Variables**, and **Choices**.

| Component | Definition | Examples |
|---|---|---|
| **Elements** | Core objects in the tree hierarchy. Elements can contain child elements and pass down position and rotation transforms from parents. | `Model`, `Group`, `PickOne`, `SmartProp` |
| **Modifiers** | Attached to elements to modify their properties (such as position, rotation, scale, or tint). Modifiers include **Operators** (transform state) and **Filters** (conditional visibility). | `Translate`, `Rotate`, `Scale`, `Filter: Expression` |
| **Selection Criteria** | Attached to elements to determine selection weight or matching conditions inside container elements like `PickOne` or `PlaceOnPath`. | `LinearLength`, `ChoiceWeight` |
| **Variables** | Dynamic parameters exposed to Hammer users in Object Properties (e.g., float sliders, checkboxes, color pickers). | `Float`, `Bool`, `String`, `Vector2D`, `Color` |
| **Choices** | Named value presets and dropdown menus for variables. | List of preset variants |

SmartProp files describe procedural rules and relationships for models (`.vmdl`). These definitions are stored in `.vsmart` files formatted in KeyValues3 (KV3).

Valve did not include a visual editor for `.vsmart` files, and standard CS2 Hammer does not compile them with default settings. **Hammer5Tools** solves both problems by providing a full visual editor for the `.vsmart` format and automatically configuring CS2 Hammer to compile them.

> [!TIP]
> Launch CS2 Hammer at least once through Hammer5Tools so it can automatically configure CS2 Hammer compiler settings for `.vsmart` files.

### Experimental Properties

> [!WARNING]
> SmartProps are actively developed in Source 2, and some experimental schema properties may not be fully functional in community Hammer builds.
> You can inspect the complete Source 2 SmartProp schema on the [S2V Schema Explorer](https://s2v.app/SchemaExplorer/cs2/smartprops/CSmartPropElement_Model).

Hammer5Tools includes all properties from the Source 2 schema, but experimental and unverified properties are hidden by default. To unhide them, go to **Settings → SmartProp Editor** and uncheck **`Hide experimental properties and elements`**. If you find an experimental property that works well, please let us know on Discord so we can mark it as verified!

---

## Hierarchy Panel

The Hierarchy panel contains the tree of elements defining your SmartProp.

- Add a new element by right-clicking in empty space or clicking the **Add** button in the toolbar.
- Reorder or nest elements by dragging them with the left mouse button.
- Double-click any element label to rename it.

![Hierarchy Drag and Rename](docs/images/smartprop_guide/smartprop-hierarchy-reorder-rename.gif)

### Transform Inheritance
Child elements automatically inherit the local position and rotation of their parent elements.

![Transform Inheritance](docs/images/smartprop_guide/smartprop-hierarchy-inheritance.png)

---

## Property Editor

### Modifiers & Selection Criteria
Modifiers are divided into two main categories:
- **Operators**: Apply transformations to element properties (e.g., translation, rotation, scale, tint).
- **Filters**: Conditionally hide the current element and all of its children based on criteria.

Use the **Create New** button to add modifiers and selection criteria. You can quickly manage them using standard shortcuts:

| Action | Shortcut |
|---|---|
| **Copy** | `Ctrl + C` |
| **Duplicate** | `Ctrl + D` |
| **Cut** | `Ctrl + X` |
| **Delete** | `Del` |

Use the **Paste** button on the right side of the panel to paste copied modifiers.

### Property Modes
Each property field supports 4 distinct input modes:

1. **Default**: Uses the class default value.
2. **Value**: Direct constant value (numeric, string, vector, etc.).
3. **Variable**: Binds the property to a defined variable.
4. **Expression**: Evaluates a formula dynamically at build/evaluation time.

![Property Modes](docs/images/smartprop_guide/smartprop-property-modes.png)

The **Variable** mode displays a dropdown list of all compatible variables and provides a quick button to create a new variable directly:

![Variable Dropdown](docs/images/smartprop_guide/smartprop-variable-dropdown.png)

Clicking the **`+`** button opens the variable creation dialog:

![Create Variable Dialog](docs/images/smartprop_guide/smartprop-create-variable-dialog.png)

Newly created variables immediately appear in the **Variables** panel:

![Variables List](docs/images/smartprop_guide/smartprop-variables-list.png)

### Expression Engine
The Expression field supports standard arithmetic operators (`+`, `-`, `*`, `/`), math functions (trigonometry, `min`, `max`, `abs`, `floor`, `ceil`), and ternary conditional operators (`condition ? true_val : false_val`). Open the expression editor to browse all available functions.

> [!NOTE]
> String property fields do not support expressions.

![Expression Editor](docs/images/smartprop_guide/smartprop-expression-editor.png)

---

## Variables & Choices

### Exposing Variables to Hammer
Click the **Eye icon** ("Show in editor") next to any variable in the Variables panel. The variable will then appear in the entity's **Object Properties** panel in Hammer.

![Expose Variable Eye Icon](docs/images/smartprop_guide/smartprop-variable-exposed-eye.png)

You can customize the default value, min/max range, and display category for each variable.

### Choices (Presets)
**Choices** provide convenient value presets for variables. Supported variable types include `bool`, `string`, `float`, and `int`.

![Choices Presets](docs/images/smartprop_guide/smartprop-choices-presets.png)

---

## Practical Tutorial: Creating a Dust 2 Crate PickOne SmartProp

In this tutorial, we will build a versatile crate selector containing multiple Dust 2 crate models. It will support both manual model selection via a slider and automatic randomization, along with optional random scaling and horizontal yaw rotation.

![PickOne Crate Demo](docs/images/smartprop_guide/smartprop-crate-example-demo.gif)

 **[Download Completed dust_crate.vsmart](static/vsmart-examples/dust_crate.vsmart)**

---

### Step 1: Create the Root PickOne Element
In the Hierarchy window, right-click and add a new element of type **PickOne**.

### Step 2: Add Model Elements
Add several **Model** elements as children under the **PickOne** element.
Toggle **Dynamic Isolation** in the toolbar to isolate and inspect the active model you are positioning.

![Dynamic Isolation](docs/images/smartprop_guide/smartprop-dynamic-isolation.png)

### Step 3: Name Your Elements
Double-click each model element in the hierarchy and give them clear, descriptive labels.

![Rename Elements](docs/images/smartprop_guide/smartprop-hierarchy-renamed.png)

### Step 4: Expose Model Properties
Select a model element and expose useful properties as variables, such as **Material Group**, **Cast Shadows**, and **Detail Object**.
Remember to specify the model path for material group variables so Hammer knows which skins are available.

![Expose Model Properties](docs/images/smartprop_guide/smartprop-model-properties-exposed.png)

### Step 5: Organize with Categories
Create variable categories in the Variables panel to keep the parameters neatly grouped in Hammer's Object Properties.

![Variable Categories](docs/images/smartprop_guide/smartprop-variable-categories.png)

### Step 6: Configure the Viewport Handle
Select the root **PickOne** element. In the property editor, configure the handle color, shape, and offset position. Offsetting the control handle ensures it does not overlap with Hammer's standard translation gizmo.

![Control Handle Settings](docs/images/smartprop_guide/smartprop-pickone-control-settings.png)

![Control Offset](docs/images/smartprop_guide/smartprop-control-offset.png)

The control handle will now appear cleanly next to the prop in the viewport:

![Control Handle in Viewport](docs/images/smartprop_guide/smartprop-control-pie-menu.png)

### Step 7: Create the Selection Switcher
We want a toggle to switch between random selection and manual slider selection.
In the Variables panel, expose:
- `SelectionMode` (bound to the PickOne selection mode property)
- `SpecificChildIndex` (bound to the specific child index property)

### Step 8: Set Index Range
Set the **Min** and **Max** bounds for the `SpecificChildIndex` variable. For 3 child models, set **Min = 0** and **Max = 2** (since index 0 is the first model).

### Step 9: Disable the Slider Conditionally
We only want the slider active when `SelectionMode` is set to `SPECIFIC`.
In the `SpecificChildIndex` variable settings, set the **Read-only Expression** to:
```text
SelectionMode != 'SPECIFIC'
```

![Selection Mode Logic](docs/images/smartprop_guide/smartprop-selection-mode-logic.png)

The selection logic is now complete!

### Step 10: Add Randomization Modifiers
To add variation, attach **Random Scale** and **Random Rotation** modifiers to the root element.

![Random Modifiers](docs/images/smartprop_guide/smartprop-random-scale-rotation-modifiers.png)

### Step 11: Add Randomization Toggles
Create two boolean variables to let mappers turn randomization on or off:
- `EnableRandomScale` (default: false)
- `EnableRandomRotation` (default: false)

![Enable Random Toggles](docs/images/smartprop_guide/smartprop-enable-random-vars.png)

### Step 12: Expose Scale Parameters
Expose the **Min Scale** and **Max Scale** properties in the Random Scale modifier, and bind the modifier's **Enabled** property to your `EnableRandomScale` variable.

![Scale Min/Max Properties](docs/images/smartprop_guide/smartprop-random-scale-minmax.png)

### Step 13: Create a Vector2D Variable for Rotation
For rotation, we only want horizontal rotation around the Z (yaw) axis. Rather than creating two separate float variables for min and max angles, create a single **Vector2D** variable where:
- `X` = Minimum yaw angle
- `Y` = Maximum yaw angle

![Vector2D Variable](docs/images/smartprop_guide/smartprop-vector2d-var.png)

### Step 14 & 15: Split Vector Expressions
In the Random Rotation modifier, switch the Z min and max rotation fields to **Expression** mode. Use expressions to reference the split components:
- Min Z Rotation: `RotationRange.x`
- Max Z Rotation: `RotationRange.y`

![Vector Split Expressions](docs/images/smartprop_guide/smartprop-vector-split-expressions.png)

> [!TIP]
> Drag horizontally with the mouse wheel over numeric input fields in Hammer Editor to adjust values smoothly.

![Mouse Wheel Drag](docs/images/smartprop_guide/smartprop-mousewheel-drag-values.gif)

You now have a fully functional, customizable SmartProp ready to place in CS2 maps!
