# Loading Editor

Create and customize your map's loading experience by managing screenshots and map icons.

## Screenshots Interface
The Screenshots section displays all images found in the `addon/screenshots` directory within your game folder.
![Screenshot](docs/images/loading_editor/01.png)


### Applying screenshots
All images located in the addon/screenshots folder (game directory) under processing will be copied to the addon/screenshots folder (content directory). For each image, a vtex file will be created. These vtex files will be stored in the addon/panorama/images/map_icons/screenshots/1080p folder (content directory).

The vtex files are automatically compiled by the program, and the compiled textures will appear in the addon/panorama/images/map_icons/screenshots/1080p folder (game directory).

The file names will follow this format:

The first image: %addon%_png

Subsequent images (up to 9): %addon%_%number%_png 

> [!WARNING]
There is a limit of 10 images for screenshots. You can add a maximum of 10 images to the addon/panorama/images/map_icons/screenshots/1080p folder. 

## Custom Images
Import custom screenshot images for your map's loading screen. 
The tool automates the process of converting and placing these images into the correct directory structure.

> [!TIP]
> Use the **Apply Screenshots** action to quickly finalize your loading screen once your images are polished. 

## Descriptions & Icons
Add rich text descriptions and game icons to your loading screen to give players more information about your map during the load process.
