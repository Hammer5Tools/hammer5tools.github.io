# Hotkey Editor

Customize, manage, and switch keyboard shortcut profiles across Source 2 tools (Hammer Editor, ModelDoc, Material Editor, and Particle Editor).

---

## Overview

Source 2 stores keybindings across various tool configuration files in the user profile. The **Hotkey Editor** provides a centralized interface to search for tool commands, rebind shortcuts, create custom keybinding presets, and swap configurations between projects or team members.

---

## Interface Layout

The Hotkey Editor tab is divided into two sections:

| Section | Description |
|---|---|
| **Editor Selector (Left)** | Choose which Source 2 editor profile to configure (Hammer, ModelDoc, Material Editor, Subrect Editor). |
| **Keybindings Table (Right)** | Searchable table of commands, assigned key combinations, and modifiers. |

---

## Keybinding Profiles & Presets

- **Set Current**: Activates the selected preset for the chosen editor.
- **New Preset**: Creates a clean preset template based on default Valve hotkeys.
- **Open Preset**: Loads an exported keybinding configuration file.
- **Save Preset**: Persists changes to your user profile (`.keybinds`).
- **Set and Restart**: Saves changes and automatically restarts the Source 2 tool to apply bindings immediately.

---

## Searching & Rebinding

1. Select your target tool (e.g. **Map Editor**).
2. Use the **Command Filter** to find actions (e.g. `Clip Tool`, `Vertex Tool`, `Grid Increase`).
3. Double-click the hotkey cell or press the new key combination.
4. Conflicts with existing bindings will be highlighted automatically.
5. Click **Save Preset**.
