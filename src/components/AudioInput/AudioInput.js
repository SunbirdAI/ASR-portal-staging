// src/components/AudioInput/AudioInput.js

import React from 'react';

const AudioInput = ({ onAudioSubmit, setLanguage, isLoading }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onAudioSubmit(file);
        }
    };

    return (
        <div>
            <input type="file" accept="audio/*" onChange={handleFileChange} disabled={isLoading} />
            {/* Additional input or controls for setting language or recording audio */}
        </div>
    );
};

export default AudioInput;
