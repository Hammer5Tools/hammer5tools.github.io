# UnrealPorter

A bridge and export pipeline for converting Unreal Engine 5 levels, static meshes, PBR materials, textures, and lighting into Source 2 and Counter-Strike 2.

---

## Overview

**UnrealPorter** provides an automated pipeline to transfer UE scenes and assets directly into Counter-Strike 2 Workshop addons.

Key capabilities:
- **Level & Actor Conversion**: Converts Unreal Engine `.umap` levels into Source 2 `.vmap` files, placing all meshes, lights, decals, and instances at exact world transforms.
- **Static Mesh Pipeline**: Converts `.uasset` static meshes to `.fbx` and builds `.vmdl` files complete with collision shapes and material slot bindings.
- **PBR Material Converter**: Translates Unreal Engine material graphs and material instances into Source 2 `.vmat` files using standard PBR shaders (`vr_complex.vfx`).
- **Texture Extraction & Packing**: Extracts diffuse/albedo, normal maps, roughness, metallic, ambient occlusion, and opacity masks, packing them for Source 2's texture pipeline.
- **Lighting Translation**: Converts UE Directional Lights, Point Lights, Spot Lights, and Rect Lights into Source 2 light entities (`light_environment`, `light_omni`, `light_spot`, `light_rect`) with lumen/candela intensity curve adjustments.
- **Foliage & Instancing**: Converts UE Foliage and Hierarchical Instanced Static Meshes into `.vsmart` SmartProps or discrete instance groups.
- **UE Plugin Bridge**: Automates export directly from within the Unreal Engine Editor using background Python automation scripts.

---

## Launching UnrealPorter

Open the tool via **Utilities > UnrealPorter** in the Hammer5Tools bottom bar.

---

## Setup & Prerequisites

1. **Unreal Engine 5** installed (UE 5.0 through 5.5 supported).
2. **Target CS2 Addon** selected in Hammer5Tools.
3. **Bridge Installation**:
   - In UnrealPorter, select your Unreal Engine installation directory.
   - Click **Install Script into Project** to place the automation bridge scripts into your UE project folder.

---

## Interface & Configuration Tabs

UnrealPorter organizes conversion into modular tabs:

### 1. Paths & Project Selection
- **Unreal Engine Root**: Path to your UE engine installation (e.g. `C:\Program Files\Epic Games\UE_5.4`).
- **Unreal Project (`.uproject`)**: Path to the `.uproject` file you wish to export from.
- **Target Addon**: The destination CS2 addon in `content/csgo_addons/`.

### 2. Level & Scene Settings
- **Level (`.umap`) Selection**: Choose the specific map/level to export.
- **Unit Scale**: Default is `1.0` (Unreal 1 cm = Source 2 1 inch scaling conversion can be toggled).
- **Coordinate Conversion**: Automatically flips coordinates between UE (Z-up, Left-Handed) and Source 2 (Z-up, Right-Handed).

### 3. Mesh & Geometry Options
- **Generate Collision Meshes**: Automatically creates simple convex collision hulls or uses UE custom collision hulls.
- **FBX Mesh Flattening**: Merges multi-part static mesh LODs and applies transforms.
- **Skip Nanite Proxy Geometry**: Exports high-poly source meshes instead of degraded runtime Nanite proxies.

### 4. Materials & Shader Schemas
- **Master Material Mapping**: Maps UE master material parent graphs to Source 2 shader schemas.
- **Texture Packing Mode**: Standard Source 2 packing (RGB = Color, A = Roughness/Alpha, etc.).
- **Decal Handling**: Automatically maps UE Decal actors to Source 2 projected decal entities.

---

## Execution Workflow

1. Click **Analyze Project**: UnrealPorter surveys the project and lists all meshes, materials, textures, and levels without booting the full editor.
2. Review the detected assets and uncheck any assets you do not wish to port.
3. Click **Export & Convert**:
   - The background worker executes the Unreal Engine automation script.
   - Assets are exported to the temporary staging directory.
   - Hammer5Tools converts geometry to `.vmdl`, textures to `.vtex`, materials to `.vmat`, and the level to `.vmap`.
4. Open Hammer Editor via **Edit Map** to load your newly converted level!

---

## Cache Management

Converted raw assets are staged in:
```
content/csgo_addons/<addon>/hammer5tools/unrealporter/tmp/
```
Click **Clean Cache** at any time to remove temporary files without affecting your compiled addon resources.
