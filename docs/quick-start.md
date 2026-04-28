# Quick Start

Get started with Hammer5Tools. This page goes over the basic workflow for each tool so you know what's going on.

---

## Initial Setup

1. **Install** — run the installer or extract the release archive.
2. **Launch** — Hammer5Tools auto-detects the CS2 installation. If it is not found, a prompt will appear letting you set the path manually via **Settings > General > CS2 Path**.
3. **Select an addon** — pick an addon from the dropdown in the toolbar. If no addons exist yet, click **Create New Addon**.
4. The last-selected tab and window layout are remembered between sessions.

> [!NOTE]
> Hammer5Tools minimizes to the system tray by default when you close the window. Right-click the tray icon and choose **Exit** to close it fully.

---

## Sound Event Editor

Edit your addon's `soundevents_addon.vsndevts` file.

1. Switch to the **Sound Event Editor** tab.
2. Click **Add New Event** to create a sound event entry.
3. Pick your `.vsnd` file using the file picker.
4. Adjust any parameters (volume, pitch, distance), then **Save**.

The file is written directly to `content/csgo_addons/<addon>/soundevents/soundevents_addon.vsndevts`.

---

## SmartProp Editor

Create and edit `.vsmart` procedural prop files.

1. Switch to the **SmartProp Editor** tab.
2. Open an existing `.vsmart` file with **File > Open**, or create a new one.
3. Add nodes in the node graph to build your prop variation rules.
4. Save with **Ctrl+S** — the file is written back to your content directory.

You can also double-click a `.vsmart` file in Windows Explorer to open it directly in a running Hammer5Tools instance via IPC.

---

## Asset Group Maker

Batch-create `.hbat` asset group batch files for your addon.

1. Switch to the **Asset Group** tab.
2. The tool scans the addon directory for assets.
3. Configure grouping rules as needed.
4. Click **Generate** — asset group files are written to the appropriate location in your content folder.

---

## Loading Editor

Manage the map's loading screen screenshots, map icon, and description.

1. Switch to the **Loading Editor** tab.
2. **Screenshots** — add images to the `screenshots/Hammer5Tools/LoadingScreen` folder (or import via the UI), then click **Apply Screenshots** to convert and compile them.
3. **Map Icon** — drag and drop an SVG onto the icon canvas. Use **Fit Viewbox** to auto-size it, then save.
4. **Descriptions** — enter the map description and credits, then save.

See the [Loading Editor documentation](#loading-editor) for the full reference.

---

## Hotkey Editor

Customize CS2 / Hammer keyboard bindings stored in your addon.

1. Switch to the **Hotkey Editor** tab.
2. Browse the list of available actions.
3. Click an action and press the new key combination to rebind it.
4. Changes are saved automatically.

---

## Map Builder

Compile the map without leaving Hammer5Tools.

1. Click **Map Builder** in the toolbar to open the build window.
2. Select a **preset** (Fast Compile, Full Compile, Lighting Only, or Entities Only) or create your own.
3. Set the **Map Path** — pick one `.vmap` file, or separate multiple paths with `;` for a batch build.
4. Click **Build**. Output streams live in the right panel.
5. When the build finishes, the map loads in CS2 automatically if **Load in Engine After Build** is enabled.

See the [Map Builder documentation](#map-builder) for all settings and cubemap baking details.

---

## Cleanup

Remove unused asset files from the addon's content directory.

1. Click **Cleanup** in the toolbar.
2. The tool parses your `.vmap` and lists every file in the content folder that is not referenced.
3. Review the list — use the **Search** box and **File Type** filter to focus on specific assets.
4. Uncheck any files to keep, then click **Delete Selected Files**.
5. Click **Recalculate** after making changes in Hammer to refresh the list.

> [!WARNING]
> After running Cleanup, also run **Clean Up** inside Hammer's Asset Browser to remove stale compiled assets from the game directory.

See the [Cleanup documentation](#cleanup) for the full reference.

---

## Launch Tools

The **Launch Tools** button in the toolbar starts CS2 with your addon loaded and the configured launch options. If `-asset` is in your launch options, the button label changes to **Edit map** to reflect that Hammer will open instead of the game.

Configure launch options with the **Launch Settings** button.
