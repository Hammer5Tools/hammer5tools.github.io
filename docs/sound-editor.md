The SoundEvent Editor allows you to manage in-game sound configurations seamlessly.

## Interface Overview

| Action | Description | Hotkey |
| --- | --- | --- |
| Save | Saves the current soundevents file | Ctrl + S |
| New Event | Creates a new soundevent entry | Ctrl + N |
| Duplicate | Duplicates the selected soundevent | Ctrl + D |
| Remove | Deletes the selected event | Del |

## Working with VSND Files
Import your `.vsnd` files directly by dragging and dropping them into the properties panel. You can preview sounds within the editor before adding them to your soundevents.

## Properties Reference

Standard Source 2 soundevent parameters including:
- **VSND Files**: List of sound files associated with the event.
- **Volume**: Sound amplitude (0.0 to 1.0).
- **Pitch**: Playback speed and pitch modifier.
- **Distance Volume Mapping**: Controls how volume fades over distance.
- **Occlusion**: How the sound behaves when blocked by geometry.

## Guide: Creating a Radio Sound
To create a looping world sound (like a radio):

1. **Preparation**: Set loop marks in your `.vsnd` file using tools like Wavosaur.
2. **Create Event**: Use the `SoundDebug` preset as a base.
3. **Configure Volume**: Set a **Distance Volume Mapping Curve**. 
   > [!TIP]
   > To prevent the sound from unloading when out of range, set the minimum volume to `0.01` instead of `0`.
4. **Entity Setup**: In Hammer, create a `point_soundevent` and select your new event. Set **Start On Spawn** to true.

## Syncing with Addon
All changes are written directly to `soundevents_addon.vsndevts`. Hammer 5 Tools handles the complex syntax formatting for you automatically.
