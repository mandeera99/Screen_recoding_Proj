// src/App.js
import React from 'react';
import useScreenRecorder from './hooks/useScreenRecorder';
import useNetworkLogger from './hooks/useNetworkLogger';
import { uploadToS3 } from './utils/uploadToS3';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const { isRecording, startRecording, stopRecording } = useScreenRecorder();

  useNetworkLogger();

  const handleStopRecording = async () => {
    const blob = await stopRecording();
    await uploadToS3(blob, `recording-${Date.now()}.webm`);
  };

  return (
    <div>
      <h1>Screen Recording</h1>
      <header className="">
      <img src={logo} className="App-logo" alt="logo" /> </header>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={handleStopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
     
    </div>
  );
};

export default App;
