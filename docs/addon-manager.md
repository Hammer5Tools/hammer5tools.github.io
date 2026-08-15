# Addon Manager & Exporter

Manage, create, package, export, and share Counter-Strike 2 Workshop addons.

---

## Overview

A Counter-Strike 2 addon is split between two separate directory structures:
- **`content/csgo_addons/<addon>/`**: Source editable assets (uncompiled `.vmap`, `.vmdl`, `.vmat`, `.vsmart`, raw `.wav`, `.png`, scripts).
- **`game/csgo_addons/<addon>/`**: Compiled binary assets (`.vmap_c`, `.vmdl_c`, `.vmat_c`, `.vsnd_c`, `_vrad3` lightmap caches).

The **Addon Manager & Exporter** inside Hammer5Tools manages both directories simultaneously, providing tools to create new addons from templates, package projects into clean distribution archives, import community projects, and quickly navigate folders.

---

## Addon Actions Menu

Click the **`...` (Addon Actions)** button next to the Addon Selector to open the action menu:

| Action | Description |
|---|---|
| **Edit Launch Parameters** | Configures command-line arguments for CS2 and Hammer launches (`-asset`, `-netconport`, `-tools`, etc.). |
| **Create New Addon** | Opens the wizard to generate a new CS2 addon structure. |
| **Delete Addon** | Permanently removes an addon from both `content/` and `game/` directories. |
| **Export Addon** | Packages the addon into a distributable archive or release folder. |
| **Import Addon** | Unpacks and installs an addon archive into your local CS2 installation. |
| **Open Content Folder** | Opens `content/csgo_addons/<addon>` in Windows File Explorer. |
| **Open Game Folder** | Opens `game/csgo_addons/<addon>` in Windows File Explorer. |

---

## Creating a New Addon

1. Select **Create New Addon** from the Addon Actions menu.
2. Enter an **Addon Name** (lowercase, underscores, no spaces, e.g. `de_canals_cs2`).
3. Select an optional template:
   - **Empty Addon**: Creates minimum required directory layout.
   - **Template with Sample Assets**: Includes default soundevent templates, loading screen folders, and base configs.
4. Click **Create Addon**. Hammer5Tools creates both content and game directories and switches active context to the new addon immediately.

---

## Exporting an Addon (Packager)

When preparing to share your map with playtesters, collaborators, or releasing source assets on GitHub, you need a clean archive without bloated temporary caches or build artifacts.

Open **Export Addon** from the menu to access the Export Dialog:

### Export Modes
- **Full Source Package (Content & Game)**: Exports all source assets and compiled binaries for complete testing.
- **Source Assets Only (`content/`)**: Exports editable project assets (ideal for Git repositories or portfolio sharing).
- **Compiled Assets Only (`game/`)**: Exports only the runtime compiled files needed to run the map in CS2.

### Exclusion Filters
The exporter automatically filters out junk and cache files:
- Version control folders (`.git/`, `.svn/`, `.idea/`, `.vscode/`)
- Temporary build files and dumps
- `_vrad3/` lightmap cache folders (can be regenerated on compile)
- Unused raw bake textures

### Output Format
- **ZIP Archive**: Single compressed `.zip` package.
- **Folder**: Extracted directory structure ready for copy-pasting.

---

## Importing an Addon

1. Select **Import Addon** from the menu.
2. Browse to the downloaded `.zip` archive or addon folder.
3. Hammer5Tools validates the internal layout (verifies `content/` and `game/` structures).
4. Files are extracted to your CS2 installation directory, and the addon appears immediately in the Addon Selector dropdown.

---

## Deleting an Addon

1. Select the addon you wish to delete in the toolbar dropdown.
2. Choose **Delete Addon** from the Addon Actions menu.
3. A confirmation prompt will list the directories that will be removed:
   - `content/csgo_addons/<addon>`
   - `game/csgo_addons/<addon>`
4. Confirm deletion.

> [!CAUTION]
> Addon deletion is permanent. Make sure to export a backup or commit your work to Git before deleting.
