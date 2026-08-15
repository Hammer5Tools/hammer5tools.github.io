# Preferences & Settings

Complete configuration guide for Hammer5Tools application preferences, editor settings, and file associations.

---

## Overview

Hammer5Tools stores its configuration in `settings.ini` located in the application directory. You can configure all behaviors through the visual **Settings** dialog by clicking **Settings** in the bottom toolbar.

---

## Settings Tabs

### 1. General Settings
- **Counter-Strike 2 Path**: The root installation directory of Counter-Strike 2 (e.g. `C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive`). Auto-detected from Windows Registry, but can be manually overridden.
- **Steam Path**: The root installation folder of the Steam client.
- **Default Active Addon**: The addon that loads automatically on startup.
- **Check File Associations on Startup**: Prompts to associate `.vsmart` and `.vdata` files with Hammer5Tools if not already registered.
- **Minimize to System Tray**: When closing the main window (`X`), minimize to the Windows system tray instead of terminating the process.

---

### 2. SoundEvent & Audio Settings
- **Audio Output Device**: Select the preferred sound playback device for the Audio Editor and Sound Explorer preview player.
- **Play on Click**: When enabled in Sound Explorer, single-clicking a `.wav` file starts audio playback immediately.
- **NetConsole Port**: The TCP port used to communicate with running CS2 instances for live sound event playback (default: `2121`).
- **Decompiled SoundEvents Cache**: Controls caching of decompiled `.vsndevts_c` base game sound files for fast startup.

---

### 3. SmartProp Editor Settings
- **Realtime Saving Delay**: Interval in seconds (default: `5`) between automated background saves when **Realtime Save** is active.
- **Window Transparency on Realtime Save**: Optional alpha transparency applied to the window while editing, enabling you to see Hammer Editor behind Hammer5Tools in real time.
- **Default Viewport Grid**: Toggles 3D wireframe grid display and snapping settings in the SmartProp 3D preview viewport.
- **Recent Files Limit**: Maximum number of files remembered in the Open Recent menu.

---

### 4. Map Builder Settings
- **Default Compiler Threads**: Number of CPU threads allocated to `resourcecompiler.exe` (`-1` for automatic detection).
- **NetConsole Timeout**: Maximum wait duration (in seconds) when connecting to CS2 for automated cubemap baking.
- **Auto-Load Map on Completion**: Automatically launches CS2 with the built map after compilation finishes.
- **Default Lightmap Resolution**: Default texel cap for VRAD3 lightmaps (default: `512`).

---

### 5. Hotkeys & Keybinding Presets
- **Active Profile**: Selects the active keybinding preset profile for Source 2 tools (Hammer, ModelDoc, Material Editor).
- **User Preset Directory**: Custom path where exported `.keybinds` files are stored.

---

### 6. Other / Development
- **Enable Debug Info**: Enables verbose diagnostic logging in the console and displays internal data inspectors.
- **Automatic Update Checks**: Periodically checks GitHub releases for stable and development updates using Velopack.
- **Show About on Startup**: Shows the introductory splash and release highlights dialog on application launch.

---

## File Associations Setup

Hammer5Tools can integrate into Windows Explorer context menus:
- Double-clicking `.vsmart` files opens them directly in the SmartProp Editor (routing via single-instance IPC to existing windows).
- Double-clicking `.vdata` files opens them in the DetailProp or SmartProp Editor.
- Right-clicking folders provides quick actions (e.g. **Compile Assets**, **Create VMDL**, **Open in Hammer5Tools**).

To configure file associations, click **Setup Associations** in **Settings > General** or run the initial prompt.
