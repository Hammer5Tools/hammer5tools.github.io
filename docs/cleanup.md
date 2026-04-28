# Cleanup

Clean out junk files from an addon folder. It just scans the `\.vmap` to see what's actually being used and helps get rid of the rest.

## Overview

The Cleanup tool walks the addon content folder, compares every file against the dependencies resolved from the map's `.vmap` file, and presents a list of files that are not referenced anywhere. Review, filter, and delete them in bulk.

> [!WARNING]
> Deletion is permanent and **cannot be undone**. Double-check the file list before confirming.

> [!NOTE]
> After running Cleanup, run **Clean Up** inside the Asset Browser in the Hammer editor to remove stale compiled assets from the game directory.

---

## How It Works

1. The tool parses `maps/<addon_name>.vmap` and recursively resolves all asset references (models, materials, textures, sounds, etc.).
2. It scans every file inside the addon content directory.
3. Files that appear in the directory but are **not** referenced by the vmap — directly or transitively — are listed as candidates for deletion.

> [!WARNING]
> `.vmdl` files that do **not** contain a `DefaultMaterialGroup`, `ReplaceMaterial`, or `MaterialGroup` property have no material references. Their material dependencies will not be detected, and those materials may be listed as junk even if they are used.

---

## Interface

### Filters

| Control | Description |
|---|---|
| **Search** | Filter rows by file path (case-insensitive substring match) |
| **File Type** | Show only files with a specific extension (e.g. `.vmat`, `.vtex`, `.vmdl`) |

Both filters work together and update the table in real time.

### File Table

The table has two columns:

| Column | Description |
|---|---|
| **File Path** | Path relative to the addon content directory. Each row has a checkbox — checked rows will be deleted. |
| **Size** | File size formatted as KB / MB |

The table supports multi-row selection, sorting by either column, and a right-click context menu:

| Action | Description |
|---|---|
| **Check Selected** | Mark the selected rows for deletion |
| **Uncheck Selected** | Unmark the selected rows |
| **Open in Explorer** | Open the folder containing the first selected file in Windows Explorer |

### Stats Bar

Shown at the bottom of the table:

```
Selected: 42 | Visible: 42/187 | Size: 14.3 MB
```

- **Selected** — number of checked rows (files that will be deleted)
- **Visible** — rows currently shown by the active filter vs. total rows
- **Size** — combined size of all checked files

---

## Actions

### Recalculate

Re-scans the addon directory and re-parses the vmap from disk. Use this if changes have been made to the map or assets since opening the dialog.

### Delete Selected Files

Deletes every checked file from the addon content directory. A confirmation dialog shows the file count before proceeding. Files that fail to delete (e.g. locked by another process) are skipped and a warning is printed to the console.

---

## Tips

- Use the **File Type** filter to target specific asset types first — for example, clean up unused `.vtex` files before touching `.vmdl` files.
- If shared assets across multiple maps, only run Cleanup against an addon that has a single primary map, or manually uncheck shared assets before deleting.
- Run **Recalculate** after making layout changes in Hammer to get a fresh list before deleting.
