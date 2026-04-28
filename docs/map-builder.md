# Map Builder

Compile CS2 maps without leaving Hammer5Tools. It handles presets, batch compiling, and baking cubemaps, all while showing the output in real-time.

## Overview

The Map Builder wraps `resourcecompiler.exe` in a GUI so you can configure build flags, save them as named presets, queue multiple maps, and monitor progress without leaving the tool. After a successful build the map is optionally loaded straight into the game engine.

---

## Interface Layout

The window is split into two panels by a resizable splitter.

| Panel | Contents |
|---|---|
| **Left** | Preset list, Build Settings, System Monitor |
| **Right** | Compilation output log |

A status bar at the bottom shows the elapsed compile time (live, with animated dots) or the duration of the last completed build.

---

## Presets

Presets store a complete set of build flags so you can switch between compile configurations with one click.

### Built-in presets

| Preset | Description |
|---|---|
| **Fast Compile** | No lighting, physics, vis, or nav — quick geometry test |
| **Full Compile** | All passes enabled at High lighting quality |
| **Lighting Only** | Bakes lighting at Ultra quality, skips everything else |
| **Entities Only** | Updates entity data only, world geometry is untouched |

Built-in presets cannot be renamed or deleted.

### Custom presets

Click **+** at the bottom of the preset list to create a new preset from the current settings. Right-click any preset button to get:

- **Save Changes** — write the current settings back into this preset
- **Rename** — give the preset a new name (custom presets only)
- **Delete** — remove the preset permanently (custom presets only)

Presets are stored inside the tool's global settings file — they carry over between addon projects.

---

## Build Settings

### Map Path

Pick one or more `.vmap` files. Separate multiple paths with `;` to queue a batch. The tool processes each map sequentially using a single `resourcecompiler.exe` call per map.

### World

| Setting | Flag | Description |
|---|---|---|
| Build World | `-world` | Compile world geometry |
| Entities Only | `-entities` | Skip world, update entities only |
| Build Vis Geometry | — | Include visibility geometry |
| No Settle | `-nosettle` | Skip physics settling pass |

### Lightmapping

| Setting | Flag | Description |
|---|---|---|
| Bake Lighting | `-bakelighting` | Run the vrad3 lightmapper |
| Max Resolution | `-lightmapMaxResolution` | Maximum lightmap texel resolution (default 512) |
| Quality | `-lightmapVRadQuality` | 0 = Low · 1 = Medium · 2 = High · 3 = Ultra |
| Compression | — | Enable lightmap texture compression |
| Filtering | `-lightmapDisableFiltering` | Noise-removal filter (on by default) |
| No Light Calculations | `-disableLightingCalculations` | Skip vrad entirely (geometry pass only) |
| VRad3 Large Block Size | `-vrad3LargeBlockSize` | Use larger bake blocks (may improve throughput on some hardware) |

When lighting is disabled, `-nolightmaps` is passed instead.

### Physics

| Setting | Flag | Description |
|---|---|---|
| Build Physics | `-phys` | Compile physics collision mesh |
| Legacy Collision Mesh | `-legacycompilecollisionmesh` | Use the old collision compiler |

### Visibility

| Setting | Flag | Description |
|---|---|---|
| Build Vis | `-vis` | Run the PVS visibility compiler |
| Debug Vis Geo | `-debugvisgeo` | Output debug vis geometry |

### Navigation

| Setting | Flag | Description |
|---|---|---|
| Build Nav | `-nav` | Generate navigation mesh |
| Nav Debug | `-navdbg` | Include debug nav data |
| Grid Nav | `-gridnav` | Use grid-based nav generation |

### Audio

| Setting | Flag | Description |
|---|---|---|
| Build Reverb | `-sareverb` | Bake room reverb impulse responses |
| Build Paths | `-sapaths` | Compile audio occlusion paths |
| Bake Custom Audio | `-sacustomdata` | Bake custom audio zone data |
| Audio Threads | `-sareverb_threads` / `-sapaths_threads` | Thread count for audio passes (defaults to main thread count) |

### After Build

| Setting | Description |
|---|---|
| Load in Engine After Build | Sends `map_workshop <addon> <map>` via netcon once compilation finishes |
| Build Cubemaps | Queue a cubemap bake for this map immediately after the geometry compile |

---

## Threads

Set to `-1` (default) to auto-detect — the tool uses `os.cpu_count()`. Set a positive integer to cap thread usage.

---

## Batch Compilation

Add multiple `.vmap` paths separated by `;` in the Map Path field. The tool:

1. Logs a batch header showing how many maps are queued
2. Calls `resourcecompiler.exe` once per map in order
3. Logs per-map success/failure and elapsed time
4. Moves to the next map regardless of whether the previous one failed

---

## Cubemap Building

Cubemaps can be baked automatically after compilation by enabling **Build Cubemaps** in the settings, or by queuing maps manually.

The bake flow (handled by `BuildCubemapsThread`):

1. Launches CS2 in tools mode (no map on the command line)
2. Waits up to **3 minutes** for the netcon TCP port to become reachable
3. Waits up to **5 minutes** for `CSGO_GAME_UI_STATE_MAINMENU` (main menu ready)
4. Saves the current value of `r_always_render_all_windows` then forces it to `true`
5. For each map in the cubemap queue:
   - Sends `map_workshop <addon> <map>` and waits for `Host activate: Loading`
   - Waits 5 seconds for the game to stabilize
   - Sends `buildcubemaps` and listens for `Re-loading map`
   - If the netcon connection drops during baking, reconnects and confirms completion
6. Restores `r_always_render_all_windows` to its original value
7. Leaves CS2 running

> [!NOTE]
> CS2 must be launched with `-netconport 2121` for cubemap baking to work. This is configured in the tool's global settings.

---

## Skybox Map Rules

Any map whose filename ends with `skybox` is automatically treated differently:

- `-nav` is **disabled**
- `-vis` is **disabled**
- `lightmapMaxResolution` is **capped at 2048**

The output log will show a note when a skybox map is detected.

---

## Output Log

Every line from `resourcecompiler.exe` stdout is streamed live into the output panel. Right-click any line for a context menu to copy the text.

Log lines are colour-coded by severity:

| Colour | Meaning |
|---|---|
| White | Informational output |
| Yellow | Warnings |
| Red | Errors |
| Green | Success messages |
| Grey | Phase/section separators |

---

## Aborting a Build

Click **Abort** to stop the current compile. The tool sends `taskkill /F /T` to the `resourcecompiler.exe` process tree. If a cubemap bake is running, the netcon session is also terminated.

Closing the window while a build is active shows a confirmation prompt — choosing **Yes** aborts and hides the window.

---

## System Monitor

The left panel includes a live system monitor showing CPU and RAM usage so you can gauge the impact of the compile on your machine.
