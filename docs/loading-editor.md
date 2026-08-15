# Loading Editor

Create and manage loading screen screenshots, map icons, workshop descriptions, and animated development timelines for your Counter-Strike 2 map.

---

## Overview

When players connect to a CS2 map, the game displays high-resolution loading screen screenshots, an SVG map icon, and map credits/descriptions.

The **Loading Editor** automates this setup:
- **NetConsole Camera Captures**: Sends automated camera commands to a running CS2 instance to capture panoramic in-game loading screens.
- **Multi-Resolution Rescaling**: Automatically crops and scales screenshots to **1080p**, **720p**, and **360p**, generating matching `.vtex` files.
- **Map Icon Importer**: Drag-and-drop SVG icon preview with automatic viewBox bounds fitting.
- **Rich-Text Description**: Writes the `COMMUNITYMAPCREDITS:` metadata file.
- **History Timeline & GIF Generation**: Tracks visual map progression over time and exports animated GIF timelapses.

---

## Screenshots Interface

The screenshot panel features two viewing modes:
- **Explorer**: Displays all images currently located in `screenshots/Hammer5Tools` with an interactive 2D preview.
- **Timeline**: Groups snapshots by camera angles across past dates.

### Screenshot Actions

| Action | Description |
|---|---|
| **Take Loading Screen Shots** | Connects to CS2 via NetConsole (`-netconport 2121`), positions cameras, and captures fresh screenshots. |
| **Take History Shots** | Captures a historical snapshot for the development timelapse timeline. |
| **Apply Screenshots** | Scales images, generates `.vtex` descriptors, and compiles multi-resolution textures into the game directory. |
| **Generate GIFs** | Compiles historical camera sequences into animated development GIF timelapses. |

---

## How "Apply Screenshots" Works

1. Clears previously compiled textures in `addon/panorama/images/map_icons/screenshots/`.
2. Reads every source image from the `LoadingScreen/` subfolder.
3. Rescales each image using smooth bi-cubic filtering to:
   - `1080p/` (Full HD)
   - `720p/` (Standard HD)
   - `360p/` (Low Bandwidth)
4. Generates `.vtex` files and compiles them into `.vtex_c` resources automatically.

> [!WARNING]
> Counter-Strike 2 supports a maximum of **10** loading screen images per addon.

---

## Map Icon (SVG)

1. Drag and drop your `.svg` vector icon into the icon drop zone.
2. Enable **Fit Viewbox** to automatically crop unnecessary padding.
3. Click **Apply Icon** — the file is copied to:
   ```text
   content/csgo_addons/<addon>/panorama/images/map_icons/map_icon_<addon>.svg
   ```

---

## Descriptions & Credits

1. Enter your map backstory, author credits, and special thanks in the multi-line text editor.
2. Click **Apply Description**.
3. Hammer5Tools writes the text to:
   ```text
   game/csgo_addons/<addon>/maps/<addon>.txt
   ```
   Formatted with the required `COMMUNITYMAPCREDITS:` header.