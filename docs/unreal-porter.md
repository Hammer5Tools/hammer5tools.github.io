# UnrealPorter

UnrealPorter imports Unreal project data into a selected CS2 addon.

Open it from **Utilities > UnrealPorter**.

## Select a project

Select the Unreal project's `.uproject` file and the **Target Addon**. The **Editor Instance** field shows the Unreal Engine installation assigned to that project.

UnrealPorter supports projects assigned to Unreal Engine 4.27 or 5.x. Set a custom Unreal path in Settings when the installation is not detected.

Click **Re-analyze** after changing the project. Analysis reads the available maps, models, materials, textures, and their references.

## Select assets

Click **Select assets** after analysis. Check individual assets in the project tree or filter the list by asset type.

Referenced assets are added to the selection. A selected map brings in its meshes. A selected mesh brings in its materials. A selected material brings in its textures.

## General settings

Enable **Source 2 naming style** to remove Unreal type prefixes, split PascalCase names, and use lowercase Source 2 file names.

The map settings control **Import light**, **Import sky**, **Import cubemaps**, **Import decals**, and **Mirror negative scaled actors**. The mirror option writes a mirrored model for actors whose negative scale would render inside-out in Source 2.

## Models

Set **Unit Scale** to **cm** to keep Unreal's unit count or **inch** to convert centimeters to inches. Set **Apply Mode** to **FBX** to scale the geometry or **Vmdl** to store the import scale in the VMDL.

Enable **LODs** to import `_LOD0` through `_LODN` meshes. Enable **Collision** to use `UCX_` and `UBX_` collision meshes. **Fallback material** assigns the graybox fallback material instead of converted materials.

## Textures

Choose **tga** or **png** as the texture output. Enable **Invert Y-Normal** to invert the green channel of Unreal normal maps for Source 2.

## Materials

The Materials tab lists each Unreal master material and its instances. Check the master materials to convert and choose a target CS2 shader.

Open **Shader Remapper** to assign texture parameters to CS2 texture slots. Set shader features and parameter overrides, then click **Save**. Use **Reset to Auto** to discard the manual mappings for that material.

Click **Re-convert Materials** after changing shader or slot mappings. This processes materials without converting the maps and models again.

## Workflow

1. Select the project and target addon.
2. Analyze the project.
3. Select the assets and their dependencies.
4. Set map, model, texture, and material options.
5. Click **Convert**.
6. Read the console and open the output in Hammer.

Right-click the console to choose **Clear Console** or **Save log...**. Click **Clean cache** to remove the addon's Unreal export cache before a clean conversion.

Check geometry, transforms, materials, collision, lighting, and entity placement in Hammer.
