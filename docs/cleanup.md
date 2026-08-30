# Cleanup Tool

Cleanup Tool finds content files that are not referenced by the selected addon assets.

Open it from **Utilities > Cleanup Content**.

## Scan

Enable **Scan source mesh files (.fbx, .dmx) for material references** when source meshes contain material names that must be kept.

Click **Open .dirtlist** to load a saved list of files. Use **Search / Filter by name** and **File Type** to narrow the results.

Click **Recalculate** after changing the addon content. The summary shows the scanned files and cleanup candidates.

## Review files

Use the checkboxes to choose files. Right-click a result to select it, deselect it, or open its folder in Explorer.

Click **Verify** to compile the selected assets. The verification dialog reports files that fail compilation. Fix or remove those entries from the selection before deletion.

## Delete files

Click **Delete Selected Files**. Read the confirmation and check the listed paths before continuing.

## Clean the VRAD3 cache

Choose **Utilities > Cleanup _vrad3 cache** to remove cached VRAD3 data for the active addon. Run a new lighting build after clearing it.

> [!WARNING]
> Cleanup deletion changes files on disk. Commit or back up the addon before deleting files.
