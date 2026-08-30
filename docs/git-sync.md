# Git

Git tracks changes in the active addon. The Git button shows local changes and commits waiting to move between your computer and the server.

## Set up a repository

Click the Git button when the addon has no repository. Enter the branch name and an optional server URL.

Keep **Add a .gitignore for autosaves, backups and build leftovers** checked to omit generated work files. Keep **Store maps, models and textures with Git LFS** checked when the repository uses Git LFS.

Click **Create repository**. Nothing is sent to the server until the first sync.

## Sync changes

Click the Git button to open **Sync changes**. Check the files you want to send.

Use **All**, **None**, or **Maps only** to change the selection. Enter a message that describes the selected changes. When no local files are selected, the action changes to **Pull only**.

Click **Sync**. Hammer5Tools commits the selected files, fetches the server branch, merges incoming work, and pushes the result.

Unchecked changes stay on your computer.

## Status badges

The yellow badge counts uncommitted local changes. The red badge counts commits waiting to be pulled or pushed. A warning badge means the addon has no Git repository.

## Resolve conflicts

The **Resolve conflicts** dialog lists files changed on both sides.

- **Merge both** runs the VMAP merge for a supported map.
- **Keep Local** keeps your file and discards the server version.
- **Keep Server** keeps the server file and discards your version.
- **Open** opens the file for inspection.

Resolve every listed file, then continue the sync.

## Merge behavior

The VMAP merge compares map objects from the local file, server file, and common ancestor. If an object cannot be resolved, choose which side to keep.

## Command-line use

The utility accepts two map paths, with optional base and output paths:

```text
python Hammer5ToolsGUI/gui/gitvmapmerge.py ours.vmap theirs.vmap --base base.vmap --output merged.vmap
```

Use `--primary ours` or `--primary theirs` when one side must win every unresolved conflict. Test a new merge configuration on copied files.

## Git configuration

Point Git's merge-driver command to the script in your local installation. Add `*.vmap merge=vmapmerge` to the repository's `.gitattributes` file.
