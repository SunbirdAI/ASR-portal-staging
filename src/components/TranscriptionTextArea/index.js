import { TextArea } from "./TranscriptionTextArea.styles";
import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Loading from 'react-fullscreen-loading'; // Import Fullscreen Loading

const TranscriptionTextArea = ({
    placeholder,
    text,
    setText,
    isLoading,
}) => {

    return (
        <>
            {/* Full-Screen Loading */}
            {isLoading && (
                <Loading
                    loading={isLoading} // Will show the loader when true
                    background="transparent" // Background color for loading screen
                    loaderColor="#3498db" // Color of the spinner
                />
            )}
            <TextArea
                placeholder={placeholder}
                readOnly={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-area-class">
                {isLoading && <LinearProgress color="secondary" />}
            </TextArea>
        </>

    );
};

export default TranscriptionTextArea;
