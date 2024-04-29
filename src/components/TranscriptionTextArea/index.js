import { TextArea } from "./TranscriptionTextArea.styles";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import ContentCopy from '@mui/icons-material/ContentCopy';
// import Feedback from '../Feedback';


const TranscriptionTextArea = ({
    placeholder,
    text, // This will be the recognized text from audio
    setText, // Function to update the recognized text
    isLoading,
    onCopyToClipboard, // Function to handle copying text
    onProvideFeedback, // Optional, for user to give feedback on the recognition accuracy
}) => {
    const [copySuccess, setCopySuccess] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    }

    return (
        <div className="bg-white shadow" style={{ position: 'relative', height: '100%' }}>
            <TextArea
                placeholder={placeholder}
                readOnly={true}
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-area-class"
            />
            {isLoading && <LinearProgress color="secondary"/>}
            <Button
                onClick={copyToClipboard}
                disabled={!text}
                endIcon={<ContentCopy />}
                size="small"
                style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '20px',
                }}
            >
                Copy
            </Button>
            {/* {text && <Feedback
                text={text}
                onProvideFeedback={onProvideFeedback}
            />} */}
            <Snackbar
                open={copySuccess}
                autoHideDuration={3000}
                message="Text copied!"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />
        </div>
    );
};

export default TranscriptionTextArea;
