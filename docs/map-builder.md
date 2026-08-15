# Map Builder

A compile interface and automation tool for Counter-Strike 2 `.vmap` files. Map Builder wraps `resourcecompiler.exe` with customizable presets, batch queuing, live hardware telemetry, and automated NetConsole cubemap baking.

---

## Overview

Compiling maps in Source 2 involves managing multiple complex command-line flags across world geometry, VRAD3 lightmapping, physics meshes, visibility passes (PVS), navigation meshes, and baked audio acoustics.

**Map Builder** provides a responsive interface with:
- **One-Click Presets**: Fast preview builds, full lighting bakes, geometry-only, or custom configurations.
- **Batch Compilation**: Queue multiple `.vmap` files separated by `;` to compile sequentially.
- **Automated Cubemap Baking**: Launches CS2 in tools mode, activates the map via NetConsole, runs `buildcubemaps`, and confirms bake completion.
- **Hardware Telemetry**: Real-time monitoring of CPU and RAM utilization.
- **Live Output Log**: Real-time color-coded compiler stdout with phase tracking and line filtering.

---

## Interface Layout

| Panel | Description |
|---|---|
| **Left Panel** | Presets list, compilation flags (World, Lighting, Physics, Vis, Nav, Audio), and system telemetry. |
| **Right Panel** | Live streamed terminal output from `resourcecompiler.exe`. |
| **Status Bar** | Live elapsed timer, active phase status, and process control buttons (**Build** / **Abort**). |

---

## Compilation Presets

| Preset | Purpose | Flags Passed |
|---|---|---|
| **Fast Compile** | Quick iteration on geometry | `-world -phys` (Lighting, Vis, Nav disabled) |
| **Full Compile** | Production release build | `-world -phys -vis -nav -bakelighting -lightmapVRadQuality 2` |
| **Lighting Only** | High-quality lightmap bake | `-bakelighting -lightmapVRadQuality 3` |
| **Entities Only** | Fast entity property update | `-entities` |

Click **+** to save the current configuration as a new custom preset.

---

## Detailed Build Settings

### 1. World & Geometry
- **Build World** (`-world`): Compiles static geometry and displacement terrain.
- **Entities Only** (`-entities`): Updates entity properties and entity logic without recompiling world meshes.
- **No Settle** (`-nosettle`): Skips physics settling simulation for dynamic props.

### 2. Lightmapping (VRAD3)
- **Bake Lighting** (`-bakelighting`): Executes the VRAD3 lightmapper.
- **Quality** (`-lightmapVRadQuality`): `0` = Low, `1` = Medium, `2` = High, `3` = Ultra.
- **Max Resolution** (`-lightmapMaxResolution`): Texel density cap (default: 512, capped at 2048 for skyboxes).
- **Filtering** (`-lightmapDisableFiltering`): Noise removal filter on lightmap textures.
- **Large Block Size** (`-vrad3LargeBlockSize`): Optimizes bake throughput on high-core-count CPUs.

### 3. Visibility & Navigation
- **Build Vis** (`-vis`): Computes Potential Visible Sets (PVS) for occlusion culling.
- **Build Nav** (`-nav`): Generates CS2 bot navigation mesh.
- **Grid Nav** (`-gridnav`): Uses grid-based nav generation algorithm.

### 4. Audio Acoustics
- **Build Reverb** (`-sareverb`): Bakes acoustic impulse responses for spatial reverb.
- **Build Paths** (`-sapaths`): Computes sound occlusion and diffraction paths around geometry.

---

## Automated Cubemap Baking

When **Build Cubemaps** is enabled in settings:
1. Map Builder completes the geometry and lighting compilation.
2. Launches CS2 in tools mode (`-netconport 2121`).
3. Connects via NetConsole and waits for `CSGO_GAME_UI_STATE_MAINMENU`.
4. Sends `map_workshop <addon> <map>` to load the map into memory.
5. Issues `buildcubemaps` and verifies cubemap `.vtex_c` generation.
6. Restores render state and leaves the game ready for testing.

---

## Batch Map Compilation

To compile multiple maps sequentially:
1. In the **Map Path** input, enter paths separated by a semicolon `;`:
   ```text
   maps/de_dust2.vmap;maps/de_dust2_skybox.vmap;maps/aim_map.vmap
   ```
2. Map Builder will execute builds sequentially and log per-map success and timing metrics.

---

## Special Skybox Rules

Any map with a filename ending in `skybox` is automatically optimized:
- `-nav` is automatically disabled.
- `-vis` is automatically disabled.
- `lightmapMaxResolution` is capped at 2048.
