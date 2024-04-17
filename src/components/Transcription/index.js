import React, { useState, useEffect, useCallback } from 'react';
import { MainContainer, LanguageDropdown } from "./Transcription.styles";
import AudioInput from '../AudioInput/AudioInput'; // Adjust based on actual file structure
import TranscriptionTextArea from '../TranscriptionTextArea';
// import SamplePhrases from "../SamplePhrases";
import { recognizeSpeech } from "../../API"; // Function to convert speech to text

const sourceOptions = [
    {
        label: 'Luganda',
        value: 'lug'
    },
    {
        label: 'Acholi',
        value: 'ach'
    },
    {
        label: 'Ateso',
        value: 'teo'
    },
    {
        label: 'Lugbara',
        value: 'lgg'
    },
    {
        label: 'Runyankole',
        value: 'nyn'
    },
    {
        label: 'English',
        value: 'eng'
    }
]

const Transcription = () => {
    const [language, setLanguage] = useState('lug'); // Default language for speech recognition
    const [textOutput, setTextOutput] = useState(''); // The recognized text from speech
    const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
    const [audioSrc, setAudioSrc] = useState(''); // Store the audio source URL or blob

    // Handles the submission of audio data for recognition
    const handleAudioSubmit = useCallback(async (audioData) => {
        setIsLoading(true);
        try {
            const transcript = await recognizeSpeech(audioData, language, language); // Process the audio to text
            console.log("Transcription: " + transcript);
            console.log("Language: " + language);
            setAudioSrc(URL.createObjectURL(audioData)); // Assuming audioData is a Blob
           
            setTextOutput(transcript);
        } catch (e) {
            console.log(e);
            setTextOutput('');
        }
        setIsLoading(false);
    }, [language]);

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    }    

    useEffect(() => {
        console.log("Language updated to: " + language);
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
            <div className={"bg-white shadow"}>
            <LanguageDropdown onChange={onLanguageChange}>
                {sourceOptions.map((option, index) =>
                    <option key={index} value={option.value}>{option.label}</option>
                )}
            </LanguageDropdown>
                <AudioInput
                    onAudioSubmit={handleAudioSubmit}
                    setLanguage={setLanguage}
                    isLoading={isLoading}
                />
                <AudioPlayer audioSrc={audioSrc} />
            </div>
            <TranscriptionTextArea
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

const AudioPlayer = ({ audioSrc }) => {
    if (!audioSrc) {
        return null;
    }

    return (
        <audio controls src={audioSrc}>
            Your browser does not support the audio element.
        </audio>
    );
};


export default Transcription;
