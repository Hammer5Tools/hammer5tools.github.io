# Cleanup & Maintenance

Tools to sweep unreferenced assets from your addon directory and purge corrupted lightmap caches to keep projects lean and error-free.

---

## Overview

Over the course of developing a Counter-Strike 2 map, hundreds of test models, unused textures, old sound variations, and orphaned material files accumulate in the addon folder.

Hammer5Tools provides two essential cleanup utilities:
1. **Cleanup Content**: Recursively scans `.vmap` dependencies and removes unreferenced source assets from `content/csgo_addons/<addon>/`.
2. **Cleanup _vrad3 Cache**: Deletes stale lightmap bake caches from `game/csgo_addons/*/_vrad3/` to resolve baking artifacts and force full lighting recalculations.

---

## 1. Cleanup Content Tool

Access via **Utilities > Cleanup Content** in the bottom toolbar.

### How It Works
1. Parses `maps/<addon_name>.vmap` and resolves all active entity references, brush materials, models, SmartProps, sounds, and blend layers.
2. Scans every file inside the addon's `content/` folder.
3. Compares the two lists and flags files that have **zero references** as deletion candidates.

### Filters & Selection
- **Search Bar**: Substring search by path/filename.
- **File Type Filter**: Filter candidate list by extension (`.vmat`, `.vtex`, `.vmdl`, `.vsnd`, `.vsmart`).
- **File Table**: Multi-select rows with checkboxes to selectively protect specific files.
- **Stats Bar**: Displays total selected files, visible files, and total reclaimed disk space.

### Actions
- **Delete Selected Files**: Permanently deletes checked files from the content directory.
- **Recalculate**: Re-parses the `.vmap` from disk if you just saved new changes in Hammer.

> [!WARNING]
> File deletion is permanent. Make sure to commit your work to Git or create an export archive before deleting files.

---

## 2. Cleanup `_vrad3` Lightmap Cache

Access via **Utilities > Cleanup _vrad3 cache** in the bottom toolbar.

### Why Clean VRAD3 Cache?
When iteratively baking lightmaps with VRAD3, cached texels are stored in:
```
game/csgo_addons/<addon_name>/_vrad3/
```
If you make major changes to world geometry, move light sources, or encounter strange lighting seams/corruption, the cached lightmap texels may not invalidate properly.

### Execution
1. Click **Utilities > Cleanup _vrad3 cache**.
2. A confirmation prompt displays all detected `_vrad3` directories across your installed addons.
3. Confirm deletion — Hammer5Tools safely deletes the cache folders.
4. The next compile will perform a clean, 100% fresh lightmap bake without ghost shadows or stale artifacts.
