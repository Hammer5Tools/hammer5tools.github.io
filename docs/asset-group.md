# AssetGroup Maker

Batch-create hundreds of Source 2 models (`.vmdl`), materials (`.vmat`), and configuration scripts simultaneously using dynamic text templates.

---

## Overview

When setting up large asset libraries (e.g. modular building kits, trim sheets, prop collections), manually authoring individual `.vmdl` or `.vmat` files is tedious.

The **AssetGroup Maker** reads source folders, applies global and local variable substitutions to user-defined template strings, and generates complete Source 2 asset files in bulk.

---

## Interface Layout

| Area | Description |
|---|---|
| **Explorer (Left)** | Manage configuration profiles and select target source asset directories. |
| **Editor (Center)** | Template editor containing the base KV3 file structure with replacement tokens. |
| **Process Actions (Right)** | Define matching algorithms, ignore lists, and trigger batch generation. |

---

## Dynamic Replacement Tokens

The editor evaluates special macro variables when generating each asset:

| Variable | Description |
|---|---|
| `#$ASSET_NAME$#` | Name of the current source file being processed (without extension). |
| `#$FOLDER_PATH$#` | Relative folder path inside the addon content directory. |
| `#$ADDON_NAME$#` | Current active addon name. |

### Example Template (Model Generation)
```kv3
<!-- kv3 encoding:text:version{e21c7f3c-8a33-41c5-9977-a76d3a32aa0d} format:generic:version{7412167c-3596-4313-a41f-70c3226768f9} -->
{
    rootNode = 
    {
        _class = "RootNode"
        children = 
        [
            {
                _class = "RenderMeshList"
                children = 
                [
                    {
                        _class = "RenderMeshFile"
                        filename = "#$FOLDER_PATH$#/#$ASSET_NAME$#.fbx"
                    }
                ]
            }
        ]
    }
}
```

---

## Processing Algorithms

- **One-to-One**: Generates one output file for every matched source file.
- **Referenced File**: Automatically re-generates assets whenever the referenced source template changes.
- **Ignore List**: Excludes specific patterns (e.g. `*_lod*`, `*.tmp`).