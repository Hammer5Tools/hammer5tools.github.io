# FAQ & Troubleshooting

Common questions, operational requirements, and troubleshooting solutions for Hammer 5 Tools.

---

### The application will not launch or crashes on startup
1. Ensure the **.NET 8 Desktop Runtime (x64)** is installed on Windows.
2. Verify that Counter-Strike 2 Workshop Tools are installed and updated in Steam.
3. Check that your GPU drivers support OpenGL 3.3+ (required for 3D viewport rendering).

---

### CS2 path is not detected automatically
Open **Settings > General > CS2 Path** and browse manually to your Counter-Strike 2 root directory:
```text
C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive
```

---

### Live Sound Playback / Cubemap Baking is not responding
These features communicate with Counter-Strike 2 via NetConsole.
- Ensure CS2 is launched with the launch option `-netconport 2121`.
- Verify no firewall software is blocking local loopback connections on port 2121.
- You can configure custom ports in **Settings > SoundEvent > NetConsole Port**.

---

### SmartProp files fail to compile when saving
To compile `.vsmart` or `.vdata` files, Hammer5Tools uses `resourcecompiler.exe` from your CS2 game directory.
- Verify the active addon matches the folder structure where your file is located.
- If editing files across different addons, switch the active addon via the toolbar dropdown or respond **Switch Addon** when prompted.

---

### How do I configure Git for `.vmap` 3-way merging?
Hammer5Tools includes a custom merge driver (`src/gitvmapmerge.py`). To enable it for your Git repository, add the following to your addon repository's `.git/config`:
```ini
[merge "vmapmerge"]
    name = Valve Source 2 VMAP 3-way merge driver
    driver = python "D:/CG/Projects/Other/Hammer5Tools/src/gitvmapmerge.py" %O %A %B %P
```
And add this line to your repository's `.gitattributes` file:
```text
*.vmap merge=vmapmerge
```

---

### UnrealPorter cannot find Unreal Engine installations
- Ensure Unreal Engine 5 is installed through the Epic Games Launcher.
- If using a custom source-built engine, manually browse to the engine root folder (containing `Engine/Binaries/Win64/UnrealEditor.exe`).
- Ensure the automation script bridge is installed by clicking **Install Script into Project** in UnrealPorter.

---

### How do I fix missing textures or materials in SourcePorter?
After porting a legacy `.bsp` map, click **Find Missing** in SourcePorter. The tool will scan for broken material, model, and texture references and provide a one-click **Import Assets** dialog to extract them from your legacy game folder.

---

### Strange lightmap seams or artifacts in my compiled map
If lightmaps look corrupted after moving geometry:
1. Go to **Utilities > Cleanup _vrad3 cache**.
2. Confirm deletion of the cached lightmap files.
3. Recompile the map using **Map Builder** with **Full Compile** or **Lighting Only**.