# Quick Start

Get up to speed with Hammer 5 Tools. This guide walks through the primary workflow for every tool and editor in the suite.

---

## 1. Initial Setup

1. **Install**: Run the installer (`Hammer5Tools-stable-Setup.exe`) or extract the release archive.
2. **First Launch**: Hammer5Tools automatically detects your Counter-Strike 2 installation. If not found, set the path manually via **Settings > General > CS2 Path**.
3. **Select Addon**: Pick an active addon from the dropdown in the bottom toolbar. If none exist, click **Addon Actions (`...`) > Create New Addon**.
4. **File Associations**: When prompted, enable file associations so double-clicking `.vsmart` or `.vdata` files opens them directly in Hammer5Tools.

> [!NOTE]
> Hammer5Tools runs as a single-instance application and minimizes to the system tray by default. Right-click the tray icon and choose **Exit** to shut it down completely.

---

## 2. Audio & Sound Design Workflow

### Editing Sound Events (SoundEvent Editor)
1. Switch to the **SoundEvent Editor** tab.
2. The active addon's `soundevents_addon.vsndevts` file is loaded automatically.
3. Click **Add SoundEvent** (or duplicate an existing preset).
4. Add your `.vsnd` files, set volume, pitch, attenuation curves, and click **Save** (`Ctrl+S`).

### Preparing Audio Loops (Audio Editor)
1. Switch to the **Audio Editor** tab.
2. Double-click a sound file in the sidebar explorer.
3. Select regions to trim, fade-in/out, or normalize.
4. Press `M` to place **RIFF Cue Markers** at the start and end of loop sections for perfect in-game repeating audio.
5. Save with `Ctrl+S`.

---

## 3. Procedural Prop Creation (SmartProp Editor)

1. Switch to the **SmartProp Editor** tab.
2. Open an existing `.vsmart` / `.vdata` file from the explorer, or press `Ctrl+N` for a new document.
3. Add elements (Models, Groups, Scatter, Fit on Line, Grid) and attach modifiers (Rotators, Translators, Filters).
4. Configure variables in the **Variables** panel to expose user settings inside Hammer.
5. Save with `Ctrl+S` — the asset is compiled immediately for Hammer Editor.

---

## 4. Material Layer Detail Props (DetailProp Editor)

1. Switch to the **DetailProp Editor** tab.
2. The addon's `scripts/detail_prop_types.vdata` file loads automatically.
3. Create a detail type (e.g. `grass_field`), set density and height bounds, and add one or more `.vmdl` variations.
4. Save with `Ctrl+S`.
5. In Hammer's Material Editor, assign your detail prop type to a material blend layer, then paint that material on your terrain and enable **Toggle Grass / Detail Props** in the viewport.

---

## 5. Compiling Maps (Map Builder)

1. Click **Map Builder** (lightbulb icon) in the toolbar.
2. Select a preset (**Fast Compile**, **Full Compile**, **Lighting Only**, **Entities Only**) or configure custom flags.
3. Select your `.vmap` file (or separate multiple paths with `;` for batch builds).
4. Enable **Build Cubemaps** if you want automated cubemap baking via NetConsole after compilation.
5. Click **Build**. Telemetry and compiler logs stream live in the output window.

---

## 6. Porting Legacy & External Assets

- **SourcePorter (GoldSrc / Source 1 -> Source 2)**: Go to **Utilities > SourcePorter** to decompile `.bsp` maps and convert `.mdl` models, `.vmt` materials, and `.vtf` textures into Source 2 formats. Use **Find Missing** to automatically fix broken dependencies.
- **UnrealPorter (Unreal Engine 5 -> Source 2)**: Go to **Utilities > UnrealPorter** to transfer entire `.umap` levels, static meshes, PBR textures, material instances, and light entities into your CS2 addon.

---

## 7. Version Control & Team Collaboration (Git Sync)

1. Connect your addon repository to Git.
2. The **Sync Button** in the toolbar tracks ahead/behind commit statuses and modified files.
3. Click the Sync button to **Commit**, **Pull**, or **Push**.
4. Teammates editing the same `.vmap` level concurrently are automatically merged using Hammer5Tools' intelligent **VMAP 3-Way Merge Driver**.

---

## 8. Addon Cleanup & Maintenance

- **Content Cleanup**: Click **Utilities > Cleanup Content** to find and delete unreferenced junk assets in your addon.
- **Lightmap Cache Cleanup**: Click **Utilities > Cleanup _vrad3 cache** to purge stale lightmap bakes across all addons and force a full rebuild.
