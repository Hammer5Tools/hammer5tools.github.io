# SoundEvent Editor

Create and manage sound events for your addon. The editor reads and writes `soundevents_addon.vsndevts` in your addon's content directory and keeps your sound files in the `sounds/` folder next to it.

---

## Layout

The editor is organized into a main window with a sidebar of tabs on the right and a properties panel in the center.

![Interface Overview](docs/images/sound_editor/interface_overview.png)

| Area | Description |
|---|---|
| **Hierarchy** | List of every sound event in `soundevents_addon.vsndevts`. |
| **Properties** | Fields of the currently selected sound event. |
| **Sound Explorer** | File tree rooted at your addon's `sounds/` directory. |
| **Internal Sound Files** | Searchable flat list of every raw sound file found inside CS2's VPK. |
| **Internal SoundEvents** | Searchable flat list of every compiled sound event from the base game. |
| **History** | Undo/redo stack (docked, resizable). |

---

## Getting Started

When you open the editor it automatically loads `soundevents/soundevents_addon.vsndevts` from your addon's content folder. If the file does not exist yet a dialog will ask whether you want to copy the default template from `addon_template`. Choosing **Yes** copies both the `.vsndevts` file and the default `sounds/` folder — note this may overwrite any WAV files already present there.

You can also open a different `.vsndevts` file at any time with the **Load** button.

---

## Toolbar Buttons

| Button | Action |
|---|---|
| **Load** | Open a file picker to load any `.vsndevts` file into the hierarchy. |
| **Output** | Open the current `soundevents_addon.vsndevts` in your default text editor. |
| **Save** | Write all hierarchy changes back to the file immediately. |
| **Open Preset Manager** | Opens the Preset Manager window. |
| **Realtime Save** (checkbox) | When checked, the file is saved automatically ~50 ms after every change. |

---

## Hierarchy

The hierarchy shows every sound event by name. All operations respect the undo stack.

### Hierarchy Context Menu

Right-click anywhere in the hierarchy for:

| Action | Shortcut | Description |
|---|---|---|
| Add Soundevent | — | Create a new blank sound event. |
| Duplicate | `Ctrl+D` | Copy selected event(s) with a new unique name. |
| Rename | `F2` | Rename the selected event inline. |
| Delete | `Del` | Remove the selected event(s). |
| Copy SoundEvent name | — | Copy the event name to the clipboard. |
| Open soundevents file | — | Open the `.vsndevts` file in your text editor. |

### Hierarchy Search Bar

Type in the search bar above the hierarchy to filter events by name in real time.

---

## Properties Panel

Selecting an event in the hierarchy loads its properties here. Each property is a collapsible frame showing the key and its value widget.

### Property Types

| Type | Interaction | Preview |
|---|---|---|
| **Float / Number** | Left-click and drag horizontally to scrub; type a value directly. | ![Float Property](docs/images/sound_editor/float_property.png) |
| **List** (`vsnd_files`, etc.) | Use **+** / **–** buttons to add or remove list entries. | ![List Property](docs/images/sound_editor/list_property.png) |
| **ComboBox** | Click to open a dropdown of predefined options. | ![ComboBox Property](docs/images/sound_editor/combobox_property.png) |
| **Bool** | Click the checkbox to toggle. | ![Bool Property](docs/images/sound_editor/bool_property.png) |
| **Curve** | Click and drag curve points to adjust the shape. | ![Curve Property](docs/images/sound_editor/curve_property.png) |

### Properties Context Menu

Right-click the properties area for:

| Action | Shortcut | Description |
|---|---|---|
| Undo | `Ctrl+Z` | Undo the last property change. |
| Redo | `Ctrl+Y` / `Ctrl+Shift+Z` | Redo a previously undone change. |
| New Property | `Ctrl+F` | Open the property picker popup to add a field. |
| Paste | `Ctrl+V` | Paste a property from the clipboard. |
| Collapse All | — | Collapse every property frame. |
| Expand All | — | Expand every property frame. |

### Comment Field

Every event has a **Comment** text box at the top of the properties panel. The comment is stored in the `.vsndevts` file alongside the event data.

### Read-only Mode

Events loaded from the **Internal SoundEvents** tab for preview are displayed in read-only mode. All property frames are disabled and a badge indicates the state. The **Play** button remains active.

---

## Playing Sound Events

A **Play current event** button and a **Stop** button sit above the Preset Manager button in the left panel.

- **Play current event** — Sends `snd_sos_stop_all_soundevents` followed by `snd_sos_start_soundevent <name>` to a running CS2 instance via netconsole (`-netconport 2121`). CS2 must already be running with that launch option.
- **Stop** — Sends `snd_sos_stop_all_soundevents` to stop everything currently playing.

---

## Sound Explorer

The **Sound Explorer** tab shows the file tree of your addon's `sounds/` directory. Clicking a file plays it through the built-in audio player (if **Play on click** is enabled in settings). The audio player bar appears at the top of the explorer section.

---

## Internal Sound Files

The **Internal Sound Files** tab lists raw `.vsnd` files extracted from CS2's VPK. Use the search bar to filter by name. Clicking a file plays it through the audio player.

---

## Internal SoundEvents

The **Internal SoundEvents** tab is a flat searchable list of every compiled sound event from the base game. The list is loaded in a background thread the first time the editor opens; compiled `.vsndevts_c` files are decompiled and cached locally so subsequent loads are instant.

### Interactions

| Action | Result |
|---|---|
| Single click | Plays the event in CS2 via netconsole (same as **Play current event**). |
| Double click | Opens the event's properties in the Properties panel in read-only mode. |
| Right-click → Copy Name(s) | Copies selected event name(s) to the clipboard. |
| Right-click → Copy to Addon | Adds the event as a new entry in your addon hierarchy and saves. |

---

## Undo / Redo

All hierarchy and property changes are tracked by a shared undo stack.

| Action | Shortcut |
|---|---|
| Undo | `Ctrl+Z` |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` |

The **History** dock on the right shows the full stack. Click any entry to jump to that state.

---

## Preset Manager

Open the Preset Manager with the **Open Preset Manager** button. Presets are `.kv3` files stored in the `SoundEventEditor/Presets` directory.

![Preset Manager](docs/images/sound_editor/preset_manager.png)

| Button | Action |
|---|---|
| **New** | Create a new blank preset file (`SE_Preset_N.kv3`). |
| **Open** | Load the selected preset into the properties view. |
| **Save** | Write the current properties back to the open preset file. |
| **Open Folder** | Open the presets directory in Explorer. |

Select a preset in the explorer on the left, then click **Open** to edit its properties. Click **Save** to persist changes.

> [!TIP]
> Presets store a set of sound event properties. Use them to quickly apply a known configuration to a new event — open the preset, copy the properties you need, then paste them into your event.
