# AutoScribe

An Electron application for transcribing audio files to text using Assembly AI API.

## Features

- Select audio files
- Transcribe to text using Assembly AI
- Save transcription to DOCX format

## Setup

1. Clone or download the project.
2. Run `npm install` to install dependencies.
3. Create a root `.env` file with:

   ```env
   BROWSER=none
   REACT_APP_ASSEMBLYAI_API_KEY=your_key_here
   ```

4. For development: `npm run dev`
5. For production: `npm run build` then `npm start`
6. For Windows installer: `npm run dist` (creates `dist/AutoScribe Setup 1.0.0.exe`)

> Note: `npm start` only works after building the React app, because Electron loads the production build by default.

## Usage

1. Select an audio file.
2. Click "Transcribe" to get the text.
3. Click "Save to DOCX" to download the transcription.
