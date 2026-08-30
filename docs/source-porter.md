# SourcePorter

SourcePorter converts a Source 1 BSP map and its assets into the active CS2 addon.

Open it from **Utilities > SourcePorter**.

## Port a map

1. Select the BSP under **Source Map**.
2. Select the **Target Addon**.
3. Choose the geometry, asset, and output options.
4. Set **Parallel Tool Threads**.
5. Click **Start Porting**.

Click **Stop** to end the running process. Read the console before opening the converted map in Hammer.

## Geometry options

**Generate & use BSP for clean geometry (-usebsp)** uses the BSP geometry during conversion. **Don't merge instances (-usebsp_nomergeinstances)** keeps instances separate. **Collapse prefabs & flatten empty group wrappers** reduces wrapper objects in the converted hierarchy.

## Asset options

**Unpack embedded BSP pakfile content** extracts files stored in the BSP. **Compile asset dependencies (_c files)** compiles imported assets. **Skip dependency importing (-nodeps)** leaves referenced assets out.

**Use KV Filelist import mode** reads a file list with `materials/` and `models/` prefixes. **Auto-repair missing materials & models** repeats the import when missing dependencies are found.

## Output options

**Compile final map (.vmap_c compile)** compiles the converted VMAP. **Compact toolchain log output** reduces console output.

## Repair and asset import

Click **Find Missing** to scan the converted content for missing assets.

Open **Tools > Asset Import...** to import a selected asset set. Use **Import Missing Assets (Repair)...** to import files reported by the repair scan. Use **Clean BSP Content Cache** before rerunning a conversion that contains stale extracted files.

> [!NOTE]
> Open the converted map in Hammer and check materials, models, instances, and entity properties before editing it further.
