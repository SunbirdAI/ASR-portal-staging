import React from 'react';
import { Nav, AudioPlayerContainer } from './Footer.styles';

const Footer = ({ audioSrc }) => (
    <Nav>
        <AudioPlayerContainer>
            <AudioPlayer audioSrc={audioSrc} />
        </AudioPlayerContainer>
    </Nav>
);

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

export default Footer;
