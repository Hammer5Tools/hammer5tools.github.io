# SoundEvent Editor

Create, modify, preview, and manage sound events for Counter-Strike 2. The editor directly reads and writes `soundevents_addon.vsndevts` in your addon's content folder, providing live NetConsole previewing, internal sound decompilation, and integration with the built-in [Audio Editor](#audio-editor).

---

## Layout Overview

The editor is organized into a primary hierarchy, a central properties inspector, and a docked suite of explorer panels:

| Area | Description |
|---|---|
| **Hierarchy (Left)** | Tree listing of every sound event defined in `soundevents_addon.vsndevts`. |
| **Properties Inspector (Center)** | Collapsible property blocks for the selected sound event (volume, pitch, curves, vsnd files). |
| **Sound Explorer** | File browser rooted at your addon's `sounds/` content folder. |
| **Audio Player** | Built-in waveform playback bar with volume and scrubbing. |
| **Internal Sound Files** | Searchable catalog of all raw `.vsnd` audio files packed inside base CS2 VPKs. |
| **Internal SoundEvents** | Decompiled and cached database of all base game soundevents from CS2. |
| **History Dock** | Complete undo/redo stack (`Ctrl+Z` / `Ctrl+Y`). |

---

## Toolbar Controls

| Button | Action |
|---|---|
| **Load** | Open a file dialog to load any custom `.vsndevts` file. |
| **Output** | Opens `soundevents_addon.vsndevts` in your default system text editor. |
| **Save** (`Ctrl+S`) | Writes all hierarchy and property changes back to disk immediately. |
| **Open Preset Manager** | Opens the Presets window containing pre-configured audio templates. |
| **Realtime Save** | Checkbox; automatically writes changes to disk ~50ms after every edit. |
| **Play / Stop** | Sends commands to CS2 via NetConsole (`-netconport 2121`) to preview sounds in real time. |

---

## Hierarchy Operations

Right-click any event in the hierarchy for common actions:

| Action | Shortcut | Description |
|---|---|---|
| **Add Soundevent** | `Ctrl+N` / Button | Creates a new blank sound event entry. |
| **Duplicate** | `Ctrl+D` | Duplicates selected sound event with an auto-incremented name. |
| **Rename** | `F2` | In-line rename of the event. |
| **Delete** | `Del` | Removes the event from the addon. |
| **Copy SoundEvent Name** | — | Copies the exact event name to the clipboard for pasting into Hammer entities. |
| **Open in Text Editor** | — | Opens the raw file at the event's location. |

Use the search filter bar above the hierarchy to filter events by name in real time.

---

## Properties Inspector

Selecting an event loads its fields into collapsible property groups.

### Common Property Types
- **Float / Scrubbers**: Left-click and drag horizontally to scrub values; or double-click to type a numeric value.
- **Resource Pickers / Lists (`vsnd_files`)**: Click **+** to add sound paths, or drag audio files directly from the **Sound Explorer** or **Internal Sound Files** tabs.
- **ComboBoxes**: Select predefined enum values (e.g. `type = csgo_mega`, `spread_type`, `volume_falloff`).
- **Booleans**: Checkbox toggles (`use_hrtf`, `occlusion_test`).
- **Distance Volume Curves**: Visual curve editor to adjust volume falloff across minimum and maximum hearing distances.

### Right-Click Context Menu
- **Add New Property** (`Ctrl+F`): Opens a searchable popup to add standard Source 2 sound properties (pitch randomizers, occlusion parameters, reverb send, limiting groups).
- **Copy / Paste Property**: Copy property values between events.
- **Expand / Collapse All**: Toggles all property frames.

---

## Playing Sounds in Live CS2 (NetConsole)

The **Play current event** button communicates with a running CS2 instance:
1. Launch CS2 with `-netconport 2121` (configured via **Settings > SoundEvent** or Launch Options).
2. Click **Play current event**.
3. Hammer5Tools sends `snd_sos_stop_all_soundevents` followed by `snd_sos_start_soundevent <name>`.
4. The sound plays inside CS2 with full spatialization and HRTF processing.

---

## Browsing Base Game SoundEvents & Files

- **Internal SoundEvents Tab**: Displays every compiled sound event shipped with CS2. Double-clicking opens it in read-only mode to inspect Valve's curves and parameters. Right-click and choose **Copy to Addon** to clone any official soundevent into your addon.
- **Internal Sound Files Tab**: Displays extracted `.vsnd` references. Single-click to preview through the built-in player.

---

## Working with Waveform Loops

To edit the underlying `.wav` files, add RIFF cue loop marks, or apply gain/fades, switch to the built-in [Audio Editor](#audio-editor) tab.
