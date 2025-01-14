import React, { useEffect, useState } from 'react';
import SpeakerDetection from '../utils/SpeakerDetection';

const TranscriptManager = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Fix: Explicitly check for browser support
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      console.error('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Fix: Set the correct language and configurations
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'he-IL';

    recognition.onresult = (event) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          currentTranscript += result[0].transcript + '\n';
        } else {
          currentTranscript += result[0].transcript;
        }
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    setRecognition(recognition);

    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognition) {
      try {
        recognition.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isRecording ? 'עצור הקלטה' : 'התחל הקלטה'}
      </button>
      <div className="mt-4 p-4 border rounded bg-white min-h-[200px]" dir="rtl">
        <pre className="whitespace-pre-wrap">{transcript}</pre>
      </div>
    </div>
  );
};

export default TranscriptManager;