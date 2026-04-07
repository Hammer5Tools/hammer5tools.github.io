# Loading Editor

Create and customize your map's loading experience by managing screenshots, map icons, and descriptions.

## Screenshots Interface

The Screenshots section displays all images found in the `screenshots/Hammer5Tools` directory inside your addon's game folder.

![Screenshot](docs/images/loading_editor/01.png)

### Screenshot Actions

| Action | Description |
| --- | --- |
| **Take Loading Screen Shots** | Sends camera commands to a running CS2 instance via netcon, clears previous loading screen shots, and captures new ones |
| **Take History Shots** | Sends camera commands to CS2 to capture a history snapshot without clearing existing shots |
| **Apply Screenshots** | Processes images from the `LoadingScreen` subfolder and outputs compiled textures to the game's `map_icons/screenshots` folders |
| **Refresh** | Reloads the Timeline tab with the latest history data |
| **Generate GIFs** | Exports all camera sequences from history as animated GIF files |

> [!NOTE]
> **Take Loading Screen Shots** and **Take History Shots** require CS2 to be running with `-netconport 2121` in its launch options.

### Explorer & Timeline Tabs

The screenshots panel has two tabs:

- **Explorer** — shows all images currently in the `screenshots/Hammer5Tools` folder with a live viewport preview. Press **F** to reset the camera position in the preview.
- **Timeline** — shows historical snapshots organised by camera. Select any image to preview it in the shared viewport. Use **Generate GIFs** to export a camera's sequence as a GIF.

### Apply Screenshots Options

| Option | Description |
| --- | --- |
| **Delete Existing** | When enabled, also removes previously compiled `.vtex_c` files from the game directory before processing |
| **Camera Name Mode** | Reads the camera name from the image filename prefix (e.g. `Donut_0000.png` → label `Donut`) and overlays it on the screenshot |

### How Apply Screenshots Works

When you click **Apply Screenshots**, the tool:

1. Clears the `res` folder and existing resolution subfolders under `addon/panorama/images/map_icons/screenshots` (content directory).
2. Reads every image from the `LoadingScreen` subfolder.
3. Scales each image to three resolutions — **1080p**, **720p**, and **360p** — using smooth transformation.
4. Saves the scaled PNG and writes a `.vtex` file for each resolution, then compiles it automatically.

The compiled textures appear in:
```
addon/panorama/images/map_icons/screenshots/{1080p,720p,360p}/  (game directory)
```

Output filenames follow this pattern:

- First image: `{addon_name}_png`
- Subsequent images: `{addon_name}_{number}_png`

> [!WARNING]
> The game supports a maximum of **10** screenshots. Adding more than 10 images will trigger a warning and the extras will be ignored by CS2.

## Map Icon

The **Map Icon** section lets you set a custom SVG icon that appears next to your map in the CS2 UI.

- Drag and drop an `.svg` file onto the icon drop zone to preview it.
- Click **Apply Icon** to copy the SVG to `addon/panorama/images/map_icons/map_icon_{addon_name}.svg` (content directory).
- Enable **Fit Viewbox** to automatically rescale the SVG viewBox to its content bounds before copying.

## Descriptions

Add a rich-text description that players see on the loading screen.

- Type your description in the text field. Supports multi-line text.
- Click **Apply Description** to write the file to `game/csgo_addons/{addon_name}/maps/{addon_name}.txt`.

The file is written with a `COMMUNITYMAPCREDITS:` header followed by your description text.