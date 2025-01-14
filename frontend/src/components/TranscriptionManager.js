import React, { useEffect, useState } from 'react';
import SpeakerIdentification from '../services/SpeakerIdentification';
import { sendTranscriptEmail } from '../services/EmailService';

const TranscriptionManager = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'he-IL';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            const speaker = SpeakerIdentification.identifySpeaker(result);
            setSpeakers(prev => [...prev, speaker]);
          }
          currentTranscript += result[0].transcript + ' ';
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      setRecognition(recognition);
    }
  }, []);

  const startRecording = () => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = async () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);

      // שליחת סיכום במייל
      try {
        await sendTranscriptEmail({
          transcript,
          speakers,
          duration: '00:30:00', // לדוגמה
          clientEmail: 'client@example.com' // יש להחליף באימייל אמיתי
        });
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button 
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500' : 'bg-green-500'} text-white`}
        >
          {isRecording ? 'עצור הקלטה' : 'התחל הקלטה'}
        </button>
      </div>
      <div className="border p-4 min-h-[200px] bg-white rounded">
        <h3 className="mb-2 font-bold">תמלול בזמן אמת:</h3>
        <div dir="rtl" className="transcript-container">
          {speakers.map((speaker, index) => (
            <p 
              key={index} 
              style={{ color: SpeakerIdentification.getColorForSpeaker(speaker.speakerId) }}
            >
              {transcript.split(' ')[index]}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranscriptionManager;