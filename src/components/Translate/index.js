import React, { useState, useCallback } from 'react';
import { MainContainer } from "./Translate.styles";
import AudioInput from '../AudioInput/AudioInput'; // Adjust based on actual file structure
import TranslateTextArea from '../TranslateTextArea';
// import SamplePhrases from "../SamplePhrases";
import { recognizeSpeech } from "../../API"; // Function to convert speech to text

const Translate = () => {
    const [language, setLanguage] = useState('eng'); // Default language for speech recognition
    const [textOutput, setTextOutput] = useState(''); // The recognized text from speech
    const [isLoading, setIsLoading] = useState(false); // Loading state for async operations

    // Handles the submission of audio data for recognition
    const handleAudioSubmit = useCallback(async (audioData) => {
        setIsLoading(true);
        try {
            const transcript = await recognizeSpeech(audioData, language); // Process the audio to text
            setTextOutput(transcript);
        } catch (e) {
            console.log(e);
            setTextOutput('');
        }
        setIsLoading(false);
    }, [language]);

    // Optional: Handler for copying text to clipboard
    const handleCopyToClipboard = useCallback(async () => {
        if (textOutput) {
            await navigator.clipboard.writeText(textOutput);
            // Implement feedback to user about copy success
        }
    }, [textOutput]);

    // Optional: Handler for providing feedback
    const handleProvideFeedback = useCallback((feedback) => {
        // Implement feedback submission logic
        console.log(feedback);
    }, []);

    return (
        <MainContainer>
            <AudioInput
                onAudioSubmit={handleAudioSubmit}
                setLanguage={setLanguage}
                isLoading={isLoading}
            />
            <TranslateTextArea
                placeholder="Recognized text will appear here"
                text={textOutput}
                setText={setTextOutput} // Optionally allow users to edit the recognized text
                isLoading={isLoading}
                onCopyToClipboard={handleCopyToClipboard}
                onProvideFeedback={handleProvideFeedback}
            />
            {/* <SamplePhrases sourceLanguage={language} setSamplePhrase={setTextOutput}/> */}
        </MainContainer>
    );
};

export default Translate;
