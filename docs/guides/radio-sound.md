# Guide: Creating Looping Radio & Music Sounds

Learn how to create seamless looping music, ambient radios, and soundscapes for Counter-Strike 2 using the built-in [Audio Editor](#audio-editor) and [SoundEvent Editor](#sound-editor).

---

## 1. Setting Up Loop Marks in Audio Editor

Counter-Strike 2 uses **RIFF Cue Markers** stored directly within `.wav` files to determine loop start and loop end boundaries.

1. Switch to the **Audio Editor** tab in Hammer5Tools.
2. Select your music `.wav` or `.mp3` file from the Sound Explorer.
3. Listen to the track and find your loop start and loop end points:
   - Click on the waveform where the loop begins and press **`M`** (Add Marker).
   - Click on the waveform where the loop ends and press **`M`** (Add Marker).
4. You now have **Marker 1** and **Marker 2** defining your seamless loop region.
5. Press **Ctrl+S** to save the audio file. Hammer5Tools writes the cue points directly into the WAV header.

> [!TIP]
> Use the **Fade In** and **Fade Out** tools in the Audio Editor to eliminate any start/end pop artifacts before saving.

---

## 2. Creating the SoundEvent

1. Switch to the **SoundEvent Editor** tab.
2. Click **Add Soundevent** and name your event (e.g. `radio.music_loop_01`).
3. Set the property `type = csgo_mega` (or `csgo_music`).
4. In `vsnd_files`, add your saved `.wav` file path.
5. Create a **Distance Volume Mapping Curve** to configure hearing distance:
   - Near volume: `1.0` (at distance 0–100 units).
   - Far volume: `0.01` (at distance 1500 units).

> [!NOTE]
> **Why set min volume to 0.01 instead of 0?**
> If a looping sound event reaches 0.0 volume, CS2 will unload it from player memory, losing its current playback position. Setting min volume to `0.01` keeps the sound synchronizing across all players even when far away.

---

## 3. Placing the Entity in Hammer

1. In Hammer Editor, create a `point_soundevent` entity.
2. Set **Soundevent Name** to your custom event (`radio.music_loop_01`).
3. Set **Start On Spawn** to `true`.
4. Run or compile your map — your radio music will now play and loop smoothly in Counter-Strike 2!
