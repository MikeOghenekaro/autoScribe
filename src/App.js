import React, { useState } from "react";
import { AssemblyAI } from "assemblyai";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

function App() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_ASSEMBLYAI_API_KEY;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTranscribe = async () => {
    if (!file || !apiKey) return;
    setLoading(true);
    const client = new AssemblyAI({ apiKey });
    try {
      const transcript = await client.transcripts.transcribe({
        audio: file,
      });
      setTranscription(transcript.text);
    } catch (error) {
      console.error(error);
      alert("Error transcribing audio");
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (!transcription) return;
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [new Paragraph(transcription)],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "transcription.docx");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">AutoScribe</h1>
        {!apiKey && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            Assembly AI API key is missing. Please add
            `REACT_APP_ASSEMBLYAI_API_KEY` to your root `.env` file.
          </div>
        )}
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleTranscribe}
          disabled={!file || !apiKey || loading}
          className="w-full bg-blue-500 text-white p-2 rounded mb-4 disabled:bg-gray-300"
        >
          {loading ? "Transcribing..." : "Transcribe"}
        </button>
        <textarea
          value={transcription}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mb-4 h-32"
          placeholder="Transcription will appear here"
        />
        <button
          onClick={handleSave}
          disabled={!transcription}
          className="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Save to DOCX
        </button>
      </div>
    </div>
  );
}

export default App;
