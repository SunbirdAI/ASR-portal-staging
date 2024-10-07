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
import { detectAudioLanguage } from "../../API"; // Import your detectAudioLanguage function

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
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useState(""); // To store auto-detected language
  const [textOutput, setTextOutput] = useState(""); // Transcription text
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState(""); // Store the audio URL
  const [audioData, setAudioData] = useState(null); // Store audio file
  const [copySuccess, setCopySuccess] = useState(false);
  const [showNote, setShowNote] = useState(true);

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

    // Auto-detect language on audio load
    try {
      const detectedLanguageResponse = await detectAudioLanguage(audioData);
      if (detectedLanguageResponse && detectedLanguageResponse.detected_language) {
        const detectedLanguage = detectedLanguageResponse.detected_language;
        setAutoDetectedLanguage(detectedLanguage); // Store detected language
        setLanguage(detectedLanguage); // Set the language for transcription
        console.log("Auto-detected language:", detectedLanguage);
      }
    } catch (error) {
      console.error("Error detecting audio language:", error);
    }
  }, []);

  const onLanguageChange = (event) => {
    setLanguage(event.target.value); // Update state with user's manual selection
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

          <h3>Step 2: Auto-Detected Language: {autoDetectedLanguage || "N/A"}</h3>
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
