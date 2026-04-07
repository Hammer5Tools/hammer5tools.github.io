# Loading Editor

Create and customize your map's loading experience — screenshots, map icon, and description.

## Overview

The Loading Editor automates the entire CS2 loading screen pipeline: it fires camera commands into a live CS2 session to capture screenshots, converts them to the required `.vtex` / `.vtex_c` format at three resolutions, places them in the correct content and game directories, and lets you set a custom SVG map icon and written description.

---

## Screenshots

### Folder Structure

All screenshot work is rooted in the game directory under your addon:

```
game/csgo_addons/{addon_name}/screenshots/Hammer5Tools/
  ├── LoadingScreen/   ← images used by Apply Screenshots
  └── History/
        └── {YYYY-MM-DD_HH-MM-SS}/   ← one folder per Take History Shots session
              └── {CameraName}_{NNNN}.jpg
```

### Actions

| Button | What it does |
|---|---|
| **Take Loading Screen Shots** | Clears `LoadingScreen/`, then sends a full set of camera commands to CS2 via netcon to capture fresh JPEG screenshots into that folder |
| **Take History Shots** | Same as above but saves into a timestamped subfolder inside `History/` — does **not** clear previous shots |
| **Apply Screenshots** | Processes images from `LoadingScreen/` and compiles them into `.vtex_c` textures at 1080p / 720p / 360p |
| **Refresh** | Reloads the Timeline tab from disk |
| **Generate GIFs** | Exports every camera sequence in `History/` as an animated GIF (500 ms/frame, saved to a directory you choose) |

> [!NOTE]
> **Take Loading Screen Shots** and **Take History Shots** require CS2 to be running with `-netconport 2121` in its launch options.

### How Camera Commands Work

The tool reads every `point_camera` entity from your map's `.vmap` file, then sends a batch of CS2 console commands over netcon:

1. Disables the HUD, view model, and Panorama so the screenshot is clean.
2. Teleports the player to each camera's origin (adjusted **−70 units on Z** to match player eye height) and sets the correct angles and FOV.
3. Fires `jpeg_screenshot` for each camera with a prefix matching the camera's `targetname`.
4. After all cameras are done, restores the HUD and noclip state.

### Explorer & Timeline Tabs

Both tabs share a single **viewport** on the right side of the panel.

**Explorer tab** — lists all images in `screenshots/Hammer5Tools/`. Click an image to load it in the viewport. Press **F** to reset the viewport camera.

**Timeline tab** — groups historical shots by camera name, sorted oldest → newest within each group. Each camera entry shows a thumbnail for every timestamped session. Click any image to preview it. Right-click a camera folder for a per-camera **Export to GIF** option.

Camera names are extracted from filenames: `CameraName_NNNN.jpg` → `CameraName` (suffix `_0000` is camera 0, `_0001` becomes `CameraName 1`, etc.).

### Apply Screenshots Options

| Option | Description |
|---|---|
| **Delete Existing** | Also deletes previously compiled `.vtex_c` files from the game directory before processing. Use this when you need a clean rebuild. |
| **Camera Name Mode** | Reads the camera name from the filename prefix (e.g. `Donut_0000.jpg` → `Donut`) and renders it as a white label in the bottom-left corner of each screenshot using the **Bahnschrift** font at ~2.7 % of image height. |

### How Apply Screenshots Works

When you click **Apply Screenshots**, the tool:

1. Deletes the `res/` folder inside the content addon directory if it exists.
2. Clears all files in the `1080p/`, `720p/`, and `360p/` subfolders under:
   `content/csgo_addons/{addon_name}/panorama/images/map_icons/screenshots/`
3. Reads every image from `game/csgo_addons/{addon_name}/screenshots/Hammer5Tools/LoadingScreen/`, sorted alphabetically.
4. Optionally removes existing compiled `.vtex_c` files from the game directory (`Delete Existing`).
5. For each image, scales it to three heights (1080 px, 720 px, 360 px) using smooth transformation. If **Camera Name Mode** is on, overlays the camera label before scaling.
6. Saves the scaled PNG and writes a `.vtex` descriptor for each resolution, then compiles it via ResourceCompiler.

Compiled textures land at:
```
game/csgo_addons/{addon_name}/panorama/images/map_icons/screenshots/{1080p,720p,360p}/
```

Output filenames follow this pattern:

- First image → `{addon_name}_png`
- Subsequent images → `{addon_name}_{index}_png` (index starts at 1)

The `.vtex` format used is `BC7`, `linear` color space, no LOD (`m_bNoLod = true`), max dimension 2048.

> [!WARNING]
> CS2 supports a maximum of **10** loading screen screenshots. Adding more than 10 images triggers a warning. The extras will be ignored by the game.

---

## Map Icon

The Map Icon section sets the custom SVG icon that appears next to your map in the CS2 UI.

- Drag and drop a `.svg` file onto the drop zone to preview it (200 × 200 px preview).
- Only `.svg` files are accepted.
- Click **Apply Icon** to process and copy the SVG to:
  `content/csgo_addons/{addon_name}/panorama/images/map_icons/map_icon_{addon_name}.svg`
- The tool uses `lxml` to rewrite the SVG's `viewBox`, `width`, and `height` to **32 × 32**, composing any existing transforms so the artwork is not distorted. Hidden elements (`display:none`) and Inkscape-specific attributes are stripped automatically.

---

## Descriptions

Add a description that players see on the loading screen.

- Type your text in the plain-text field. Multi-line is supported.
- Click **Apply Description** to write the file to:
  `game/csgo_addons/{addon_name}/maps/{addon_name}.txt`

The file is formatted as:

```
COMMUNITYMAPCREDITS:
{your description text}
```

Any existing description in that file is loaded automatically when the editor opens.

---

## Keyboard Shortcuts

| Shortcut | Context | Action |
|---|---|---|
| **F** | Viewport (Explorer / Timeline) | Reset the preview camera to its default position |
