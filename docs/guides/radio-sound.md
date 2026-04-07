# Sound: Creating a Radio event

To create a looping world sound event (like a radio or distant hum):

## 1. Preparation
Set loop marks in your `.vsnd` file using tools like **Wavosaur**. 
- Ensure there are only two marks in the file.
- Save the file with a name that doesn't include spaces or special characters.

## 2. Creating Event
Use the `SoundDebug` preset as a base in the Sound Event Editor.
- Rename it to your desired event name.
- Delete the **Position Relative To Player** property if it's a fixed world sound.
- Remove the default vsnd file and drag-drop your prepared file.

## 3. Configuration
Set a **Distance Volume Mapping Curve**.
- Set the values based on how far you want the sound to be heard.

> [!TIP]
> **Performance Trick**
> To prevent the sound from unloading when out of range (which loses the playback position), set the minimum volume to `0.01` instead of `0`.

## 4. Entity Setup
In Hammer, create a `point_soundevent` and select your new event.
- Set **Start On Spawn** to true.
