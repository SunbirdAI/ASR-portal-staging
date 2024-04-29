import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';

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

    // const toggleRecording = () => {
    //     if (!mediaRecorder) return;

    //     if (recording) {
    //         mediaRecorder.stop();
    //         setRecording(false);
    //     } else {
    //         setAudioData([]); // Clear previous recordings
    //         mediaRecorder.start();
    //         setRecording(true);
    //     }
    // };

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
            // Optionally, update the UI or state to reflect the error
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
        } else {
            alert("Please drop only audio files.");
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
        <div className="audio-input-container" style={{ padding: '10px' }}>
            <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleButtonClick}
                style={{
                    border: dragActive ? '2px dashed #000' : '2px dashed #ccc',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: dragActive ? '#e9e9e9' : '',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                {isLoading ? "Processing..." : "Drag and drop your audio file here or click to select a file."}
            </div>
            <input
                id="fileInput"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isLoading}
            />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
                    Or record your audio
                </span>
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
            </div>
        </div>

    );
};

export default AudioInput;

const MicIcon = () => (
    <SvgIcon>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
    </SvgIcon>
);

const StopIcon = () => (
    <SvgIcon sx={{ color: 'red' }}>
        <path d="M0 0h24v24H0z" fill="none" />
        <circle cx="9" cy="9" r="4" />
        <path d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z" />
    </SvgIcon>
);

