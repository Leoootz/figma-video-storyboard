# Storyboard — Video to Frames (Figma Plugin)

Extract frames from a video (1 every 1.5s) and place them on your Figma canvas in 9:16 story format.

## Installation

1. Open Figma Desktop
2. Go to **Plugins -> Development -> Import plugin from manifest...**
3. Select the `manifest.json` file from this folder
4. The plugin will appear in **Plugins -> Development -> Storyboard**

## Usage

1. Run the plugin
2. Drop your video (MP4, MOV, WebM) into the plugin area
3. Click **▶ Extract frames** to generate previews, then click **▶ Insert into Figma**
4. Frames appear on canvas at 390x844 (story), spaced out and ready for design

## Frame logic

`1 frame every 1.5 seconds` by default, with a minimum of 2 frames.
The **Seconds** input updates the **frames to extract** count live.

| Duration | Frames |
|----------|--------|
| 3s | 2 |
| 6s | 4 |
| 9s | 6 |
| 15s | 10 |

## Files

- `manifest.json` — plugin configuration
- `code.js` — logic that inserts images into the Figma canvas
- `ui.html` — plugin UI (frame extraction with WebCodecs)
