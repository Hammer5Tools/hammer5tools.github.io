# Audio Editor

A dedicated, built-in waveform audio editor for Counter-Strike 2 sound design. The Audio Editor provides visual inspection, cue-marker loop editing, DSP processing (gain and fade ramps), and converts your audio for Source 2.

---

## Interface Layout

The Audio Editor tab consists of a top toolbar, a resizable sound explorer sidebar, and a central waveform editing area.

| Area | Description |
|---|---|
| **Toolbar** | Quick-access actions for file operations, playback, DSP gain/fades, cue markers, and zoom levels. |
| **Sound Explorer** | Tree view of all audio files in the active addon's `sounds/` directory. |
| **Waveform Canvas** | Multi-channel audio waveform display with selection highlights and playhead indicator. |
| **Cue Marker Track** | Visual vertical marker lines indicating loop points and cue positions. |

---

## Loading & File Management

### Supported Formats
The editor loads:
- **WAV** (8-bit, 16-bit, 24-bit, 32-bit float, PCM)
- **Compressed Formats**: `.mp3`, `.flac`, `.aac`, `.m4a`, `.ogg`, `.wma` (automatically converted to uncompressed 16-bit PCM for editing).

### Opening Files
1. Double-click any audio file in the **Sound Explorer** sidebar.
2. Or use **File > Open** (`Ctrl+O`) to browse for any audio file on your computer.

### Saving
- **Save** (`Ctrl+S`): Overwrites the active WAV file with 16-bit PCM audio, preserving all embedded cue markers.
- **Save As** (`Ctrl+Shift+S`): Saves a copy of the processed audio to a new location.

---

## Waveform Navigation & Selection

- **Zoom In / Out**: Scroll the mouse wheel over the waveform, or click the **Zoom In** (`+`) and **Zoom Out** (`-`) toolbar buttons.
- **Pan**: Right-click and drag horizontally across the waveform.
- **Zoom to Fit**: Click the **Fit** button (`Ctrl+0`) to view the entire audio file in the window.
- **Select Region**: Left-click and drag across any part of the waveform to create a selection region.
- **Clear Selection**: Click outside the selection or press `Escape`.

---

## Playback Controls

| Action | Shortcut | Description |
|---|---|---|
| **Play / Pause** | `Space` | Play from current playhead or start of selection. |
| **Stop** | `Space` / Toolbar | Stops playback and returns playhead to start position. |
| **Play Selection** | `Shift+Space` | Plays only the highlighted region and stops at the end. |

---

## Cue Markers & Loop Points

Looping sounds in Source 2 (such as radios, alarms, engines, and ambient wind) rely on **RIFF Cue Markers** embedded within the `.wav` file header.

### Adding & Editing Markers
1. Click the waveform where you want to place a loop point (or make a selection).
2. Click **Add Marker** in the toolbar (or press `M`).
3. Drag marker flags left or right to fine-tune their sample positions.
4. To remove a marker, right-click the marker flag and select **Delete Marker**.

> [!TIP]
> **Perfect CS2 Radio Loops**
> Place Marker 1 at the start of the musical loop and Marker 2 at the end. CS2 will seamlessly repeat between these markers while keeping playback synchronized across all players.

---

## DSP & Editing Operations

All editing actions support full undo and redo (`Ctrl+Z` / `Ctrl+Y`).

### Volume & Gain
- **Volume Up (+3 dB)**: Increases the amplitude of the selected region (or entire file).
- **Volume Down (-3 dB)**: Decreases amplitude to prevent clipping.
- **Normalize**: Scales the highest peak to 0 dBFS (or -0.1 dBFS) for maximum clarity without distortion.

### Fade Ramps
- **Fade In**: Applies a smooth linear ramp from silent (0%) to full volume across the selection. Ideal for eliminating clicks at sound starts.
- **Fade Out**: Applies a smooth fade from full volume to silence across the selection.

### Clipboard Actions
- **Cut** (`Ctrl+X`): Copies the selected region to the clipboard and removes it from the waveform.
- **Copy** (`Ctrl+C`): Copies the selected samples to the clipboard.
- **Paste** (`Ctrl+V`): Inserts clipboard samples at the playhead position.
- **Delete** (`Del`): Removes the selected samples and closes the gap.
- **Crop**: Deletes everything *outside* the current selection, trimming the file to just the desired clip.

---

## Integration with SoundEvent Editor

Once you have saved your edited `.wav` file in your addon's `sounds/` directory:
1. Switch to the **SoundEvent Editor** tab.
2. Select your sound event.
3. Drag the audio file directly into the `vsnd_files` property list.
4. CS2's resource compiler will automatically convert the WAV (and its cue points) into a compiled `.vsnd_c` resource.
