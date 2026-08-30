# Addon Export

The addon selector changes which CS2 addon Hammer5Tools reads and edits. Addon commands are in the menu beside the selector.

## Addon actions

Choose **Create new addon** to create an addon from a preset. Enter the addon name, select a preset, then click **Create Addon**.

Choose **Import addon** to add an existing addon. Choose **Delete addon** to remove the selected addon. Check the addon name and path before confirming deletion.

Use **Open content folder** or **Open game folder** to open the selected addon's files. Use **Launch Addon** to start the CS2 tools for that addon.

## Launch parameters

Choose **Edit launch parameters** to change how the CS2 tools start. The dialog includes **Custom commands**, **Gpu ray tracing**, **Open vmap**, **Open tools**, **Steam**, **Retail**, and **No insecure**.

Read the command preview before saving the parameters.

## Export an addon

Choose **Export addon** from the addon menu. The exporter creates an archive from the selected addon's files.

Use the content options to skip non-default content folders or restrict content dependencies to selected VMAP files. Click **Add VMap File...** to add maps to that list.

Use the compiled-file options to include maps, materials, textures, or models from the game folder. **Ignore VCS files** leaves `.git`, `.gitignore`, and `.diversion` data out of the archive.

Review the checked files, file count, and total size. Start the export and select the archive destination.

> [!WARNING]
> **Delete addon** removes addon files. Confirm that the selected addon is backed up or committed before deleting it.
