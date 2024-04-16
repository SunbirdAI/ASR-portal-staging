// import pRetry from "p-retry";

const FEEDBACK_URL = process.env.REACT_APP_FEEDBACK_URL;
// const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;
export const tracking_id = process.env.REACT_APP_GA4_TRACKING_ID;

// const translationUrl = `${process.env.REACT_APP_SB_API_URL}/tasks/nllb_translate`;
// const textToSpeechUrl = "https://api-inference.huggingface.co/models/Sunbird/sunbird-lug-tts";


/**
 * Recognizes speech from an audio file and returns the transcribed text.
 * @param {Blob} audioData - The audio file as a Blob.
 * @param {string} languageCode - The language code (e.g.,  "eng","lug","nyn","teo","lgg","ach").
 * @return {Promise<string>} The recognized text.
 */
export async function recognizeSpeech(audioData, languageCode) {
    
}

export const sendFeedback = async (feedback, CorrectTranslation, username, sourceText, translation, from, to) => {
    const time = Date.now();
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Timestamp: time,
            feedback: feedback,
            SourceText: sourceText,
            LanguageFrom: from,
            LanguageTo: to,
            username: username,
            CorrectTranslation: CorrectTranslation,
            TranslatedText: translation
        })
    }
    const response = await (await fetch(FEEDBACK_URL, requestOptions)).json();
    return response;
}

