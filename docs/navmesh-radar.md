# NavMesh Radar

NavMesh Radar generates editable radar faces for the active addon map.

## Before you begin

Set the Counter-Strike 2 path and active addon. The tool requires the addon's compiled VPK at `game/csgo_addons/<addon>/maps/<addon>.vpk` and its main VMAP at `content/csgo_addons/<addon>/maps/<addon>.vmap`.

Open it from **Utilities > NavMesh Radar**.

## Source modes

Choose one source mode:

- **NavMesh**: Generates radar faces from the navmesh. The **Remove offset** option controls whether a 16-unit offset is removed.
- **Baked bomb damage**: Generates radar faces from baked bomb-damage data. This mode provides **Collapse faces** and **Collapse faces into N-gons** options.

## Generate

1. Confirm the displayed compiled VPK and main map paths.
2. Choose the source mode and its options.
3. Keep **Add prefab entity to main map** enabled to add a reference to the generated radar map.
4. Click **Generate**.

The tool reports the generated map path and number of editable faces. If the main map already references the generated radar, the prefab option is disabled.
