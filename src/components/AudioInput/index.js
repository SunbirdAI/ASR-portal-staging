import React, { useState } from 'react';

const AudioInput = ({ onAudioSubmit, isLoading }) => {
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file && file.type.startsWith('audio/')) {
            onAudioSubmit(file);
        } else {
            alert("Please drop only audio files.");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

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
        processFile(file);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

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
                    cursor: 'pointer'
                }}
            >
                {isLoading ? "Processing..." : "Drag and drop your audio file here or click to select a file."}
            </div>
            <input
                id="fileInput"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                style={{ display: 'none' }} // Hide the default file input
                disabled={isLoading}
            />
        </div>
    );
};

export default AudioInput;
