import React, { useState, useEffect, useCallback } from "react";
import {
  DynamicMainContainer,
  LanguageDropdown,
  ResponsiveContainer,
  ButtonContainer,
  Note,
  CloseButton,
} from "./Transcription.styles";
import AudioInput from "../AudioInput";
import TranscriptionTextArea from "../TranscriptionTextArea";
import Button from "@mui/material/Button";
import { recognizeSpeech } from "../../API";
import Footer from "../Footer";
import { TrackGoogleAnalyticsEvent } from "../../lib/GoogleAnalyticsUtil";
import { detectAudioLanguage } from "../../API"; // Import the detectAudioLanguage function
import Loading from 'react-fullscreen-loading'; // Import Fullscreen Loading

const sourceOptions = [
  { label: "Luganda", value: "lug" },
  { label: "Acholi", value: "ach" },
  { label: "Ateso", value: "teo" },
  { label: "Lugbara", value: "lgg" },
  { label: "Runyankole", value: "nyn" },
  { label: "English", value: "eng" },
];

const Transcription = () => {
  const [language, setLanguage] = useState("lug"); // Default language
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useState(""); // Store auto-detected language
  const [textOutput, setTextOutput] = useState(""); // Store the transcription text
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState(""); // Store the audio URL
  const [audioData, setAudioData] = useState(null); // Store the audio file
  const [copySuccess, setCopySuccess] = useState(false);
  const [showNote, setShowNote] = useState(true);
  const [detectingLanguage, setDetectingLanguage] = useState(false); // State for language detection
  const [detectionError, setDetectionError] = useState(null); // Error handling state

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textOutput);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleAudioSubmit = useCallback(async () => {
    if (!audioData) return;

    TrackGoogleAnalyticsEvent(
      "Transcriptions",
      "Transcription Requested",
      "Transcribe Button"
    );
    setIsLoading(true);
    try {
      const transcript = await recognizeSpeech(audioData, language, language);
      setAudioSrc(URL.createObjectURL(audioData));

      if (transcript.audio_transcription) {
        TrackGoogleAnalyticsEvent(
          "Transcriptions",
          "Transcription Successful",
          "Transcribe Button"
        );
      }
      setTextOutput(transcript.audio_transcription);
    } catch (e) {
      console.error(e);
      setTextOutput("");
    }
    setIsLoading(false);
  }, [audioData, language]);

  const handleAudioLoad = useCallback(async (audioData) => {
    setAudioData(audioData);
    setAudioSrc(URL.createObjectURL(audioData));
    setDetectingLanguage(true); // Show full-screen loading during detection
    setDetectionError(null); // Clear any previous errors

    try {
      const detectedLanguageResponse = await detectAudioLanguage(audioData);
      if (detectedLanguageResponse && detectedLanguageResponse.detected_language) {
        const detectedLanguage = detectedLanguageResponse.detected_language;
        setAutoDetectedLanguage(detectedLanguage); // Store detected language
        setLanguage(detectedLanguage); // Set the detected language
        console.log("Auto-detected language:", detectedLanguage);
      }
    } catch (error) {
      console.error("Error detecting audio language:", error);
      setDetectionError("Failed to detect language. Please select manually.");
    } finally {
      setDetectingLanguage(false); // Hide full-screen loading when detection ends
    }
  }, []);

  const onLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useEffect(() => {
    console.log("Language updated to: " + language);
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNote(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Full-Screen Loading */}
      {detectingLanguage && (
        <Loading
          loading={detectingLanguage} // Will show the loader when true
          background="transparent" // Background color for loading screen
          loaderColor="#3498db" // Color of the spinner
        />
      )}

      {showNote && (
        <div>
          <Note>
            Note: Audio files used here are saved for the purpose of system improvement and model retraining.
            <CloseButton onClick={() => setShowNote(false)}>✖</CloseButton>
          </Note>
        </div>
      )}

      <DynamicMainContainer hasFooter={!!audioData}>
        <ResponsiveContainer>
          <h3>Step 1: Upload or Record Your Audio</h3>
          <AudioInput onAudioSubmit={handleAudioLoad} isLoading={isLoading} />

          <h3>Step 2: 
          {detectionError ? (
            <p style={{ color: "red" }}>{detectionError}</p> // Show error message if detection fails
          ) : (
            <p>Auto-Detected Language: {autoDetectedLanguage || "N/A"}</p>
          )}
          </h3>

          {/* Language dropdown still available for manual selection */}
          <LanguageDropdown value={language} onChange={onLanguageChange}>
            {sourceOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </LanguageDropdown>

          <h3>Step 3: Transcribe the Audio</h3>
          <ButtonContainer>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAudioSubmit}
              disabled={!audioData || isLoading}
            >
              Transcribe
            </Button>
          </ButtonContainer>
        </ResponsiveContainer>

        <TranscriptionTextArea
          placeholder="Recognized text will appear here"
          text={textOutput}
          setText={setTextOutput}
          isLoading={isLoading}
        />

        {audioData && (
          <Footer
            audioSrc={audioSrc}
            text={textOutput}
            copyToClipboard={copyToClipboard}
            copySuccess={copySuccess}
          />
        )}
      </DynamicMainContainer>
    </>
  );
};

export default Transcription;
