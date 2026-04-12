# Asset Group maker

Automate the creation of dozens of assets using simple configuration files. By utilizing a straightforward configuration file and a folder scan, you can automatically generate files for massive asset sets. This ensures consistency across all your assets and drastically minimizes time spent on manual edits.

![Demo](https://cdn.iframe.ly/files/713c52ce6c0a2e9ba6abfacfc330931c.mp4)

---

## Interface

The Asset Group maker interface is divided into three key functional areas designed for maximum efficiency:

![Interface Overview](docs/images/asset_group/interface.png)

- **Explorer (Left)**: Manage your configuration files and trigger setup actions.
- **Editor (Middle)**: Define your source template with dynamic replacement support.
- **Process Actions**: Finalize and generate assets based on your rules.

### Editor
Input your template or source file content here. You can use global and local replacements to dynamically swap values for each generated asset.

---

## Replacements (Global Config)

The program processes each file by replacing specified source strings with destination values for each asset.

![Replacements](docs/images/asset_group/replacements.png)

### Variables
Right-clicking in the replacements fields opens a context menu with available variables:
- `asset_name`: Automatically inserts the name of the asset being processed.
- `folder_path`: Inserts the relative path of the folder containing the asset within the addon.

Example:
- input: `filename = "#$FOLDER_PATH$#/#$ASSET_NAME$#.fbx"`
- output: `filename = "sounds/bird_01.fbx"`

---

## Process Settings

The Process tab allows you to configure the logic for how assets are generated.

![Process Settings](docs/images/asset_group/process.png)

- **Files Selection**: Define which files in the selected folder should be included.
- **Algorithms**: Choose the processing logic (e.g., "One to One" to create one asset for each file).
- **Ignorelist**: Specify files or patterns to be skipped during the bulk creation process.


## Referencing

Referencing is a method that automatically loads content from a referenced file. The loaded content is then used for the Process Action. If any changes are made to the referenced file, the program will automatically trigger the Process Action, but only if there is a referenced file in the configuration.

To select a reference file, you can either drag and drop the file or click the Select button in the Referencing section of the Explorer tab.

>[!WARNING]
The referenced file must have a relative path. You cannot select a file outside of the add-on directory.