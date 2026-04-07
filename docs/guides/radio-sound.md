
# Radio

To add music, we first need to determine the type of music: is it looping, and should it loop? If looping is required, some preparation of the sound file will be necessary.
If looping is not required, simply skip the first step, but in our case we have looping.

## Preparation
To ensure proper looping, we need to set marks on the sound. There are several ways to do this, but we will focus on using [Wavosaur](https://www.wavosaur.com/). Open a file and click the **Add Mark** button.

![Wavosaur Toolbar](docs/images/radio-wavosaur-toolbar.png)

Ensure there are only two marks in the file.

![SoundEvent Search](docs/images/radio-soundevent-props.png)

We're done! Just save the file, and remember that the file name should not include spaces or special characters.

## Creating event
We can start from basic preset and then modify it. Press **Ctrl + F** in the soundevents and choose **SoundDebug** and rename it.

![Distance Volume Mapping Curve](docs/images/radio-hammer-picker.png)

Delete the **Position Relative To Player** property.

Next, remove the sound from the **Vsnd Files Track 01** property and add your own by dragging and dropping it from the program's explorer.

Now, we need to create a **Distance Volume Mapping Curve**. After creating it, set the values as follows:


![Wavosaur Waveform](docs/images/radio-wavosaur-waveform.png)

The reason for this is to maintain the sound's state regardless of the player's position on the map. If the volume is set to 0, the soundevent will be unloaded from memory, causing the playtime state to be lost. To prevent this, set the volume to the lowest possible value, such as **0.01**.

## Entity setup in Hammer
First of all launch the map through **Run (skip build)**, that's needs to load custom soundevents to the editor.

Next, create a **point_soundevent** entity and choose our event.

![SoundEvent Picker](docs/images/radio-mapping-curve.png)

Set **Start On Spawn** to true. And that's it!
