# SourcePorter

An automated migration and conversion suite for bringing legacy GoldSrc and Source 1 maps and assets into Counter-Strike 2 (Source 2).

---

## Overview

Porting classic maps from CS:S, CS:GO, Half-Life, or TF2 to Source 2 traditionally required hours of manual BSP decompilation, texture re-exporting, material rewriting (`.vmt` to `.vmat`), and model rebuilding (`.mdl` to `.vmdl`).

**SourcePorter** automates this entire pipeline inside Hammer5Tools:
- **Map Decompilation & Conversion**: Converts `.bsp` level files into clean Source 2 `.vmap` files via integrated `bspsrc`.
- **Model Pipeline**: Decompiles `.mdl` models and automatically generates `.vmdl` files with collision hulls and material bindings.
- **Material & Texture Pipeline**: Converts `.vmt` materials to modern Source 2 `.vmat` files and converts `.vtf` textures to PNG/TGA/`.vtex`.
- **"Find Missing" Auto-Repair**: Scans converted assets and maps for missing textures, materials, or models, allowing one-click batch importing.
- **Entity Remapping**: Automatically updates legacy entity names, inputs/outputs, and properties to their Source 2 equivalents.

---

## Launching SourcePorter

Open the tool via **Utilities > SourcePorter** in the Hammer5Tools bottom bar.

---

## Interface Sections

The SourcePorter window is split into configuration sections and an embedded live log:

| Section | Description |
|---|---|
| **Source Game / Content Path** | Path to the legacy game directory (e.g. `csgo/`, `cstrike/`, or custom asset folder). |
| **Target Addon** | The CS2 addon where converted assets and maps will be written. |
| **Conversion Options** | Checkboxes controlling map conversion, asset extraction, texture scaling, and material generation. |
| **Actions Bar** | Buttons for **Port Map**, **Import Assets**, **Find Missing**, and **Clean Cache**. |
| **Output Console** | Live output stream displaying extraction progress, warnings, and conversion reports. |

---

## Step-by-Step Workflow

### 1. Porting a Map (`.bsp` to `.vmap`)
1. Select the **Source Game** or browse to the folder containing your legacy game assets.
2. Select your **Input `.bsp` File**.
3. Choose your **Target CS2 Addon**.
4. Configure options:
   - **Convert Brushes to Meshes**: Converts brush geometry into editable Source 2 meshes.
   - **Extract Embedded Assets**: Pulls custom textures and models packed inside the BSP's Pakfile (bspzip) lump.
   - **Translate Entities**: Automatically replaces `prop_static`, `light`, `env_soundscape`, and trigger entities with Source 2 counterparts.
5. Click **Port Map**.
6. The resulting `.vmap` file is written directly to `content/csgo_addons/<addon>/maps/`.

---

### 2. Resolving Missing Assets ("Find Missing")
Legacy maps often reference models and materials located across base game VPKs.

1. Click **Find Missing** in SourcePorter.
2. SourcePorter scans the generated `.vmap` and `.vmdl` files for broken asset references.
3. An **Asset Import Dialog** appears with a categorized list of missing assets (e.g. `materials/models/props/crate.vmt`, `models/props/crate.mdl`).
4. Click **Import Assets** — SourcePorter will extract and convert every listed dependency from the legacy source directory directly into your addon folder.

---

### 3. Standalone Asset Importing
You can also import specific Source 1 models or materials without porting a whole map:
1. Click **Import Assets**.
2. Paste a list of relative Source 1 file paths (one per line):
   ```text
   materials/concrete/wall01.vmt
   models/props_c17/bench01.mdl
   ```
3. Click **Import Assets**. SourcePorter extracts the models, recompiles them as `.vmdl`, parses their `.vmt` materials into `.vmat`, and exports textures.

---

## Technical Details

- **Material Translation**: Translates `$basetexture`, `$bumpmap`, `$phong`, `$envmap`, `$translucent`, and `$alphatest` shader parameters into modern Source 2 blend/complex shaders (`vr_complex.vfx`).
- **Texture Packing**: Combines legacy diffuse, normal, and roughness maps into Channel-packed Source 2 texture formats.
- **Collision Preservation**: Extracts collision meshes directly from Source 1 `.phy` lumps and binds them to the generated `.vmdl`.
