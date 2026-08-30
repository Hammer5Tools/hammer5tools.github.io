# FAQ & Troubleshooting

## CS2 is not found

Open **Settings** and select the Counter-Strike 2 installation directory. The selected directory must contain `game/bin/win64/cs2.exe`.

## NetConsole features do not connect

Start CS2 with a NetConsole port such as `-netconport 2121`, then confirm that local connections to that port are allowed.

## Configuring VMAP merges

The merge-driver script is `Hammer5ToolsGUI/gui/gitvmapmerge.py`. Configure Git with paths appropriate for your installation; do not copy a developer-machine path.

```ini
[merge "vmapmerge"]
    name = Hammer5Tools VMAP merge driver
    driver = python "C:/path/to/Hammer5Tools/Hammer5ToolsGUI/gui/gitvmapmerge.py" %A %B --base %O --output %A
```

Add `*.vmap merge=vmapmerge` to `.gitattributes`. Test the configuration on a disposable branch before using it for team work.

## UnrealPorter cannot find Unreal Engine

Choose an Unreal Engine installation or project in UnrealPorter. For a custom engine, select an installation that contains `Engine/Binaries/Win64/UnrealEditor.exe`.
