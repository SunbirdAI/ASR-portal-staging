import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { TailSpin } from 'react-loader-spinner';
import { Container, DropZoneContainer, RecordingArea, LoadingContainer } from './AudioInput.styles';

const AudioInput = ({ onAudioSubmit, isLoading }) => {
    const [dragActive, setDragActive] = useState(false);
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioData, setAudioData] = useState([]);

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Media Devices will not work on your browser");
            return;
        }

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        setAudioData(prev => [...prev, event.data]);
                    }
                };
            })
            .catch(console.error);

        return () => {
            if (mediaRecorder) {
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const toggleRecording = () => {
        if (!mediaRecorder) return;

        try {
            if (mediaRecorder.state === 'inactive' && !recording) {
                setAudioData([]); // Clear previous recordings
                mediaRecorder.start();
                setRecording(true);
            } else if (mediaRecorder.state === 'recording' && recording) {
                mediaRecorder.stop();
                setRecording(false);
            }
        } catch (error) {
            console.error('Error handling MediaRecorder:', error);
        }
    };

    useEffect(() => {
        if (!recording && audioData.length > 0) {
            const audioBlob = new Blob(audioData, { type: 'audio/wav' });
            onAudioSubmit(audioBlob);
        }
    }, [recording, audioData, onAudioSubmit]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            onAudioSubmit(file);
        }
    };

    const handleDragOver = (event) => event.preventDefault();
    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragActive(true);
    };
    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragActive(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const file = event.dataTransfer.files[0];
        if (file) handleFileChange({ target: { files: [file] } });
    };
    const handleButtonClick = () => document.getElementById('fileInput').click();

    return (
        <Container>
            <DropZoneContainer
                className={`drop-zone ${dragActive ? 'active' : ''}`}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleButtonClick}
            >
                {isLoading ? (
                    <LoadingContainer>
                        <TailSpin
                            height="50"
                            width="50"
                            color="#4fa94d"
                            ariaLabel="loading"
                        />
                    </LoadingContainer>
                ) : (
                    "Drag and drop your audio file here or click to select a file."
                )}
            </DropZoneContainer>
            <RecordingArea>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    onClick={toggleRecording}
                    sx={{
                        borderRadius: '50%',
                        height: 56,
                        width: 56,
                        minWidth: 56,
                        padding: '10px',
                        mt: 2,
                        '& .MuiButton-startIcon': {
                            margin: 0
                        }
                    }}
                >
                    {recording ? <StopIcon /> : <MicIcon />}
                </Button>
            </RecordingArea>
            <input
                id="fileInput"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isLoading}
            />
        </Container>
    );
};

export default AudioInput;

const MicIcon = () => (
    <SvgIcon>
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    </SvgIcon>
);

const StopIcon = () => (
    <SvgIcon sx={{ color: 'red' }}>
        <circle cx="12" cy="12" r="10" />
    </SvgIcon>
);
