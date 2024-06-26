import React, { useState, useEffect, useCallback } from 'react';
import { MainContainer, LanguageDropdown, ResponsiveContainer, ButtonContainer } from "./Transcription.styles";
import AudioInput from '../AudioInput'; // Adjust based on actual file structure
import TranscriptionTextArea from '../TranscriptionTextArea';
import Button from '@mui/material/Button';
import { recognizeSpeech } from "../../API"; // Function to convert speech to text
import Footer from '../Footer';

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
];

const Transcription = () => {
    const [language, setLanguage] = useState('lug'); // Default language for speech recognition
    const [textOutput, setTextOutput] = useState(''); // The recognized text from speech
    const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
    const [audioSrc, setAudioSrc] = useState(''); // Store the audio source URL or blob
    const [audioData, setAudioData] = useState(null); // Store the audio data blob

    // Handles the submission of audio data for recognition
    const handleAudioSubmit = useCallback(async () => {
        if (!audioData) return;

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
    }, [audioData, language]);

    const handleAudioLoad = useCallback((audioData) => {
        setAudioData(audioData);
        setAudioSrc(URL.createObjectURL(audioData));
    }, []);

    const onLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        console.log("Language updated to: " + language);
    }, [language]);

    return (
        <MainContainer>
            <ResponsiveContainer>
                <div className="step-container">
                    <h2>Step 1: Upload or Record Your Audio</h2>
                    <AudioInput
                        onAudioSubmit={handleAudioLoad}
                        isLoading={isLoading}
                    />
                </div>

                <div className="step-container">
                    <h2>Step 2: Select the Language of the Audio</h2>
                    <LanguageDropdown onChange={onLanguageChange}>
                        {sourceOptions.map((option, index) =>
                            <option key={index} value={option.value}>{option.label}</option>
                        )}
                    </LanguageDropdown>
                </div>

                <div className="step-container">
                    <h2>Step 3: Transcribe the Audio</h2>
                    <ButtonContainer>
                        <Button variant="contained" color="primary" onClick={handleAudioSubmit} disabled={!audioData || isLoading}>
                            Transcribe
                        </Button>
                    </ButtonContainer>
                </div>
            </ResponsiveContainer>
            <TranscriptionTextArea
                placeholder="Recognized text will appear here"
                text={textOutput}
                setText={setTextOutput}
                isLoading={isLoading}
            />
            <Footer audioSrc={audioSrc} />
        </MainContainer>
    );
};

export default Transcription;
