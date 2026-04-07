# SoundEvent Editor

The SoundEvent Editor is a comprehensive tool for managing and configuring sound events within the Hammer 5 environment. This guide covers the interface, property management, and usage of presets.

---

## Interface Overview

The interface is divided into several functional areas designed for efficient navigation and editing.

![Interface Overview](docs/images/sound_editor/interface_overview.png)

### Global Hotkeys
*   **SPACE**: Play or Pause the selected SoundEvent.
*   **Enter**: Performs the same action as a double-click (e.g., editing a property or expanding a folder).
*   **Ctrl + Shift + F**: Opens Global Search.
*   **Delete**: Deletes the selected SoundEvent.
*   **F2**: Renames the selected SoundEvent.

### Context Menu Actions

#### SoundEvents Explorer
Right-clicking a SoundEvent or an empty area in the explorer provides:
*   **Add Soundevent**: Create a new soundevent entry.
*   **Duplicate (Ctrl + D)**: Creates a copy of the selected soundevent.
*   **Rename (F2)**: Change the name of the entry.
*   **Delete (Delete)**: Remove the entry.
*   **Copy SoundEvent name**: Copies the name to your clipboard.
*   **Open soundevents file**: Opens the source file in your default text editor.

#### Properties Editor
Right-clicking within the properties panel allows:
*   **Copy Value**: Copies the selected property's value.
*   **Paste Value**: Pastes a value from the clipboard into the selected property.
*   **Reset to Default**: Reverts the property to its baseline value.
*   **Add Property**: Adds a new property field to the SoundEvent.
*   **Remove Property**: Deletes the selected property from the entry.

---

## Property Reference

Properties in the SoundEvent Editor come in various data types, each with its own interaction method.

### Property Types

*   **List (e.g., vsnd_files)**: Used for managing multiple assets. Click the **Plus (+)** icon to add an entry or the **Minus (-)** icon to remove one.
    ![List Property](docs/images/sound_editor/list_property.png)

*   **Float (Number)**: Numerical values like volume or pitch. Left-click and drag horizontally to adjust the value quickly.
    ![Float Property](docs/images/sound_editor/float_property.png)

*   **ComboBox (Dropdown)**: Provides a list of predefined options. Left-click to open the list and select your desired value.
    ![ComboBox Property](docs/images/sound_editor/combobox_property.png)

*   **Line (Curve)**: Visualizes values over time or distance. Left-click and drag points to manipulate the curve shape.
    ![Curve Property](docs/images/sound_editor/curve_property.png)

*   **Bool (Checkbox)**: A simple toggle for features (e.g., `use_hrtf`). Left-click to check or uncheck.
    ![Bool Property](docs/images/sound_editor/bool_property.png)

---

## Using Presets

Presets allow you to quickly apply standard configurations to new SoundEvents.

### Creating Presets
To create a custom preset, set up a SoundEvent with your desired parameters, right-click it in the explorer, and select **"Create Preset"**.

### Preset Manager
The Preset Manager, located in the Tools menu, allows you to view and delete presets. The explorer view helps organize these configurations within the `SoundEventEditor/Presets` directory.

![Preset Manager](docs/images/sound_editor/preset_manager.png)