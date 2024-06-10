import { useState } from 'react';

const useScreenRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    try {
      // Use getDisplayMedia to capture the screen directly without user interaction
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error starting screen recording:', err);
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (!mediaRecorder) {
        resolve(null);
        return;
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setChunks([]);
        resolve(blob);
      };

      mediaRecorder.stop();
      setIsRecording(false);
    });
  };

  return { isRecording, startRecording, stopRecording };
};

export default useScreenRecorder;
