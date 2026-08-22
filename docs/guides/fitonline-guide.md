# Procedural Pipes (FitOnLine & BendDeformer)

In this guide, we will build a versatile, production-ready modular pipe SmartProp in Counter-Strike 2. You will learn how to combine **`FitOnLine`**, **`BendDeformer`**, **`CreateSizer`**, **`CreateRotator`**, and **nested self-referencing SmartProps** to build pipes that can dynamically stretch to any length, branch in different directions, bend smoothly along curves, and automatically place end caps.

![Procedural Pipe Overview](docs/images/fitonline_guide/fitonline-hero-demo.webp)

📦 **[Download Pipe Mesh Kit (pipe_meshes.zip)](static/vsmart-examples/pipe_meshes.zip)**  
📦 **[Download Finished guide_fitonline.vsmart](static/vsmart-examples/guide_fitonline.vsmart)**

> [!NOTE]
> This guide builds upon the fundamentals explained in the [SmartProp Beginner Guide](docs.html#smartprop-guide). If you are new to SmartProps, start there first.

---

## Mesh Requirements & Preparation

Before building a procedural pipe system, the source 3D meshes must be prepared according to specific guidelines:

1. **Pivot Placement**: The origin pivot must be placed precisely at the start or end border of the mesh along the connection axis (typically Z or Y).
   
   ![Pivot Requirement](docs/images/fitonline_guide/fitonline-pivot-requirement.png)

2. **Subdivision Density for Bending**: Straight pipe sections only need a few longitudinal segments. Meshes intended for curvature or deformation require extra edge loops along their length so they deform smoothly when passed through `BendDeformer`.
   
   ![Segment Density](docs/images/fitonline_guide/fitonline-segment-density.png)

3. **Grid-Aligned Sizing**: Models should have clean, predictable unit lengths (e.g. 32, 64, 128, 192 units) rather than arbitrary dimensions. This makes length and selection criteria calculations straightforward.
   
   ![Clean Dimensions](docs/images/fitonline_guide/fitonline-clean-dimensions.png)

For this tutorial, we will use a custom modular pipe kit built in Blender:

![Blender Mesh Set](docs/images/fitonline_guide/fitonline-blender-mesh-set.png)

---

## Step 1: Batch Importing Meshes with AssetGroup Maker

Instead of manually configuring dozens of `.vmdl` files in Hammer, we will use **AssetGroup Maker** to batch-generate and synchronize our models.

> [!TIP]
> **AssetGroup Maker** allows you to edit a single reference asset and automatically propagate materials, collision hulls, and surface properties to all other models in the group.

1. Launch CS2 with `-netconport 2121` (or launch via Hammer5Tools).
2. Place the unpacked FBX files into your addon's content directory (e.g. `content/csgo_addons/<addon>/models/pipe_kit/`).
   
   ![Addon Folder](docs/images/fitonline_guide/fitonline-addon-folder.png)

3. Select the FBX files in the Hammer5Tools Explorer, right-click, and choose **Quick create vmdl**.
4. Select the created model and click **Quick AssetGroup file** to generate the `.hbat` configuration.
5. Select the `.hbat` file and click **Quick process AssetGroup**.
   
   ![AssetGroup Process](docs/images/fitonline_guide/fitonline-assetgroup-process.png)

6. All `.vmdl` files are now compiled and ready:
   
   ![Generated VMDLs](docs/images/fitonline_guide/fitonline-vmdl-generated.png)

7. Right-click the `.hbat` file and choose **Open Reference Asset**. Any changes made to collision hulls, physics, or material assignments on the reference asset will automatically sync to all models in the kit:
   
   ![Open Reference Asset](docs/images/fitonline_guide/fitonline-open-reference-asset.png)
   
   ![AssetGroup Sync Demo](docs/images/fitonline_guide/fitonline-assetgroup-sync.webp)

---

## Step 2: Setting up Basic FitOnLine

`FitOnLine` places child elements sequentially along a line vector according to each child's **LinearLength** selection criteria.

1. Create a new SmartProp document in Hammer5Tools and save it (e.g., `models/pipe_kit/guide_fitonline.vsmart`).
2. Import all `.vmdl` files into the SmartProp hierarchy using the **Bulk Model Importer**:
   - Right-click in the Hierarchy window and select **Bulk Model Importer**.
   - Select all the pipe `.vmdl` files.
   - Check **Create ref element** and click **OK**.
   
   ![Bulk Model Importer](docs/images/fitonline_guide/fitonline-bulk-model-importer.png)

3. For now, move all models except `pipe_01_64_a` into a temporary group and disable that group so we can focus on the base piece:
   
   ![Temporary Group](docs/images/fitonline_guide/fitonline-hierarchy-disabled-group.png)

### Configuring Length & Selection Criteria
4. In the root `FitOnLine` element, set the **End** coordinate to `(0, 0, 128)`.
5. On the `pipe_01_64_a` model element, add a **Selection Criteria: LinearLength** modifier and set **Length** to `64`.
   
   ![LinearLength Setup](docs/images/fitonline_guide/fitonline-basic-setup-linearlength.png)

6. Place the SmartProp in Hammer to test it. Because the `FitOnLine` length is 128 and each pipe segment is 64, exactly 2 segments are placed:
   
   ![First Hammer Test](docs/images/fitonline_guide/fitonline-hammer-first-test.png)

### Adding an Interactive Sizer Handle (`CreateSizer`)
7. Create a new Group element and attach a **CreateSizer** modifier to it.
8. Create a float variable named `SizerLengthZ` (uncheck *Show in editor*).
9. In the CreateSizer modifier:
   - Set **Output Variable Max Z** to `SizerLengthZ`.
   - Set **Initial Min Z** to `0` and **Initial Max Z** to `128`.
   - Set **Constraint Min Z** to `0` and **Constraint Max Z** to `512`.
   
   ![CreateSizer Setup](docs/images/fitonline_guide/fitonline-create-sizer-modifier.png)
   
   ![Sizer Bounds](docs/images/fitonline_guide/fitonline-sizer-bounds-config.png)

10. In your `FitOnLine` element, change the **End.Z** property from constant `128` to the `SizerLengthZ` variable.
11. In the Hammer viewport (`Shift + S`), drag the sizer arrow handle to dynamically lengthen the pipe:
    
    ![Bind Sizer to End](docs/images/fitonline_guide/fitonline-bind-sizer-to-end.png)

### Smooth Scaling & Material UV Compensation
To prevent stepped gaps between fixed-size meshes, enable dynamic scaling:

12. In the `FitOnLine` element, set **Scale Mode** to `SCALE_END_TO_FIT` (or `SCALE_MAXIMIZE`).
13. Select the model element, switch its **Model Scale (Z)** field to **Expression**, and enter:
    ```text
    LinearScale()
    ```
14. In the model's **Selection Criteria: LinearLength**, set **Allow Scale** to `true`, **Min Length** to `64`, and **Max Length** to `192`.
    
    ![Scale Mode LinearScale](docs/images/fitonline_guide/fitonline-scale-mode-linearscale.png)

15. **Texture UV Scaling**: To prevent stretched textures when scaling pipes, enable UV scaling in your Source 2 material (`.vmat`):
    - In Material Editor, enable **Scale TexCoord U By Model Scale Axis** and set it to `UV.u * model.z`.
    
    ![Material UV Scale](docs/images/fitonline_guide/fitonline-material-uv-scale.png)

16. **Adding End Caps**:
    - Wrap the pipe model in a group (`Ctrl + G`) and move the `LinearLength` criteria to the group.
    - Add a `PickOne` element containing cap models (`end_a`, `end_b`) set to selection mode `FIRST`.
    - Add a **Translate** modifier to the cap group with **Translate.Z** set to `LinearScale() * 64`.
    
    ![Add Caps Translation](docs/images/fitonline_guide/fitonline-add-caps-translation.png)

---

## Step 3: Branching with Nested SmartProps

To allow pipes to continuously branch and change directions, we can nest the SmartProp inside itself!

1. Create a `PickOne` element named **End**.
2. Place the Cap `PickOne` and connector meshes (`pipe_01_32_a`, `pipe_01_32_b`) under **End**.
3. Move the translation and a `CreateRotator` modifier to the **End** `PickOne` element.
   
   ![Nested End PickOne](docs/images/fitonline_guide/fitonline-nested-end-pickone.png)

4. **Self-Referencing SmartProp**:
   - Add a `SmartProp` element under the **End** `PickOne`.
   - Set its SmartProp path to the current `.vsmart` file itself.
   - **Crucial**: Ensure the parent `PickOne` selection mode is set to **`FIRST`** (with the closed cap as the first child) so that placed props do not spawn infinite recursive copies.
   
   ![Nested Self Reference](docs/images/fitonline_guide/fitonline-nested-self-reference.png)

5. Customize handle shapes, colors, and offset positions for the PickOne widgets:
   
   ![Handle Offsets & Colors](docs/images/fitonline_guide/fitonline-handle-offsets-colors.png)

6. **Configuring Branch Connectors**:
   - Create a group for `pipe_01_32_b` (call it `32_b`).
   - Duplicate the `SmartProp` reference element into the `32_b` group.
   - Use viewport isolation (`Ctrl + H`) to precisely position and rotate the nested SmartProp handle to align with the branch outlet of the connector mesh.
   
   ![Branching 32b Offset](docs/images/fitonline_guide/fitonline-branching-32b-offset.png)

7. Repeat the same setup for 90-degree corner connectors (`pipe_01_crn_a` and `pipe_01_crn_b`):
   
   ![Corner Elements](docs/images/fitonline_guide/fitonline-corner-elements.png)

---

## Step 4: Curved Pipes with BendDeformer

To create smooth curved bends in Hammer, we introduce the **BendDeformer** element.

1. Duplicate the `FitOnLine` structure and place it in a new group named **Bend**.
2. Wrap the model in a **BendDeformer** element inside the `Bend` group.
3. Attach a **CreateRotator** modifier to the `Bend` group:
   - Set **Apply To Current Transform** to `false`.
   - Set **Coordinate Space** to `Element`.
   - Set **Rotation Axis** to `(1, 0, 0)`.
   - Create a float variable named `BendAngle` and bind it to **Output Variable**.
   - Enable **Enforce Limits** with **Min Angle = -90°** and **Max Angle = 90°**.
   
   ![Bend Rotator Setup](docs/images/fitonline_guide/fitonline-bend-rotator-setup.png)

4. Reorganize and clean up the hierarchy:
   - Move the main picker and sizer handles to the top level.
   - Ensure sizer constraints on Z are properly bounded (e.g. `Constraint Max Z = 192`).
   
   ![Hierarchy Cleanup](docs/images/fitonline_guide/fitonline-hierarchy-cleanup.png)

5. **Configuring BendDeformer**:
   - In **Bend Radius**, bind the `BendAngle` variable.
   - In **Angles**, set `(-90, 0, 0)`.
   - Set **Size.X** to `SizerLengthZ` (with Y and Z set to `0`).
   
   ![BendDeformer Final](docs/images/fitonline_guide/fitonline-bend-deformer-final.png)

### The Rigid Deformation Modifier

> [!IMPORTANT]
> When child elements (like PickOne handles or nested SmartProps) sit inside a `BendDeformer`, the deformation math would normally skew and distort their interactive control handles.
> 
> To prevent this, add a **`Rigid Deformation`** modifier to each control handle group. This preserves clean, non-deformed transform handles while still bending the mesh geometry underneath!

---

## Final Result & Workflow Recap

You now have a complete, fully interactive procedural pipe SmartProp!

![Final Pipe Demo](docs/images/fitonline_guide/fitonline-hero-demo.webp)

### What You Can Do in Hammer:
- **Stretch**: Drag sizer arrows to lengthen straight runs with automatic model scaling and UV compensation.
- **Bend**: Rotate the bend widget to sweep pipes smoothly along 90-degree curves.
- **Branch**: Click or cycle the PickOne widget to spawn T-junctions, cross-sections, or corners.
- **Cap**: Switch to end caps to seal off open pipe terminations.
